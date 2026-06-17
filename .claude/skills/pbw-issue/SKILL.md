---
name: pbw-issue
description: Use this skill when implementing one incremental issue in the AI Prompt & Workflow Builder repository.
allowed-tools: Read Grep Glob Edit Write Bash
---

# AI Prompt & Workflow Builder issue executor

Use this skill to implement exactly one issue in the AI Prompt & Workflow Builder repository.

This skill is the project-level execution contract. It replaces repeating the full master prompt in every issue.

---

## Project context

The project is **AI Prompt & Workflow Builder**.

Current product state:

- TypeScript + Vite SPA.
- Vanilla TypeScript with direct DOM rendering.
- No framework migration planned.
- Main operative capability: generate optimized prompts.
- Future target capabilities: skills, hooks, project instructions, scoped instructions, prompt files, agent instructions, workflows and checklists.
- The architecture must stay incremental and maintainable.
- The project owner wants low technical debt, no dead code and no fake future features.

---

## Current development priorities

When implementing any issue, respect this priority order:

1. Keep the current product working.
2. Stabilize visible UI before adding features.
3. Remove confusing or non-applicable UI.
4. Move hardcoded data into useful JSON catalogs.
5. Connect JSON through repositories, not directly from UI.
6. Remove JSON files that do not provide current value.
7. Remove code that does not provide current value.
8. Connect existing systems properly instead of leaving fake abstractions.
9. Keep tests automated for the final dedicated testing phase unless the issue explicitly says otherwise.

---

## Global constraints

- Implement only the requested issue.
- Do not mix issues.
- Keep the diff small and reviewable.
- Do not rewrite the app.
- Do not migrate to a framework.
- Do not install dependencies unless the issue explicitly allows it and the reason is justified.
- Keep TypeScript strict.
- Do not introduce `any`.
- Do not leave dead code.
- Do not leave unused types, constants, functions, classes or exports.
- Do not preserve placeholders that have no current value.
- Do not duplicate state.
- Do not move business logic into DOM rendering.
- Do not move catalog logic into DOM rendering.
- Do not import JSON directly from UI.
- Do not import JSON directly from handlers.
- Do not validate catalog data in handlers.
- Do not expose future features as available.
- Do not change unrelated UI or styling.
- Do not change ids unless the issue explicitly requires it.
- Do not rename existing ids without migration reasoning.
- Do not implement automated tests unless the issue explicitly asks for tests.
- Always run `npm run build`.
- Run `npm run lint` if the script exists.
- Run `npm run test` only if the script already exists.

---

## Product rules

### Available capability

Prompt generation is the current operative capability.

### Future capabilities

Skills, hooks, project instructions, scoped instructions, prompt files, agent instructions, workflows and checklists may exist as domain concepts or roadmap items.

They must not appear as working features unless the issue implements them completely.

### Provider compatibility

Do not fake compatibility.

If provider support is partial, equivalent or unsupported, the UI/domain must represent that honestly.

---

## UI rules

### Theme toggle

The clear/dark theme toggle must work during the current SPA session.

Rules:

- Do not use `localStorage`.
- Do not use `sessionStorage` unless the issue explicitly requires it.
- Do not add a preferences system.
- It is acceptable for theme to reset after page reload.
- Ensure the accessible label reflects the current action/state when applicable.

### Clear button

The Clear button must not appear on the home page.

Rules:

- Home has nothing to clear.
- The wizard may have a Clear button.
- In the wizard, Clear must reset the whole process.
- Clear must not affect the theme.
- Clear must not leave stale generated output.

Wizard clear should reset, when applicable:

- artifact
- provider
- profile
- template
- context fields
- additional context
- constraints
- output format
- generated prompt
- reviewRequired flags
- visible validation state

### Non-applicable copy

Remove or rewrite copy that does not apply to the current product state.

Do not replace it with marketing fluff or promises of unavailable features.

---

## Catalog and JSON rules

The project uses JSON catalog files, but JSON files must not exist as decoration.

A JSON file provides current value only if at least one of these is true:

