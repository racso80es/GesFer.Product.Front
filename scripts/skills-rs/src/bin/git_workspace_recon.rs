//! Skill git-workspace-recon: estado del repo (rama, remotes, status, último commit).

use gesfer_skills::capsule_v2::{
    current_branch, finish_err, finish_ok, git_output, read_envelope, validate_entity,
};
use serde_json::json;
use std::time::Instant;

const SKILL_ID: &str = "git-workspace-recon";

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

    let branch = current_branch().unwrap_or_else(|e| format!("(error: {})", e));
    let (st_code, status) = git_output(&["status", "--porcelain"]).unwrap_or((-1, String::new()));
    let (rv_code, remote_v) = git_output(&["remote", "-v"]).unwrap_or((-1, String::new()));
    let (lv_code, last) = git_output(&["log", "-1", "--oneline"]).unwrap_or((-1, String::new()));

    finish_ok(
        &env.meta,
        started,
        "Reconocimiento de workspace completado",
        json!({
            "branch": branch,
            "gitStatusPorcelain": { "exitCode": st_code, "output": status },
            "gitRemoteV": { "exitCode": rv_code, "output": remote_v },
            "gitLogOneLine": { "exitCode": lv_code, "output": last },
        }),
        None,
    );
}
