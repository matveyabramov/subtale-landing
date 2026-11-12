#!/usr/bin/env python3
"""Check the portable skill package; no network, no text scoring."""
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
errors = []
def check(condition, message):
    if not condition:
        errors.append(message)

text = (root / "SKILL.md").read_text()
m = re.match(r"\A---\n(.*?)\n---\n", text, re.S)
check(bool(m), "SKILL.md: YAML frontmatter missing")
if m:
    fields = dict(re.findall(r"^(name|description):\s*(.+)$", m[1], re.M))
    name = fields.get("name", "").strip('"')
    description = fields.get("description", "").strip('"')
    check(name == "russian-editorial", "Wrong skill name")
    check(bool(re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", name)) and len(name) <= 64, "Invalid skill name")
    check(0 < len(description) <= 1024, "Invalid description length")
check(len(text.splitlines()) < 500, "SKILL.md should stay below 500 lines")
for md in root.rglob("*.md"):
    for target in re.findall(r"\]\(([^)]+)\)", md.read_text()):
        if target.startswith(("https://", "http://", "#", "mailto:")):
            continue
        candidate = (md.parent / target.split("#", 1)[0]).resolve()
        check(candidate.is_relative_to(root), f"{md.name}: reference leaves package: {target}")
        check(candidate.exists(), f"{md.name}: missing reference: {target}")
check((root / "agents/openai.yaml").is_file(), "UI metadata missing")
ui = (root / "agents/openai.yaml").read_text()
check("$russian-editorial" in ui, "default_prompt must name the skill")
tasks = json.loads((root / "tests/prompts.json").read_text())
ids = [x["id"] for x in tasks]
check(len(ids) == len(set(ids)) == 8, "Expected eight unique test tasks")
check({x["mode"] for x in tasks} == {"write", "edit", "audit"}, "Test modes incomplete")
for filename in ["before.json", "after.json"]:
    path = root / "tests" / filename
    check(path.is_file(), filename + " missing")
    if path.is_file():
        outputs = json.loads(path.read_text())
        check({x["id"] for x in outputs} == set(ids), filename + ": task IDs differ")
        check(all(isinstance(x.get("output"), str) and x["output"].strip() for x in outputs), filename + ": empty output")
manifest = json.loads((root / "references/source-manifest.json").read_text())
check(len(manifest["lessons"]) == 19, "Source manifest must cover 19 lessons")
check([x["lesson"] for x in manifest["lessons"]] == list(range(1,20)), "Lesson numbering differs")
for lesson in manifest["lessons"]:
    check(bool(lesson["youtube_url"]), "Lesson URL missing")
    check(len(lesson["sha256"]) == 64, "Source hash missing")
    check(bool(lesson["anchors"]), "Source anchors missing")
for forbidden in ["__pycache__", ".DS_Store"]:
    check(not any(root.rglob(forbidden)), f"Unwanted generated file: {forbidden}")
if errors:
    raise SystemExit("\n".join(errors))
print("PASS: metadata, relative references, 19 source records, 8 paired test artifacts, clean package")
