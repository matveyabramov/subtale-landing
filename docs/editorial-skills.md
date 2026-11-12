# Editorial skills for Codex — source integrity and workflow

Codex scans `.agents/skills/<name>/SKILL.md` inside the repository. The three skills present in this repository are:

| Skill | Installed content | Origin |
|---|---|---|
| `sasha` | Complete 12-file skill directory with scripts and test | `mishanaer/deslop`, main (checked 2026-11-12) |
| `humanizer-ru` | Complete 21-file public upstream directory | `ilyautov/humanizer-ru`, main (checked 2026-11-12) |
| `russian-editorial` | **Self-contained, reduced project adaptation** | Prepared from user's uploaded `russian-editorial(1).zip` (not a full ZIP import) |

## Source differences that matter

The user-supplied `humanizer-ru(1).zip` was **not copied byte-for-byte**. Its version differs from the selected upstream in five files:
- `SKILL.md`
- `references/catalog.md`
- `scripts/humanizer_metrics/facts.py`
- `scripts/humanizer_metrics/mcp_server.py`
- `scripts/scan.py`

The remaining 16 files matched upstream by Git blob SHA.

The user-supplied `russian-editorial(1).zip` has 28 files, including the 19-lesson source manifest and a test suite. The project adaptation currently has only `SKILL.md` and `references/compatibility.md`. **The original course references, examples, source manifest and tests are not in the repo.** For full-fidelity editorial work, import the complete user-supplied folder before relying on the source-specific details. Do not claim that the full personal skill is installed until this is done.

The original archive passed its own `tests/validate_structure.py`: metadata, relative links, 19 source records, 8 paired test artifacts. The original Humanizer scanner requires an optional Python dependency (`razdel`) that was unavailable in the verification environment.

## Full-fidelity replacement

When the original ZIP archives are available in Codex's workspace:

1. Unzip `russian-editorial(1).zip` and `humanizer-ru(1).zip` into a temporary directory.
2. Replace the corresponding project folders with **the complete** `russian-editorial/` and `humanizer-ru/` trees.
3. Keep `sasha/` unchanged.
4. Run `python3 .agents/skills/russian-editorial/tests/validate_structure.py` from inside the skill directory (where its relative paths work); verify three frontmatter `name` values.
5. Commit the resulting diff. Do not rewrite the original skill source or merge two versions file by file.
6. Check for duplicate user-level or project-level skills with the same name.

## Editorial task order

1. `$russian-editorial` audit first: audience, user value, facts, thesis, proof, layout and repetition, without rewriting.
2. `$russian-editorial` edit/write after the audit has been reviewed. Offer alternatives for Hero and section headings.
3. `$sasha` for CTA, FAQ, labels and other UI microcopy (not as a second general-purpose rewriting pass).
4. `$humanizer-ru` only when explicitly requested for one conservative style pass, then compare factual claims before/after.

Keep research notes and unverified product features separate from publishable claims.
