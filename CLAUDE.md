# Prompt Builder — Claude Code Instructions

## Project goal

This app is a TypeScript + Vite wizard for generating structured prompts for GPT, Claude and Claude Code.

The current product direction is to evolve from a programming-only prompt wizard into a profile/template-based Prompt Builder.

## Hard rules

- Do not rewrite the app.
- Do not migrate to a framework.
- Do not install dependencies.
- Keep TypeScript strict.
- Prefer incremental, reviewable diffs.
- Do not introduce `any` unless explicitly justified in the final response.
- Do not duplicate business logic between renderer, handlers and services.
- Do not put business logic in DOM rendering.
- Do not leave dead code, unused types, unused constants or commented-out old implementations.
- Do not modify global styles unless required by the issue.
- Do not add localStorage, history, import/export or analytics unless the current issue explicitly asks for it.
- Always inspect the real code before changing it.

## Expected architecture

Treat this as expected, not guaranteed. Inspect the repo first.

- `src/app.ts`: app entry and orchestration.
- `src/data/catalogs.ts`: catalogs and static data.
- `src/models/`: DTOs, types and mappers.
- `src/services/PromptBuilder.ts`: prompt generation and business logic.
- `src/validation/PromptValidator.ts`: validation/checklist.
- `src/ui/renderer.ts`: DOM rendering.
- `src/handlers/index.ts`: event handling.
- `index.html`: page structure.
- `styles.css`: visual styling.

## Implementation protocol

For every issue:

1. Read `README.md`.
2. Inspect relevant files before editing.
3. Summarize actual structure in max 8 bullets.
4. Propose a minimal file-by-file plan.
5. Implement only the requested issue.
6. Run `npm run build`.
7. If `lint` or `test` scripts exist, run them too.
8. Fix failures.
9. Remove dead code.
10. Return:
   - structure detected;
   - files modified;
   - decisions made;
   - commands executed;
   - build/test result;
   - residual risk, if any.

## Product direction

Target flow:

1. Profile
2. Template
3. Specific context
4. AI control / restrictions
5. Required output

Supported profiles:

- Product Owner
- QA Manual
- QA Automation
- Developer
- Tech Lead / Architect
- Product Designer / UX
- Data Analyst
- DevOps / SRE