//! Skill git-branch-manager: crear u obtener checkout de rama.

use gesfer_skills::capsule_v2::{finish_err, finish_ok, git_require_success, read_envelope, validate_entity};
use serde_json::json;
use std::time::Instant;

const SKILL_ID: &str = "git-branch-manager";

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

    let branch_name = env
        .request
        .get("branchName")
        .and_then(|v| v.as_str())
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty());
    let create = env
        .request
        .get("create")
        .and_then(|v| v.as_bool())
        .unwrap_or(false);

    let Some(name) = branch_name else {
        finish_err(
            &env.meta,
            started,
            "request.branchName es obligatorio (string)",
            json!({}),
            2,
        );
    };

    let result = if create {
        git_require_success(&["checkout", "-b", &name]).map(|out| json!({ "action": "create", "branch": name, "output": out }))
    } else {
        git_require_success(&["checkout", &name]).map(|out| json!({ "action": "checkout", "branch": name, "output": out }))
    };

    match result {
        Ok(r) => finish_ok(&env.meta, started, "Rama gestionada correctamente", r, None),
        Err(e) => finish_err(&env.meta, started, &e, json!({ "detail": e }), 1),
    }
}
