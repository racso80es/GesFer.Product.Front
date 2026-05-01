//! Contrato envelope JSON v2 para skills con cápsula (stdin / GESFER_CAPSULE_REQUEST).
//! Referencia: SddIA/norms/capsule-json-io.md

use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::io::Read;
use std::process::Command;
use std::time::Instant;

const SCHEMA: &str = "2.0";

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EnvelopeIn {
    pub meta: MetaIn,
    pub request: Value,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct MetaIn {
    #[serde(alias = "schema_version")]
    pub schema_version: String,
    #[serde(alias = "entity_kind")]
    pub entity_kind: String,
    #[serde(alias = "entity_id")]
    pub entity_id: String,
    #[serde(default)]
    pub token: Option<Value>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct MetaOut {
    pub schema_version: String,
    pub entity_kind: String,
    pub entity_id: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct EnvelopeOut {
    pub meta: MetaOut,
    pub success: bool,
    pub exit_code: i32,
    pub message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub feedback: Option<String>,
    pub result: Value,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub duration_ms: Option<u64>,
}

/// Lee JSON de petición: `--request-file`, `GESFER_CAPSULE_REQUEST`, o stdin.
pub fn read_envelope() -> Result<EnvelopeIn, String> {
    let args: Vec<String> = std::env::args().collect();
    let mut i = 1;
    while i < args.len() {
        if args[i] == "--request-file" && i + 1 < args.len() {
            let p = args[i + 1].trim_matches('"').trim();
            let s = std::fs::read_to_string(p).map_err(|e| format!("lectura request-file: {}", e))?;
            return serde_json::from_str(&s).map_err(|e| format!("JSON inválido: {}", e));
        }
        i += 1;
    }

    if let Ok(s) = std::env::var("GESFER_CAPSULE_REQUEST") {
        if !s.trim().is_empty() {
            return serde_json::from_str(&s.trim()).map_err(|e| format!("GESFER_CAPSULE_REQUEST JSON: {}", e));
        }
    }

    if std::env::var("GESFER_SKIP_STDIN").unwrap_or_default() == "1" {
        return Err("GESFER_SKIP_STDIN=1 sin GESFER_CAPSULE_REQUEST ni --request-file".into());
    }

    let mut buf = String::new();
    std::io::stdin()
        .read_to_string(&mut buf)
        .map_err(|e| format!("stdin: {}", e))?;
    let buf = buf.trim();
    if buf.is_empty() {
        return Err("Petición vacía (stdin). Use GESFER_CAPSULE_REQUEST o --request-file.".into());
    }
    serde_json::from_str(buf).map_err(|e| format!("JSON stdin: {}", e))
}

pub fn validate_entity(envelope: &EnvelopeIn, expected_id: &str) -> Result<(), String> {
    if envelope.meta.schema_version != SCHEMA {
        return Err(format!(
            "schema_version debe ser \"{}\" (recibido: {})",
            SCHEMA, envelope.meta.schema_version
        ));
    }
    if envelope.meta.entity_kind != "skill" {
        return Err(format!(
            "entity_kind debe ser \"skill\" (recibido: {})",
            envelope.meta.entity_kind
        ));
    }
    if envelope.meta.entity_id != expected_id {
        return Err(format!(
            "entity_id debe ser \"{}\" (recibido: {})",
            expected_id, envelope.meta.entity_id
        ));
    }
    Ok(())
}

pub fn emit(envelope: EnvelopeOut) -> ! {
    let exit = envelope.exit_code;
    let line = serde_json::to_string(&envelope).unwrap_or_else(|_| {
        r#"{"meta":{"schemaVersion":"2.0","entityKind":"skill","entityId":"unknown"},"success":false,"exitCode":1,"message":"serialize error","result":{}}"#.to_string()
    });
    println!("{}", line);
    std::process::exit(exit);
}

pub fn meta_out(from: &MetaIn) -> MetaOut {
    MetaOut {
        schema_version: SCHEMA.to_string(),
        entity_kind: from.entity_kind.clone(),
        entity_id: from.entity_id.clone(),
    }
}

pub fn finish_ok(
    meta_in: &MetaIn,
    started: Instant,
    message: &str,
    result: Value,
    feedback: Option<String>,
) -> ! {
    let duration_ms = started.elapsed().as_millis() as u64;
    emit(EnvelopeOut {
        meta: meta_out(meta_in),
        success: true,
        exit_code: 0,
        message: message.to_string(),
        feedback,
        result,
        duration_ms: Some(duration_ms),
    });
}

pub fn finish_err(
    meta_in: &MetaIn,
    started: Instant,
    message: &str,
    result: Value,
    exit_code: i32,
) -> ! {
    let duration_ms = started.elapsed().as_millis() as u64;
    emit(EnvelopeOut {
        meta: meta_out(meta_in),
        success: false,
        exit_code,
        message: message.to_string(),
        feedback: None,
        result,
        duration_ms: Some(duration_ms),
    });
}

/// Ejecuta git con argumentos; devuelve (código_salida, stdout+stderr combinado).
pub fn git_output(args: &[&str]) -> Result<(i32, String), String> {
    let out = Command::new("git")
        .args(args)
        .output()
        .map_err(|e| format!("git no ejecutable: {}", e))?;
    let code = out.status.code().unwrap_or(-1);
    let s = format!(
        "{}{}",
        String::from_utf8_lossy(&out.stdout),
        String::from_utf8_lossy(&out.stderr)
    );
    Ok((code, s.trim().to_string()))
}

pub fn git_require_success(args: &[&str]) -> Result<String, String> {
    let (c, s) = git_output(args)?;
    if c == 0 {
        Ok(s)
    } else {
        Err(format!("git {:?} -> {}: {}", args, c, s))
    }
}

pub fn gh_output(args: &[&str]) -> Result<(i32, String), String> {
    let out = Command::new("gh")
        .args(args)
        .output()
        .map_err(|e| format!("gh no ejecutable: {}", e))?;
    let code = out.status.code().unwrap_or(-1);
    let s = format!(
        "{}{}",
        String::from_utf8_lossy(&out.stdout),
        String::from_utf8_lossy(&out.stderr)
    );
    Ok((code, s.trim().to_string()))
}

pub fn current_branch() -> Result<String, String> {
    git_require_success(&["branch", "--show-current"])
}
