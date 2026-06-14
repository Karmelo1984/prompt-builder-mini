---
name: pbw-issue
description: Use this skill when implementing one incremental issue in the Prompt Builder Wizard repository.
allowed-tools: Read Grep Glob Edit Write Bash
---

# Prompt Builder issue executor

Use this procedure for a single issue.

## Constraints

- Implement only the requested issue.
- Keep the diff small and reviewable.
- Do not install dependencies.
- Do not rewrite architecture.
- Do not introduce dead code.
- Do not use `any` unless there is no reasonable alternative.
- Do not change unrelated UI or styling.

## Process

1. Read `README.md`.
2. Inspect relevant files.
3. Summarize current structure in max 8 bullets.
4. Give a minimal plan by file.
5. Implement.
6. Run:
   - `npm run build`
   - `npm run lint` if script exists
   - `npm test` or `npm run test` if script exists
7. Fix errors.
8. Remove unused code.
9. Report final result.

## Final response format

- Structure detected
- Plan applied
- Files modified
- Technical decisions
- Commands executed
- Build/test result
- Residual risks