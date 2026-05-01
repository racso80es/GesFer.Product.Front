//! Skill git-create-pr: push rama y gh pr create (GitHub CLI).

use gesfer_skills::capsule_v2::{
    current_branch, finish_err, finish_ok, gh_output, git_output, read_envelope, validate_entity,
};
use serde_json::json;
use std::fs;
use std::time::Instant;

const SKILL_ID: &str = "git-create-pr";

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

    let mut branch = env
        .request
        .get("branch")
        .and_then(|v| v.as_str())
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .unwrap_or_default();
    if branch.is_empty() {
        branch = match current_branch() {
            Ok(b) => b,
            Err(e) => finish_err(&env.meta, started, &e, json!({}), 1),
        };
    }

    let base = env
        .request
        .get("base")
        .and_then(|v| v.as_str())
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| {
            if let Ok((0, s)) = git_output(&["symbolic-ref", "refs/remotes/origin/HEAD"]) {
                if s.contains("main") {
                    "main".into()
                } else {
                    "master".into()
                }
            } else {
                "main".into()
            }
        });

    let push_first = env
        .request
        .get("pushFirst")
        .and_then(|v| v.as_bool())
        .unwrap_or(true);

    if push_first {
        let (c, o) = match git_output(&["push", "-u", "origin", &branch]) {
            Ok(x) => x,
            Err(e) => finish_err(&env.meta, started, &e, json!({ "phase": "push" }), 1),
        };
        if c != 0 {
            finish_err(
                &env.meta,
                started,
                &format!("git push falló: {}", o),
                json!({ "phase": "push", "output": o }),
                c,
            );
        }
    }

    let body = if let Some(p) = env
        .request
        .get("bodyFile")
        .and_then(|v| v.as_str())
        .map(|s| s.trim())
        .filter(|s| !s.is_empty())
    {
        fs::read_to_string(p).unwrap_or_default().trim().to_string()
    } else {
        env.request
            .get("body")
            .and_then(|v| v.as_str())
            .unwrap_or("")
            .trim()
            .to_string()
    };

    let title = env
        .request
        .get("title")
        .and_then(|v| v.as_str())
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| branch.clone());

    let body_arg = if body.is_empty() {
        branch.as_str()
    } else {
        body.as_str()
    };

    let (gh_code, gh_out) = match gh_output(&[
        "pr",
        "create",
        "--base",
        &base,
        "--head",
        &branch,
        "--title",
        &title,
        "--body",
        body_arg,
    ]) {
        Ok(x) => x,
        Err(e) => finish_err(
            &env.meta,
            started,
            &format!("gh no ejecutable: {}", e),
            json!({
                "prCreated": false,
                "hint": manual_pr_url(&base, &branch),
                "detail": e.to_string()
            }),
            1,
        ),
    };

    if gh_code == 0 {
        finish_ok(
            &env.meta,
            started,
            "PR creado con gh",
            json!({
                "prCreated": true,
                "branch": branch,
                "base": base,
                "ghOutput": gh_out
            }),
            None,
        );
    }

    finish_err(
        &env.meta,
        started,
        &format!("gh pr create falló: {}", gh_out),
        json!({
            "prCreated": false,
            "branch": branch,
            "base": base,
            "ghExitCode": gh_code,
            "ghOutput": gh_out,
            "hint": manual_pr_url(&base, &branch)
        }),
        gh_code,
    );
}

fn manual_pr_url(base: &str, branch: &str) -> String {
    if let Ok((0, url_raw)) = git_output(&["config", "--get", "remote.origin.url"]) {
        let url = url_raw.trim();
        if let Some(repo) = url.split("github.com").nth(1) {
            let repo = repo
                .trim_start_matches(':')
                .trim_start_matches('/')
                .trim_end_matches(".git")
                .trim_end_matches('/');
            return format!(
                "https://github.com/{}/compare/{}...{}?expand=1",
                repo, base, branch
            );
        }
    }
    "Abrir el remoto en el navegador y crear PR manualmente.".into()
}
