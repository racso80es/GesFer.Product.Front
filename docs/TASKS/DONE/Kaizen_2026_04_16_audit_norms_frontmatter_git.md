---
id: Kaizen_2026_04_16_audit_norms_frontmatter_git
status: PENDING
priority: low
created: 2026-04-16
type: Kaizen
---
# Kaizen Task: Audit Norms - Add YAML Frontmatter to Git Norm

## Objective
Standardize the SddIA norms documentation by ensuring `SddIA/norms/git-via-skills-or-process.md` includes the required YAML Frontmatter block (`id`, `name`, `type`, `status`), conforming to the `entidades-dominio-ecosistema-sddia.md` norm.

## Rationale
During a continuous improvement review, it was noticed that some norm files lack the expected metadata block at the top. Maintaining consistent metadata allows for automated parsing, validation, and improved governance of SddIA artifacts without affecting their functional content.

## Action Plan
1. Edit `SddIA/norms/git-via-skills-or-process.md`.
2. Prepend a YAML Frontmatter block to the file content.
3. Ensure the operational text remains exactly as it was.
