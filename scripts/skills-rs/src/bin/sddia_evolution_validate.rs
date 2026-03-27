//! Valida trazabilidad evolution para un rango git base..head.
//! Si hay cambios bajo SddIA/, exige línea añadida en Evolution_log o fichero detalle UUID nuevo.

use regex::Regex;
use std::path::Path;
use std::process::Command;

fn main() {
    let args: Vec<String> = std::env::args().collect();
    let mut base = String::new();
    let mut head = "HEAD".to_string();
    let mut i = 1;
    while i < args.len() {
        if args[i] == "--base" && i + 1 < args.len() {
            base = args[i + 1].clone();
            i += 2;
            continue;
        }
        if args[i] == "--head" && i + 1 < args.len() {
            head = args[i + 1].clone();
            i += 2;
            continue;
        }
        i += 1;
    }
    if base.is_empty() {
        eprintln!("Uso: sddia_evolution_validate --base <ref> [--head HEAD]");
        std::process::exit(2);
    }

    let names = git_diff_name_only(&base, &head);
    if !names.iter().any(|n| n.starts_with("SddIA/")) {
        println!(r#"{{"success":true,"skipped":true,"reason":"sin cambios bajo SddIA/"}}"#);
        std::process::exit(0);
    }

    let log_ok = git_diff_has_additions(&base, &head, "SddIA/evolution/Evolution_log.md");
    let new_detail = git_diff_new_uuid_detail(&base, &head);

    if log_ok || new_detail {
        println!(
            r#"{{"success":true,"evolutionLogTouched":{},"newDetail":{}}}"#,
            log_ok, new_detail
        );
        std::process::exit(0);
    }

    eprintln!(
        "VALIDACIÓN EVOLUTION: cambios bajo SddIA/ requieren línea nueva en SddIA/evolution/Evolution_log.md o fichero {{uuid}}.md nuevo."
    );
    println!(r#"{{"success":false,"error":"falta trazabilidad evolution"}}"#);
    std::process::exit(1);
}

fn git_diff_name_only(base: &str, head: &str) -> Vec<String> {
    let out = Command::new("git")
        .args(["diff", "--name-only", &format!("{}..{}", base, head)])
        .output();
    match out {
        Ok(o) if o.status.success() => String::from_utf8_lossy(&o.stdout)
            .lines()
            .map(|s| s.trim().to_string())
            .filter(|s| !s.is_empty())
            .collect(),
        _ => Vec::new(),
    }
}

fn git_diff_has_additions(base: &str, head: &str, path: &str) -> bool {
    let out = Command::new("git")
        .args(["diff", &format!("{}..{}", base, head), "--", path])
        .output();
    match out {
        Ok(o) if o.status.success() => {
            let s = String::from_utf8_lossy(&o.stdout);
            s.lines().any(|l| l.starts_with('+') && !l.starts_with("+++"))
        }
        _ => false,
    }
}

fn git_diff_new_uuid_detail(base: &str, head: &str) -> bool {
    let out = Command::new("git")
        .args([
            "diff",
            "--name-only",
            "--diff-filter=A",
            &format!("{}..{}", base, head),
            "--",
            "SddIA/evolution/",
        ])
        .output();
    let Ok(o) = out else {
        return false;
    };
    if !o.status.success() {
        return false;
    }
    let re = Regex::new(r"(?i)^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.md$")
        .unwrap();
    String::from_utf8_lossy(&o.stdout)
        .lines()
        .filter_map(|line| {
            let p = Path::new(line.trim());
            p.file_name().and_then(|n| n.to_str())
        })
        .any(|name| re.is_match(name))
}
