# SUBTALE landing — instructions for Codex

## Scope
- This repository is the single source of code for SUBTALE: wireframe now, final landing later.
- Read `README.md`, `docs/structure-v2.1.md`, and `docs/figma-references.md` before editing.
- Work on `/wireframe/` only until the user explicitly approves final design.
- Keep the prototype low-fidelity, monochrome, typography-led, with editable HTML/CSS and responsive layouts.
- Preserve the nine approved content blocks and their order unless instructed otherwise.
- Public-facing copy in /wireframe/ should read like a launch-ready sales page: confident, human-readable and free of internal stage labels, AIDA markers, concepts, research caveats and developer notes.
- Keep the factual distinction internally: SUBTALE is a project concept and automated discovery of missed meaning is an unvalidated mechanism. Never tell the user that a backend feature is implemented when it isn't.
- Do not invent testimonials, launch dates, integrations, metrics, prices or scientific claims.
- Do not replace visual-only image/video placeholders with technical placeholder captions. Keep the placeholder geometry but use consumer-facing labels only.
- The comparison block must contrast common viewing workflows fairly, without claiming competitors lack functions that may overlap.
- Preserve copy edits from the 2026-11-06 launch-narrative pass unless the user requests revisions.
- Do not replace the wireframe with screenshots, generated image assets, or a fully styled brand design.
- Keep future final site at the repository root. Preserve /wireframe/ for review and comparison.
- Use branches/commits for subsequent iterations, not copies of entire projects in multiple folders.
- Never enable public GitHub Pages without the user's explicit approval.

## Review / quality
- Run locally and test 1440px and 390px widths, focus visibility, overflowing text, and the scene reveal / FAQ.
- Explain meaningful changes, files touched, and verification results.
- Do not silently rewrite approved copy or change the scope.


## Editorial skills and workflow
Project-scoped Codex skills: `.agents/skills/russian-editorial/`, `.agents/skills/sasha/`, `.agents/skills/humanizer-ru/`.
- Substantive copy and claims: `$russian-editorial` (audit/write/edit).
- Interface microcopy and CTAs: `$sasha`.
- Optional single final pass for natural Russian: `$humanizer-ru`.
Do not invoke all three by default. Preserve approved claims and voice; never fabricate integration, streaming compatibility, launch results, pricing, testimonials, or statistics.
Follow `docs/gridnev-roadmap.md` in separate iterations. First content task: audit in Markdown only, no HTML/CSS changes. Do not revert changes in `main` by merging the old `codex/refine-wireframe` content blindly.