- It contains data currently used by the application.
- It replaces hardcoded TypeScript data currently used by the application.
- It is connected in the current issue.
- It is required to remove an active TS/JSON duplication.
- It supports a current feature honestly represented in the UI.

A JSON file should be removed if all of these are true:

- It is empty or unused.
- It does not replace current hardcoded data.
- It is only for an unimplemented future feature.
- It is not connected in the current phase.
- Keeping it would confuse the canonical data source.

Correct dependency direction:

```text
UI → BuilderScreenModel / Service → CatalogRepository → JsonCatalogRepository → JSON
```

Forbidden:

```text
UI → JSON
handlers → JSON
renderer → catalog validation
renderer → provider compatibility rules
```

When editing catalog data:

- Keep ids stable.
- Use lowercase kebab-case ids.
- Do not duplicate ids.
- Validate references.
- Ensure required strings are not empty.
- Ensure templates reference existing profiles.
- Ensure restrictions, outputs and context fields referenced by templates exist.
- Ensure provider/artifact compatibility references existing provider and artifact ids.

---

## Hardcoded data rules

If the issue touches data that is currently hardcoded in TypeScript and there is a relevant JSON catalog:

1. Move the data to JSON.
2. Connect it through the repository.
3. Remove the hardcoded source.
4. Validate the JSON.
5. Ensure there is one active source of truth.

Do not leave duplicated TS and JSON data unless the issue explicitly requires a temporary migration step.

---

## `resolveBuilderOptions` rules

The `resolveBuilderOptions` system must not remain fake.

Forbidden:

```ts
const allRules = [];
```

Rules:

- Builder options must be resolved from real rules.
- Rules must come from JSON if they are catalog data.
- The renderer must not resolve rules.
- Handlers must not validate rule references.
- If no rules apply, use an explicit safe fallback.
- If the issue cannot connect the system fully, state the blocker clearly and do not pretend it works.

---

## Code cleanup rules

Remove code when it does not provide current value.

Examples of code that should not remain:

- Unused classes.
- Unused DTOs.
- Unused validators.
- Exports with no consumers.
- Placeholder exporters with no contract.
- Duplicated validation logic.
- Duplicated compatibility matrices.
- Transitional bridge methods that should now live in screen model or repository.
- Shallow-copy mutations that rely on reference leaks.

Do not keep code only because it “may be useful later”.

If it is needed later, it can be reintroduced then.

---

## Testing policy

Automated tests are intentionally postponed until the dedicated testing issue/phase unless the current issue explicitly asks for tests.

During normal issues:

- Do not install Vitest/Jest.
- Do not create a test framework.
- Do not add `npm run test` unless requested.
- Do run existing tests if they already exist.

Manual verification is allowed and expected for visible/runtime changes.

Manual verification is not a replacement for future automated tests. It is a lightweight issue-level sanity check.

---

## Required process

1. Read `README.md` if relevant to the issue.
2. Inspect the files directly affected by the issue.
3. Use `Grep`/`Glob` to find related references.
4. Summarize the current structure in maximum 8 bullets.
5. Identify hardcoded data related to the issue.
6. Identify dead code related to the issue.
7. Give a minimal file-level plan.
8. Implement only the requested issue.
9. Remove unused code introduced or exposed by the change.
10. Run required commands.
11. Perform manual verification if UI/runtime behavior changed.
12. Report final result.

---

## Required commands

Always run:

```bash
npm run build
```

Run if script exists:

```bash
npm run lint
```

Run only if script already exists:

```bash
npm run test
```

Do not add missing scripts unless the issue explicitly requires it.

---

## Final response format

Return the result using exactly these sections:

```md
## Structure detected

- ...

## Plan applied

- ...

## Files created

- ...

## Files modified

- ...

## Files deleted

- ...

## Technical decisions

- ...

## Code removed

- ...

## Commands executed

- `npm run build` — pass/fail
- `npm run lint` — pass/fail/not available
- `npm run test` — pass/fail/not available/not executed

## Manual verification

- ...

## Residual risks

- ...

## Veredict

Issue X.Y cerrable: sí/no
```

If the issue is not closable, explain the minimum remaining work.
