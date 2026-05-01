<#
.SYNOPSIS
    Ejecuta la acción finalize: comprueba precondiciones e invoca skills Git tácticas para publicar rama y abrir PR.
.DESCRIPTION
    Orquestador de la acción finalize (SddIA/actions/finalize). Comprueba rama, objectives.md y validacion.json;
    opcionalmente ejecuta verify-pr-protocol; luego invoca la skill finalizar-proceso (Push-And-CreatePR.ps1)
    para push y creación del PR. La skill es la única que ejecuta comandos git (Ley COMANDOS).
.PARAMETER Persist
    Ruta de la carpeta de la feature (Cúmulo), ej. docs/features/create-tool-postman-mcp-validation/
.PARAMETER BranchName
    Rama a pushear (por defecto: rama actual).
.PARAMETER NoVerify
    No ejecutar verify-pr-protocol antes de push/PR.
.PARAMETER Title
    Título del PR (opcional; se pasa a la skill).
.EXAMPLE
    .\Invoke-Finalize.ps1 -Persist "docs/features/create-tool-postman-mcp-validation/"
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string] $Persist,

    [Parameter(Mandatory = $false)]
    [string] $BranchName,

    [Parameter(Mandatory = $false)]
    [switch] $NoVerify,

    [Parameter(Mandatory = $false)]
    [string] $Title
)

$ErrorActionPreference = "Stop"
$scriptDir = $PSScriptRoot
$repoRoot = (Resolve-Path (Join-Path $scriptDir "..\..\..")).Path
Push-Location $repoRoot
try {
    Write-Host "[Finalize] Nota: este orquestador no ejecuta comandos git directos." -ForegroundColor Cyan
    Write-Host "[Finalize] La validación de rama (no master/main) y el publish se delegan a skills Git tácticas." -ForegroundColor Cyan

    $persistFull = Join-Path $repoRoot $Persist
    if (-not (Test-Path $persistFull)) {
        Write-Error "No existe la carpeta de la feature: $persistFull"
        exit 1
    }
    $objectivesPath = Join-Path $persistFull "objectives.md"
    if (-not (Test-Path $objectivesPath)) {
        Write-Warning "No se encontró objectives.md en $Persist (recomendado para el proceso)."
    }
    $validacionPath = Join-Path $persistFull "validacion.json"
    if (Test-Path $validacionPath) {
        try {
            $validacion = Get-Content $validacionPath -Raw -Encoding UTF8 | ConvertFrom-Json
            if ($validacion.result -and $validacion.result -ne "pass") {
                Write-Warning "validacion.json no tiene result=pass. Finalize debería ejecutarse tras validación correcta."
            }
        } catch {
            Write-Warning "No se pudo leer validacion.json."
        }
    } else {
        Write-Warning "No se encontró validacion.json en $Persist (recomendado: validar antes de finalize)."
    }

    if (-not $NoVerify) {
        $cargo = Get-Command cargo -ErrorAction SilentlyContinue
        if ($cargo) {
            $verifyBin = Join-Path $repoRoot "scripts\skills-rs"
            if (Test-Path (Join-Path $verifyBin "Cargo.toml")) {
                Write-Host "[Finalize] Ejecutando verify-pr-protocol..." -ForegroundColor Cyan
                Push-Location $verifyBin
                try {
                    cargo run --bin verify_pr_protocol 2>&1
                    if ($LASTEXITCODE -ne 0) {
                        Write-Error "verify-pr-protocol falló. Abortando finalize. Corrija y vuelva a ejecutar."
                        exit 1
                    }
                } finally {
                    Pop-Location
                }
            }
        }
    }

    $gitCreatePr = Join-Path $repoRoot "scripts\skills\git-create-pr\Git-Create-PR.bat"
    if (-not (Test-Path $gitCreatePr)) {
        Write-Error "No se encontró la skill git-create-pr: $gitCreatePr (paths.skillCapsules['git-create-pr'])."
        exit 1
    }
    Write-Host "[Finalize] Invocando skill git-create-pr (publicación y PR)..." -ForegroundColor Cyan

    # Nota: La interfaz exacta (parámetros) la define el ejecutable Rust en la cápsula.
    # Se invoca sin parámetros para usar defaults (rama actual, base detectada). Si se necesita título,
    # se recomienda pasar bodyFile/body desde el ejecutor o extender el wrapper.
    & $gitCreatePr
    $exitCode = $LASTEXITCODE
} finally {
    Pop-Location
}
exit $exitCode
