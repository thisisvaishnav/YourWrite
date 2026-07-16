# AGENTS.md

Guidance for AI coding agents (Claude Code, Codex, Warp, etc.) working in this repository.

## What this repo is

A portable agent skill implemented entirely as Markdown. The runtime artifact is `SKILL.md`: the agent reads its YAML frontmatter (metadata + allowed tools) followed by the editor prompt.

There is **no build step** and **no code to run**, and the repository should avoid wording that limits support to one or two harnesses.

---

## Key files

### `SKILL.md`
The skill itself.

Contains:
- YAML frontmatter (`name`, `version`, `description`, `compatibility`, `allowed-tools`)
- The canonical numbered pattern list
- Before/after examples

This is the **source of truth**.

### `README.md`
Documentation for humans.

Contains:
- Installation
- Usage
- Summary table of the patterns
- Version history

### `.claude-plugin/plugin.json`
Optional Claude Code plugin manifest.

### `.claude-plugin/marketplace.json`
Optional single-repository marketplace entry so users can run:

```bash
/plugin marketplace add blader/humanizer
```

---

## Maintenance contract

`SKILL.md` and `README.md` **must always stay in sync**.

Whenever behavior or content changes:

### Patterns

The skill currently defines **33 numbered patterns**.

If you:

- add a pattern
- remove a pattern
- renumber patterns

then update **all** of the following in the same change:

- README pattern table
- "33 Patterns Detected" heading
- Every cross-reference

Keep numbering stable unless you intentionally decide to renumber everything.

### Version

Keep these versions synchronized:

- `SKILL.md` → `version`
- `README.md` → Version History
- `.claude-plugin/plugin.json` → `version`

> **Note:** `marketplace.json` intentionally does **not** contain a version. `plugin.json` is the package source of truth.

### Compatibility

Keep installation and usage language **harness-neutral**.

The skill should work in **any AI agent harness capable of loading Markdown skill instructions**.

Examples include:

- Claude Code
- OpenCode
- Codex
- Warp
- Other compatible agent harnesses

These are examples, **not limitations**.

### Non-obvious fixes

If you update the prompt to address a subtle failure mode (for example, repeated incorrect edits or unexpected tone shifts), also add a brief explanation to the README Version History describing:

- what was fixed
- why the change was necessary

---

## Editing `SKILL.md`

When editing `SKILL.md`:

- Preserve valid YAML frontmatter.
- Do not change frontmatter formatting or indentation unnecessarily.
- Treat the prompt below the frontmatter as the product itself.
- Edit it as a carefully maintained instruction document rather than source code.
