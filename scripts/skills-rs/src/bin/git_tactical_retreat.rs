//! Skill git-tactical-retreat: reset duro y/o limpieza; exige confirmación destructiva (Visión Zero).

use gesfer_skills::capsule_v2::{finish_err, finish_ok, git_output, read_envelope, validate_entity};
use serde_json::{json, Value};
use std::time::Instant;

const SKILL_ID: &str = "git-tactical-retreat";

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

    let hard_reset = env
        .request
        .get("hardReset")
        .and_then(|v| v.as_bool())
        .unwrap_or(false);
    let clean_untracked = env
        .request
        .get("cleanUntracked")
        .and_then(|v| v.as_bool())
        .unwrap_or(false);
    let confirm = env
        .request
        .get("confirmDestructive")
        .and_then(|v| v.as_bool())
        .unwrap_or(false);

    if (hard_reset || clean_untracked) && !confirm {
        finish_err(
            &env.meta,
            started,
            "Operación destructiva: indique request.confirmDestructive=true (Visión Zero)",
            json!({ "hardReset": hard_reset, "cleanUntracked": clean_untracked }),
            3,
        );
    }

    let target = env
        .request
        .get("target")
        .and_then(|v| v.as_str())
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| "HEAD".to_string());

    if !hard_reset && !clean_untracked {
        finish_err(
            &env.meta,
            started,
            "Indique hardReset y/o cleanUntracked en request",
            json!({}),
            2,
        );
    }

    let mut phases: Vec<Value> = Vec::new();

    if hard_reset {
        let (code, out) = match git_output(&["reset", "--hard", &target]) {
            Ok(x) => x,
            Err(e) => finish_err(&env.meta, started, &e, json!({ "phase": "reset" }), 1),
        };
        if code != 0 {
            finish_err(
                &env.meta,
                started,
                &format!("git reset --hard falló: {}", out),
                json!({ "phase": "reset", "output": out }),
                code,
            );
        }
        phases.push(json!({ "phase": "reset", "output": out }));
    }

    if clean_untracked {
        let (code, out) = match git_output(&["clean", "-fd"]) {
            Ok(x) => x,
            Err(e) => finish_err(&env.meta, started, &e, json!({ "phase": "clean" }), 1),
        };
        if code != 0 {
            finish_err(
                &env.meta,
                started,
                &format!("git clean -fd falló: {}", out),
                json!({ "phase": "clean", "output": out }),
                code,
            );
        }
        phases.push(json!({ "phase": "clean", "output": out }));
    }

    finish_ok(
        &env.meta,
        started,
        "Retirada táctica aplicada",
        json!({ "target": target, "phases": phases }),
        None,
    );
}
