# Reproducir skills en otros entornos SddIA

Guía complementaria al proceso **`create-skill`** (`paths.processPath/create-skill/`). Para **portar una skill concreta** (definición + cápsula + índice):

1. Copiar o recrear **`paths.skillsDefinitionPath/<skill-id>/`** (spec.md, spec.json con `implementation_path_ref` si hay ejecutable).
2. Copiar la **cápsula** bajo la ruta que resuelva **`paths.skillCapsules.<skill-id>`** en el Cúmulo del destino (o crear entrada nueva y ajustar `cumulo.paths.json`).
3. Fusionar **`paths.skillsIndexPath`** sin romper entradas existentes.
4. Validar contra **`SddIA/skills/skills-contract.md`** y **`SddIA/norms/capsule-json-io.md`**.
5. Registrar evolution en el destino si alteras `./SddIA/` (`SddIA/norms/sddia-evolution-sync.md`).

Portar solo el **proceso** documental de alta de skills: `SddIA/norms/reproducir-create-skill-en-otros-entornos-sddia.md`.
