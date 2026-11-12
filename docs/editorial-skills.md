# Editorial skills — source integrity and workflow

Verified 2026-11-12 against `main` at `4b96bfbc50c2fbe774ea18576f16080dd8c1d32b`.

## Installed project packages

| Skill | Installed content | Authoritative source |
|---|---|---|
| `russian-editorial` | Complete 28-file tree: references, 19-lesson manifest, icon and test artifacts | User archive `russian-editorial(1).zip` |
| `humanizer-ru` | Complete 21-file tree; replaces the previous upstream variant | User archive `humanizer-ru(1).zip` |
| `sasha` | Existing 12-file tree, unchanged | Existing main; origin recorded as `mishanaer/deslop` |

Both imported directories were replaced as whole trees, not merged or rewritten. Every installed file was compared byte-for-byte with its ZIP member; the path sets also match exactly. No original content was omitted, including INSTALL.md and historical evaluation artifacts. Those artifacts are source material, not newly executed evaluations.

Archive SHA-256:

```text
f710b6e44fa8102219c36e9e1a8180f58f6fd339941f585a2d75c2dbb475b58a  russian-editorial(1).zip
d8ccbe7669052c04f35d9612b77a6b8d267a4aff3fac85b9c69e2a03fcb8abf2  humanizer-ru(1).zip
```

The previous reduced Russian Editorial had only two files. The previous Humanizer variant differed from this archive in SKILL.md, references/catalog.md, scripts/humanizer_metrics/facts.py, scripts/humanizer_metrics/mcp_server.py and scripts/scan.py. The archive versions now take precedence; no original instructions were edited.

## Verification

Run from the repository root:

```bash
python3 .agents/skills/russian-editorial/tests/validate_structure.py
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s .agents/skills/sasha/tests -v
```

- Russian Editorial validator: PASS (metadata, relative references, 19 source records, 8 paired test artifacts, clean package). It resolves its own root; a special working directory is not required.
- Sasha: all 6 unit tests passed. No source files changed; its Git tree remains `b7ca2dde7b145c073b010870d91163e001c4680e`.
- All three SKILL.md files have matching name frontmatter; all Python files parse successfully via ast.parse without generating bytecode.
- Humanizer has no bundled test suite. Scanner availability was checked with `--help` only, without landing copy. The environment lacks razdel, so the scanner reports missing dependencies. No style scan, rewrite or Humanizer editorial pass was performed.
- Russian Editorial's comparative evaluation protocol was read; the historical eight-task experiment was not rerun. Structural validation does not establish editorial effectiveness or client loading in every environment.
- Project scope has one directory per skill name. Personal Russian Editorial and Humanizer also appear in this session's catalog; they were not modified. Explicitly read the project SKILL.md and its local references for reproducible project work. Matching names do not establish identical versions.

## Branch comparison — no merge

| Ref | SHA |
|---|---|
| Base main | `4b96bfbc50c2fbe774ea18576f16080dd8c1d32b` |
| codex/refine-wireframe | `d699059` |
| Common ancestor | `7f1acc7a671754292eb65610c9a146e28e8e1420` |

The branches diverged: refine-wireframe has 1 unique commit, main has 6. Main contains the launch-copy pass, answer-field/CSS work, Pages workflow, editorial skills and roadmap documentation.

The refine commit changes five paths relative to the common ancestor: wireframe/REVIEW.md, wireframe/fonts/Inter-variable.ttf, wireframe/fonts/OFL.txt, wireframe/index.html and wireframe/wireframe.css (379 insertions, 19 deletions, plus the binary font). It adds local Inter/preloading, responsive sizing and grids, mobile comparison layout, focus/skip-link support, reduced-motion handling, decorative aria attributes and an editable answer field. Its REVIEW.md records earlier QA, not checks rerun here.

A direct tip-to-tip diff also exposes old draft copy and internal labels in refine-wireframe. A blind merge risks restoring those labels or superseded wording and conflicting with main's answer-field styles. A future transfer must select technical changes individually while preserving approved copy. No merge, cherry-pick, landing or Pages configuration change was made. Browser layout QA is deferred because this task changes only skill packages and Markdown.

## Editorial order

1. Russian Editorial / audit: audience, value, claims, thesis, evidence and repetition. Current result: [copy-audit.md](copy-audit.md).
2. After review, Russian Editorial / edit or / write for separate copy-v3.md with headings, supporting text and CTA proposals.
3. Sasha for targeted interface microcopy, not a second general rewriting pass.
4. Humanizer only on an explicit request for a final style pass, followed by a factual comparison.

Keep research hypotheses separate from publishable claims. A commercial voice or classroom scenario does not prove integrations, automatic discovery, learning outcomes or release readiness.
