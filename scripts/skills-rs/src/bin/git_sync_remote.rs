//! Skill git-sync-remote: fetch, publicación con upstream si aplica, y pull (rama opcional).

use gesfer_skills::capsule_v2::{
    current_branch, finish_err, finish_ok, git_output, git_require_success, read_envelope,
    validate_entity,
};
use serde_json::json;
use std::time::Instant;

const SKILL_ID: &str = "git-sync-remote";

/// `true` si la rama actual tiene seguimiento (upstream) configurado.
fn branch_has_upstream() -> Result<bool, String> {
    let (code, _) = git_output(&["rev-parse", "--abbrev-ref", "@{u}"])?;
    Ok(code == 0)
}

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
            Err(e) => finish_err(&env.meta, started, &e, json!({ "phase": "checkout" }), 1),
        };
        if cur != b {
            if let Err(e) = git_require_success(&["checkout", &b]) {
                finish_err(&env.meta, started, &e, json!({ "phase": "checkout" }), 1);
            }
        }
    }

    let branch = match current_branch() {
        Ok(b) => b,
        Err(e) => finish_err(&env.meta, started, &e, json!({ "phase": "current_branch" }), 1),
    };

    let upstream = match branch_has_upstream() {
        Ok(u) => u,
        Err(e) => finish_err(
            &env.meta,
            started,
            &e,
            json!({ "phase": "upstream_check" }),
            1,
        ),
    };

    let mut push_output: Option<String> = None;
    if !upstream {
        let (code, out) = match git_output(&["push", "-u", &remote, "HEAD"]) {
            Ok(x) => x,
            Err(e) => finish_err(
                &env.meta,
                started,
                &e,
                json!({ "phase": "push_upstream", "remote": remote }),
                1,
            ),
        };
        if code != 0 {
            finish_err(
                &env.meta,
                started,
                &format!(
                    "git push -u {} HEAD falló (código {}): {}",
                    remote, code, out
                ),
                json!({
                    "phase": "push_upstream",
                    "remote": remote,
                    "branch": branch,
                    "output": out,
                    "exit_code": code,
                }),
                code,
            );
        }
        push_output = Some(out);
    }

    let out = match git_require_success(&["pull", &remote]) {
        Ok(o) => o,
        Err(e) => finish_err(
            &env.meta,
            started,
            &e,
            json!({ "phase": "pull", "had_upstream": upstream }),
            1,
        ),
    };

    finish_ok(
        &env.meta,
        started,
        "Sincronización con remoto completada",
        json!({
            "remote": remote,
            "branch": branch,
            "had_upstream": upstream,
            "push_upstream_output": push_output,
            "output": out,
        }),
        None,
    );
}
