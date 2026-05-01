//! Skill git-sync-remote: fetch y pull (rama opcional).

use gesfer_skills::capsule_v2::{
    current_branch, finish_err, finish_ok, git_require_success, read_envelope, validate_entity,
};
use serde_json::json;
use std::time::Instant;

const SKILL_ID: &str = "git-sync-remote";

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

    let remote = env
        .request
        .get("remote")
        .and_then(|v| v.as_str())
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| "origin".to_string());

    if let Err(e) = git_require_success(&["fetch", &remote]) {
        finish_err(&env.meta, started, &e, json!({ "phase": "fetch" }), 1);
    }

    if let Some(b) = env
        .request
        .get("branch")
        .and_then(|v| v.as_str())
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
    {
        let cur = match current_branch() {
            Ok(c) => c,
            Err(e) => finish_err(&env.meta, started, &e, json!({}), 1),
        };
        if cur != b {
            if let Err(e) = git_require_success(&["checkout", &b]) {
                finish_err(&env.meta, started, &e, json!({ "phase": "checkout" }), 1);
            }
        }
    }

    let out = match git_require_success(&["pull", &remote]) {
        Ok(o) => o,
        Err(e) => finish_err(&env.meta, started, &e, json!({ "phase": "pull" }), 1),
    };

    let branch = current_branch().unwrap_or_default();
    finish_ok(
        &env.meta,
        started,
        "Sincronización con remoto completada",
        json!({ "remote": remote, "branch": branch, "output": out }),
        None,
    );
}
