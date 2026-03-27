//! Skill sddia_evolution_register — registro evolution SddIA (stdin JSON, stdout JSON).
//! Envelope: { "request": { ... } } o cuerpo plano con los mismos campos.

use serde::Deserialize;
use sha2::{Digest, Sha256};
use std::fs;
use std::io::Read;
use std::path::{Path, PathBuf};

#[derive(Deserialize)]
struct Envelope {
    request: Option<RegisterRequest>,
}

#[derive(Deserialize)]
struct RegisterRequest {
    autor: String,
    #[serde(default)]
    descripcion_breve: String,
    tipo_operacion: String,
    proyecto_origen_cambio: String,
    contexto: String,
    cambios_realizados: Vec<CambioPair>,
    impacto: String,
    replicacion_instrucciones: String,
    #[serde(default)]
    rutas_eliminadas: Option<Vec<String>>,
    #[serde(default)]
    commit_referencia_previo: Option<String>,
}

#[derive(Deserialize)]
struct CambioPair {
    anterior: String,
    nuevo: String,
}

fn repo_root() -> PathBuf {
    if let Ok(r) = std::env::var("SDDIA_REPO_ROOT") {
        let p = PathBuf::from(r.trim());
        if p.is_dir() {
            return p;
        }
    }
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("../..")
        .canonicalize()
        .expect("no se pudo resolver raíz del repo desde CARGO_MANIFEST_DIR")
}

fn main() {
    let mut buf = String::new();
    if std::io::stdin().read_to_string(&mut buf).is_err() {
        println!(r#"{{"success":false,"error":"stdin"}}"#);
        std::process::exit(1);
    }
    let trimmed = buf.trim();
    if trimmed.is_empty() {
        println!(r#"{{"success":false,"error":"stdin vacío"}}"#);
        std::process::exit(1);
    }

    let req: RegisterRequest = match serde_json::from_str::<Envelope>(trimmed) {
        Ok(env) => {
            if let Some(r) = env.request {
                r
            } else {
                serde_json::from_str(trimmed).unwrap_or_else(|e| {
                    println!(
                        r#"{{"success":false,"error":"parse JSON: {}"}}"#,
                        escape_json(&e.to_string())
                    );
                    std::process::exit(1);
                })
            }
        }
        Err(_) => serde_json::from_str(trimmed).unwrap_or_else(|e| {
            println!(
                r#"{{"success":false,"error":"parse JSON: {}"}}"#,
                escape_json(&e.to_string())
            );
            std::process::exit(1);
        }),
    };

    let id = uuid::Uuid::new_v4();
    let id_str = id.to_string();
    let fecha = chrono::Utc::now().to_rfc3339();
    let root = repo_root();
    let evo = root.join("SddIA").join("evolution");
    if let Err(e) = fs::create_dir_all(&evo) {
        println!(
            r#"{{"success":false,"error":"{}"}}"#,
            escape_json(&e.to_string())
        );
        std::process::exit(1);
    }

    let yaml_before_hash = build_yaml_before_hash(&id_str, &fecha, &req);
    let hash = sha256_hex(yaml_before_hash.as_bytes());
    let yaml_full = format!("{}{}", yaml_before_hash, replicacion_hash_line(&hash));

    let md_path = evo.join(format!("{}.md", id_str));
    let body_md = format!("# Cambio {}\n\n{}\n", id_str, req.descripcion_breve);
    let file_content = format!("---\n{}---\n\n{}", yaml_full, body_md);

    if let Err(e) = fs::write(&md_path, file_content) {
        println!(
            r#"{{"success":false,"error":"{}"}}"#,
            escape_json(&e.to_string())
        );
        std::process::exit(1);
    }

    let log_path = evo.join("Evolution_log.md");
    if let Err(e) = upsert_index(&log_path, &id_str, &fecha, &req.descripcion_breve) {
        println!(
            r#"{{"success":false,"error":"{}"}}"#,
            escape_json(&e.to_string())
        );
        std::process::exit(1);
    }

    let path_str = md_path.display().to_string().replace('\\', "/");
    println!(
        r#"{{"success":true,"idCambio":"{}","hashIntegridad":"{}","path":"{}"}}"#,
        id_str, hash, path_str
    );
}

fn escape_json(s: &str) -> String {
    s.replace('\\', "\\\\").replace('"', "\\\"")
}

fn yaml_quote(s: &str) -> String {
    if s.contains('\n') {
        let body = s.trim_end().replace('\n', "\n  ");
        format!("|\n  {}", body)
    } else {
        format!("{:?}", s)
    }
}

fn build_yaml_before_hash(id_str: &str, fecha: &str, req: &RegisterRequest) -> String {
    let mut out = String::new();
    out.push_str("contrato_version: \"1.1\"\n");
    out.push_str(&format!("id_cambio: {}\n", id_str));
    out.push_str(&format!("fecha: {}\n", yaml_quote(fecha)));
    out.push_str(&format!("autor: {}\n", yaml_quote(&req.autor)));
    out.push_str(&format!(
        "proyecto_origen_cambio: {}\n",
        yaml_quote(&req.proyecto_origen_cambio)
    ));
    out.push_str(&format!("contexto: {}\n", yaml_quote(&req.contexto)));
    out.push_str(&format!(
        "descripcion_breve: {}\n",
        yaml_quote(&req.descripcion_breve)
    ));
    out.push_str(&format!("tipo_operacion: {}\n", req.tipo_operacion));
    out.push_str("cambios_realizados:\n");
    for c in &req.cambios_realizados {
        out.push_str("  - anterior: ");
        out.push_str(&yaml_quote(&c.anterior));
        out.push('\n');
        out.push_str("    nuevo: ");
        out.push_str(&yaml_quote(&c.nuevo));
        out.push('\n');
    }
    out.push_str(&format!("impacto: {}\n", req.impacto));
    if let Some(ref r) = req.rutas_eliminadas {
        if !r.is_empty() {
            out.push_str("rutas_eliminadas:\n");
            for p in r {
                out.push_str("  - ");
                out.push_str(&yaml_quote(p));
                out.push('\n');
            }
        }
    }
    if let Some(ref c) = req.commit_referencia_previo {
        out.push_str(&format!(
            "commit_referencia_previo: {}\n",
            yaml_quote(c)
        ));
    }
    out.push_str("replicacion:\n");
    out.push_str(&format!(
        "  instrucciones: {}\n",
        yaml_quote(&req.replicacion_instrucciones)
    ));
    out
}

fn replicacion_hash_line(hash: &str) -> String {
    format!("  hash_integridad: {:?}\n", hash)
}

fn sha256_hex(bytes: &[u8]) -> String {
    let mut h = Sha256::new();
    h.update(bytes);
    hex::encode(h.finalize())
}

fn upsert_index(log_path: &Path, id: &str, fecha: &str, desc: &str) -> std::io::Result<()> {
    let mut content = fs::read_to_string(log_path)?;
    let fecha_short: String = fecha.chars().take(10).collect();
    let row = format!(
        "| {} | {} | {} |",
        id,
        fecha_short,
        desc.replace('|', "\\|")
    );
    let placeholder = "| *(pendiente primer registro oficial vía binario `sddia_evolution_register`)* | — | — |";
    if content.contains(placeholder) {
        content = content.replace(placeholder, &row);
    } else if !content.contains(id) {
        content.push_str(&format!("\n{}\n", row));
    }
    fs::write(log_path, content)
}
