//! Observa cambios bajo ./SddIA/ y emite avisos (debounce) para ejecutar sddia_evolution_register.

use notify::{Config, RecommendedWatcher, RecursiveMode, Watcher};
use std::path::Path;
use std::sync::mpsc::channel;
use std::time::{Duration, Instant};
use std::{env, thread};

fn repo_root() -> std::path::PathBuf {
    if let Ok(r) = env::var("SDDIA_REPO_ROOT") {
        let p = std::path::PathBuf::from(r.trim());
        if p.is_dir() {
            return p;
        }
    }
    std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("../..")
        .canonicalize()
        .expect("repo root")
}

fn main() {
    let root = repo_root();
    let watch_path = root.join("SddIA");
    if !watch_path.is_dir() {
        eprintln!("No existe {}", watch_path.display());
        std::process::exit(1);
    }

    let (tx, rx) = channel();
    let mut watcher = RecommendedWatcher::new(
        move |res| {
            if let Ok(e) = res {
                let _ = tx.send(e);
            }
        },
        Config::default(),
    )
    .expect("watcher");

    watcher
        .watch(Path::new(&watch_path), RecursiveMode::Recursive)
        .expect("watch SddIA");

    eprintln!(
        "[sddia_evolution_watch] Observando {} (Ctrl+C para salir)",
        watch_path.display()
    );

    let mut last_emit = Instant::now()
        .checked_sub(Duration::from_secs(10))
        .unwrap_or_else(Instant::now);
    let debounce = Duration::from_millis(1500);

    while let Ok(ev) = rx.recv() {
        let paths_dbg = format!("{:?}", ev.paths);
        if paths_dbg.contains(".git") {
            continue;
        }
        let now = Instant::now();
        if now.duration_since(last_emit) < debounce {
            thread::sleep(debounce.saturating_sub(now.duration_since(last_emit)));
        }
        last_emit = Instant::now();
        eprintln!(
            "[sddia_evolution_watch] Cambio bajo SddIA/. Si aplica, ejecute sddia_evolution_register (stdin JSON). paths={:?}",
            ev.paths
        );
    }
}
