# Cápsula: git-workspace-recon

Ejecutable: `bin/git_workspace_recon.exe`. Invocación con **envelope JSON v2** (stdin, `GESFER_CAPSULE_REQUEST` o `--request-file`). Ver `SddIA/norms/capsule-json-io.md` y `SddIA/skills/git-workspace-recon/spec.md`.

**Request:** objeto libre (puede estar vacío `{}`).

**Resultado:** `branch`, salidas de `git status --porcelain`, `git remote -v`, `git log -1 --oneline`.
