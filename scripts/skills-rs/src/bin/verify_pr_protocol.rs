//! Skill verify-pr-protocol
//! Alineado con SddIA/norms/pr-acceptance-protocol.md (frontend GesFer.Product.Front):
//! 1. Nomenclatura (validate-nomenclatura.ps1)
//! 2. Lint (npm run lint en src/)
//! 3. Build (npm run build en src/)
//! 4. Tests (npm run test en src/)

use std::path::Path;
use std::process::{exit, Command};

fn main() {
    println!("[VERIFY-PR-PROTOCOL] Protocolo de aceptación PR (GesFer.Product.Front)...");

    let shell = if cfg!(target_os = "windows") {
        "powershell"
    } else {
        "pwsh"
    };

    // 1. Nomenclature
    println!("[VERIFY-PR-PROTOCOL] 1/4 Nomenclatura...");
    if !run_command(
        shell,
        &[
            "-NoProfile",
            "-Command",
            "./scripts/validate-nomenclatura.ps1",
        ],
    ) {
        eprintln!("[ERROR] Nomenclatura: fallo o script no ejecutable.");
        exit(1);
    }

    let src = Path::new("src");
    if !src.is_dir() {
        eprintln!("[ERROR] No existe el directorio src/.");
        exit(1);
    }

    // 2. Lint
    println!("[VERIFY-PR-PROTOCOL] 2/4 Lint (npm run lint en src/)...");
    if !npm_in_src(&["run", "lint"]) {
        eprintln!("[ERROR] npm run lint falló.");
        exit(1);
    }

    // 3. Build
    println!("[VERIFY-PR-PROTOCOL] 3/4 Build (npm run build en src/)...");
    if !npm_in_src(&["run", "build"]) {
        eprintln!("[ERROR] npm run build falló.");
        exit(1);
    }

    // 4. Tests
    println!("[VERIFY-PR-PROTOCOL] 4/4 Tests (npm run test en src/)...");
    if !npm_in_src(&["run", "test"]) {
        eprintln!("[ERROR] npm run test falló.");
        exit(1);
    }

    println!("[VERIFY-PR-PROTOCOL] Todos los checks pasaron. PR listo para revisión.");
}

fn run_command(program: &str, args: &[&str]) -> bool {
    Command::new(program)
        .args(args)
        .status()
        .map(|s| s.success())
        .unwrap_or(false)
}

fn npm_in_src(args: &[&str]) -> bool {
    Command::new("npm")
        .args(args)
        .current_dir("src")
        .status()
        .map(|s| s.success())
        .unwrap_or(false)
}
