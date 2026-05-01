<#
.SYNOPSIS
  Lee `.tekton_request.json` en la raíz del repo, invoca la cápsula Rust correspondiente y elimina el fichero si el exit code es 0.

.DESCRIPTION
  Modos soportados:
  1) Envelope cápsula v2: objeto con `meta.schemaVersion`, `meta.entityId` y `request`. Se resuelve el .exe vía `SddIA/agents/cumulo.paths.json` → `paths.skillCapsules` y `manifest.json` (`components.bin`).
  2) Registro evolución SddIA: objeto sin `meta` pero con `tipoOperacion` (o `tipo_operacion`). Invoca `sddia_evolution_register.exe --input <fichero>` (mismo path de cápsula que `sddia-evolution-register`).

  Entrada del .exe capsule: `--request-file <ruta_absoluta>` (norma SddIA/norms/capsule-json-io.md).
#>
param(
    [Parameter(Mandatory = $false)]
    [string] $RepoRoot = ""
)

$ErrorActionPreference = "Stop"

if (-not $RepoRoot) {
    $RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
}

$requestPath = Join-Path $RepoRoot ".tekton_request.json"
if (-not (Test-Path -LiteralPath $requestPath)) {
    Write-Error "No existe $requestPath"
}

$absRequest = (Resolve-Path -LiteralPath $requestPath).Path
$raw = Get-Content -LiteralPath $absRequest -Raw -Encoding UTF8
$obj = $raw | ConvertFrom-Json

function Get-CapsuleDir {
    param([string]$EntityId)
    $cumuloPaths = Join-Path $RepoRoot "SddIA\agents\cumulo.paths.json"
    if (-not (Test-Path -LiteralPath $cumuloPaths)) {
        throw "No se encuentra cumulo.paths.json"
    }
    $cp = Get-Content -LiteralPath $cumuloPaths -Raw -Encoding UTF8 | ConvertFrom-Json
    $map = $cp.paths.skillCapsules
    $rel = $map.$EntityId
    if (-not $rel) {
        $rel = "./scripts/skills/$EntityId/"
    }
    $trim = $rel -replace '^\./', '' -replace '/', [System.IO.Path]::DirectorySeparatorChar
    Join-Path $RepoRoot $trim
}

function Get-ExeFromManifest {
    param([string]$CapDir)
    $manPath = Join-Path $CapDir "manifest.json"
    if (-not (Test-Path -LiteralPath $manPath)) {
        return $null
    }
    $m = Get-Content -LiteralPath $manPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $bin = $null
    if ($m.components.PSObject.Properties.Name -contains "bin") {
        $bin = $m.components.bin
    }
    elseif ($m.components.PSObject.Properties.Name -contains "register_exe") {
        $bin = $m.components.register_exe
    }
    if (-not $bin) { return $null }
    $binNorm = $bin -replace '/', [System.IO.Path]::DirectorySeparatorChar
    Join-Path $CapDir $binNorm
}

$exitCode = 1

if ($null -ne $obj.meta) {
    $entityId = $obj.meta.entityId
    if (-not $entityId) { $entityId = $obj.meta.entity_id }
    if (-not $entityId) {
        Write-Error "Envelope sin meta.entityId"
    }

    if ($entityId -eq "sddia-evolution-register") {
        $capDir = Get-CapsuleDir -EntityId $entityId
        $exe = Get-ExeFromManifest -CapDir $capDir
        if (-not $exe -or -not (Test-Path -LiteralPath $exe)) {
            Write-Error "Ejecutable no encontrado para sddia-evolution-register en $capDir"
        }
        $tmp = [System.IO.Path]::GetTempFileName()
        try {
            if (-not $obj.request) {
                Write-Error "Envelope sddia-evolution-register requiere nodo 'request' con el payload del registro."
            }
            ($obj.request | ConvertTo-Json -Depth 20 -Compress) | Set-Content -LiteralPath $tmp -Encoding UTF8
            & $exe --input $tmp
            $exitCode = $LASTEXITCODE
        }
        finally {
            Remove-Item -LiteralPath $tmp -Force -ErrorAction SilentlyContinue
        }
    }
    else {
        $capDir = Get-CapsuleDir -EntityId $entityId
        $exe = Get-ExeFromManifest -CapDir $capDir
        if (-not $exe -or -not (Test-Path -LiteralPath $exe)) {
            $fallback = ($entityId -replace '-', '_') + ".exe"
            $exe = Join-Path $capDir (Join-Path "bin" $fallback)
        }
        if (-not (Test-Path -LiteralPath $exe)) {
            Write-Error "Ejecutable no encontrado para skill '$entityId' (esperado bajo $capDir). Ejecute scripts/skills-rs/install.ps1 si aplica."
        }
        & $exe --request-file $absRequest
        $exitCode = $LASTEXITCODE
    }
}
elseif (($obj.PSObject.Properties.Name -contains "tipoOperacion") -or ($obj.PSObject.Properties.Name -contains "tipo_operacion")) {
    $capDir = Get-CapsuleDir -EntityId "sddia-evolution-register"
    $exe = Get-ExeFromManifest -CapDir $capDir
    if (-not $exe -or -not (Test-Path -LiteralPath $exe)) {
        Write-Error "sddia_evolution_register.exe no encontrado en $capDir"
    }
    & $exe --input $absRequest
    $exitCode = $LASTEXITCODE
}
else {
    Write-Error "Formato de .tekton_request.json no reconocido (falta meta o tipoOperacion)."
}

if ($exitCode -eq 0) {
    Remove-Item -LiteralPath $absRequest -Force
}

exit $exitCode
