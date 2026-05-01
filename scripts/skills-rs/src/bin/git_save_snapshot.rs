//! Skill git-save-snapshot: git add y commit con mensaje (snapshot rápido).

use gesfer_skills::capsule_v2::{finish_err, finish_ok, git_require_success, read_envelope, validate_entity};
use serde_json::json;
use std::process::Command;
use std::time::Instant;

const SKILL_ID: &str = "git-save-snapshot";

fn main() {
    let started = Instant::now();
    let env = match read_envelope() {
        Ok(e) => e,
        Err(msg) => {
            let dummy = gesfer_skills::capsule_v2::MetaIn {
                schema_version: "2.0".into(),
                entity_kind: "skill".into(),
                entity_id: SKILL_ID.into(),
                token: None,
            };
            finish_err(&dummy, started, &msg, json!({}), 1);
        }
    };
    if let Err(msg) = validate_entity(&env, SKILL_ID) {
        finish_err(&env.meta, started, &msg, json!({}), 1);
    }

    let commit_message = env
        .request
        .get("commitMessage")
        .and_then(|v| v.as_str())
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty());

    let Some(msg) = commit_message else {
        finish_err(
            &env.meta,
            started,
            "request.commitMessage es obligatorio",
            json!({}),
            2,
        );
    };

    let all = env
        .request
        .get("all")
        .and_then(|v| v.as_bool())
        .unwrap_or(true);

    let add_res = if all {
        git_require_success(&["add", "-A"])
    } else {
        let files: Vec<String> = env
            .request
            .get("files")
            .and_then(|v| v.as_array())
            .map(|a| {
                a.iter()
                    .filter_map(|x| x.as_str().map(|s| s.trim().to_string()))
                    .filter(|s| !s.is_empty())
                    .collect()
            })
            .unwrap_or_default();
        if files.is_empty() {
            Err("Sin all=true debe indicarse request.files (array de strings)".to_string())
        } else {
            let out = match Command::new("git").arg("add").args(&files).output() {
                Ok(o) => o,
                Err(e) => finish_err(
                    &env.meta,
                    started,
                    &format!("git add: {}", e),
                    json!({ "phase": "add" }),
                    1,
                ),
            };
            let code = out.status.code().unwrap_or(-1);
            let combined = format!(
                "{}{}",
                String::from_utf8_lossy(&out.stdout),
                String::from_utf8_lossy(&out.stderr)
            );
            if code == 0 {
                Ok(combined.trim().to_string())
            } else {
                Err(format!("git add -> {}: {}", code, combined.trim()))
            }
        }
    };

    if let Err(e) = add_res {
        finish_err(&env.meta, started, &e, json!({ "phase": "add" }), 1);
    }

    match git_require_success(&["commit", "-m", &msg]) {
        Ok(out) => finish_ok(
            &env.meta,
            started,
            "Snapshot guardado (commit)",
            json!({ "commitMessage": msg, "output": out }),
            None,
        ),
        Err(e) => finish_err(&env.meta, started, &e, json!({ "phase": "commit" }), 1),
    }
}
