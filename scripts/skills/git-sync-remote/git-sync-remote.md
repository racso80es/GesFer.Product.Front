# Cápsula: git-sync-remote

`bin/git_sync_remote.exe`. Envelope v2.

**Request:** `remote` (string, default `origin`). `branch` (opcional): si se indica y no es la actual, hace checkout antes de sincronizar.

**Comportamiento:** tras `git fetch`, si la rama actual **no** tiene upstream (`@{u}`), ejecuta `git push -u <remote> HEAD` (no push “pelado”) y luego `git pull <remote>`. Si cualquier fase falla, el envelope devuelve `success: false` con `message` y `result.phase` explícitos.
