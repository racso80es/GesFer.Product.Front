//! Skill git-close-cycle: checkout rama base, sincronizar remoto y eliminar rama de trabajo.

use gesfer_skills::capsule_v2::{
    finish_err, finish_ok, git_output, git_require_success, read_envelope, validate_entity,
};
use serde_json::json;
use std::time::Instant;

const SKILL_ID: &str = "git-close-cycle";

fn resolve_default_branch(remote: &str) -> Result<String, String> {
    let sym_ref = format!("refs/remotes/{}/HEAD", remote);
    let (c, out) = git_output(&["symbolic-ref", "-q", &sym_ref])?;
    if c == 0 {
        let line = out.trim();
        let prefix = format!("refs/remotes/{}/", remote);
        if let Some(b) = line.strip_prefix(&prefix) {
            if !b.is_empty() {
                return Ok(b.to_string());
            }
        }
    }
    for b in ["main", "master"] {
        let (rc, _) = git_output(&["rev-parse", "--verify", b])?;
        if rc == 0 {
            return Ok(b.to_string());
        }
    }
    Err(format!(
        "No se pudo resolver rama base ({} ni main/master)",
        sym_ref
    ))
}

fn local_branch_exists(name: &str) -> Result<bool, String> {
    let r = format!("refs/heads/{}", name);
    let (c, _) = git_output(&["rev-parse", "--verify", &r])?;
    Ok(c == 0)
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

    let target_branch = match env.request.get("target_branch").and_then(|v| v.as_str()) {
        Some(s) => s.trim().to_string(),
        None => {
            finish_err(
                &env.meta,
                started,
                "request.target_branch es requerido",
                json!({ "phase": "validate_request" }),
                1,
            );
        }
    };

    if target_branch.is_empty() {
        finish_err(
            &env.meta,
            started,
            "request.target_branch no puede estar vacío",
            json!({ "phase": "validate_request" }),
            1,
        );
    }

    let base = match resolve_default_branch(&remote) {
        Ok(b) => b,
        Err(e) => finish_err(
            &env.meta,
            started,
            &e,
            json!({ "phase": "resolve_base", "remote": remote.clone() }),
            1,
        ),
    };

    if target_branch == base {
        finish_err(
            &env.meta,
            started,
            &format!(
                "target_branch no puede ser la rama base ({})",
                base
            ),
            json!({
                "phase": "validate_target",
                "base": base,
                "target_branch": target_branch,
            }),
            1,
        );
    }

    if let Err(e) = git_require_success(&["checkout", &base]) {
        finish_err(
            &env.meta,
            started,
            &e,
            json!({ "phase": "checkout", "base": base.clone() }),
            1,
        );
    }

    if let Err(e) = git_require_success(&["pull", &remote, "HEAD"]) {
        finish_err(
            &env.meta,
            started,
            &e,
            json!({ "phase": "pull", "remote": remote, "base": base.clone() }),
            1,
        );
    }

    if let Err(e) = git_require_success(&["fetch", "--prune", &remote]) {
        finish_err(
            &env.meta,
            started,
            &e,
            json!({ "phase": "fetch_prune", "remote": remote }),
            1,
        );
    }

    let exists = match local_branch_exists(&target_branch) {
        Ok(x) => x,
        Err(e) => finish_err(
            &env.meta,
            started,
            &e,
            json!({ "phase": "branch_exists_check" }),
            1,
        ),
    };

    if !exists {
        finish_ok(
            &env.meta,
            started,
            "Rama base actualizada; rama objetivo no existe localmente (omitido -d)",
            json!({
                "remote": remote,
                "base": base,
                "target_branch": target_branch,
                "branch_deleted": false,
                "skipped": true,
            }),
            None,
        );
    }

    let delete_result = match git_require_success(&["branch", "-d", &target_branch]) {
        Ok(out) => json!({ "mode": "d", "output": out }),
        Err(_) => match git_require_success(&["branch", "-D", &target_branch]) {
            Ok(out) => json!({ "mode": "D", "output": out }),
            Err(e) => {
                finish_err(
                    &env.meta,
                    started,
                    &e,
                    json!({
                        "phase": "branch_delete",
                        "target_branch": target_branch,
                        "base": base,
                    }),
                    1,
                );
            }
        },
    };

    finish_ok(
        &env.meta,
        started,
        "Ciclo local cerrado: base actualizada y rama de trabajo eliminada",
        json!({
            "remote": remote,
            "base": base,
            "target_branch": target_branch,
            "branch_deleted": true,
            "delete": delete_result,
        }),
        None,
    );
}
