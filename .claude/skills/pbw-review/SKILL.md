---
name: pbw-review
description: Use this skill after implementing an issue to review architecture, dead code, TypeScript strictness, validation and regression risk.
allowed-tools: Read Grep Glob Bash
---

# Prompt Builder technical review

Review the current diff.

## Check

- No unnecessary architecture changes.
- No dead code.
- No unused types/constants/functions.
- No duplicated business logic.
- No business logic moved into DOM rendering.
- No external dependencies added.
- TypeScript strict remains valid.
- Build passes.
- Existing features are not broken:
  - compact mode
  - XML mode
  - copy
  - download
  - handoff
  - theme toggle
  - live prompt generation
  - checklist

## Output

Return:

- Pass/fail
- Problems found
- Suggested minimal fixes
- Commands executed