---
name: pbw-review
description: Use this skill after implementing an issue or phase in the AI Prompt & Workflow Builder repository to review architecture, catalog consistency, dead code, TypeScript strictness and regression risk.
allowed-tools: Read Grep Glob Bash
---

# AI Prompt & Workflow Builder technical review

Use this skill to review an implemented issue, a phase closure or the current diff.

This skill audits. It must not implement features.

---

## Review goal

Determine whether the current change is safe, minimal, maintainable and consistent with the AI Prompt & Workflow Builder architecture.

The review must identify:

- Broken constraints.
- Dead code.
- Duplicated data sources.
- JSON catalog inconsistencies.
- Hardcoded data that should be catalog data.
- UI/runtime regressions.
- TypeScript strictness problems.
- Hidden future-feature promises.
- Missing manual verification.

---

## Global review constraints

- Do not implement new features.
- Do not perform large refactors.
- Do not install dependencies.
- Do not add tests unless the review issue explicitly asks for that.
- Do not hide debt.
- Do not assume intent from the issue text if the diff does something else.
- Review actual repository state and actual diff.
- Prefer concrete file-level findings.
- Keep suggested fixes minimal.

---

## Commands to inspect state

Start with:

```bash
git status --short
git diff --stat
git diff --name-only
```

If staged changes exist:

```bash
git diff --cached --stat
git diff --cached --name-only
```

Inspect relevant files with `Read`, `Grep` or targeted shell commands.

Avoid dumping large generated files.

---

## Required checks

### 1. Scope control

Check:

- The change implements only the requested issue.
- No unrelated UI/styling changes.
- No unrelated architecture rewrites.
- No unrelated catalog edits.
- No unrelated formatting churn.

Fail if unrelated changes create review risk.

---

### 2. TypeScript and build

Check:

- TypeScript strict remains valid.
- No `any` was introduced.
- No unsafe assertion was introduced without justification.
- Build passes.
- Lint passes if available.
- Existing tests pass if available.

Required command:

```bash
npm run build
```

Run if available:

```bash
npm run lint
npm run test
```

---

### 3. Dead code

Check for:

- Unused imports.
- Unused exports.
- Unused constants.
- Unused types.
- Unused functions.
- Unused classes.
- Placeholder code without current value.
- DTOs with no runtime value.
- Validators not connected to runtime.
- Transitional methods no longer needed.

Fail if new dead code is introduced.

Suggest removal when existing dead code is exposed by the issue.

---

### 4. Catalog and JSON

Check:

- UI does not import JSON directly.
- Handlers do not import JSON directly.
- Renderer does not validate catalog data.
- Catalog data flows through `CatalogRepository` / `JsonCatalogRepository`.
- JSON files kept in the repo provide current value.
- Empty JSON files are not kept as decoration.
- Hardcoded catalog data was moved to JSON when required.
- There is no active TS/JSON duplicated source of truth.
- Catalog ids are stable.
- No duplicate ids.
- No broken references.
- Required strings are not empty.

Specific catalog areas:

- artifact kinds
- providers
- provider capabilities
- provider equivalents
- artifact-provider compatibility
- profiles
- templates
- constraints
- outputs
- context fields
- builder option rules

---

### 5. Provider/artifact compatibility

Check:

- No compatibility matrix is duplicated.
- Compatibility is not hardcoded in renderer.
- Compatibility is not hardcoded inline in repository if JSON is the canonical source.
- Unsupported/partial/equivalent/native states are represented honestly.
- UI does not show unsupported future features as available.

---

### 6. `resolveBuilderOptions`

Check:

- It is not a fake system.
- It does not use `allRules = []` hardcoded as the real implementation.
- Rules come from JSON when the issue touches builder options.
- Fallback is explicit and safe.
- Renderer does not resolve applicability rules.
- Referenced ids are validated.

Fail if the system pretends to work but has no runtime effect.

---

### 7. UI behavior

Check existing behavior is not broken:

- home loads
- wizard loads
- theme toggle works during session
- theme does not use localStorage
- Clear button is not shown on home
- Clear button resets wizard when present
- prompt generation still works
- XML mode still works
- compact mode still works
- copy still works
- download still works
- handoff still works if present
- live prompt generation still works
- checklist still works

---

### 8. Product honesty

Check:

- The UI does not promise unavailable features.
- Prompt generation remains the only clearly operative capability unless the issue implements more.
- Skills/hooks/workflows are not exposed as working features unless complete.
- Provider equivalences are not described as exact if they are partial/equivalent.

---

### 9. State management

Check:

- No duplicated state.
- No hidden mutation through shallow copies.
- `reviewRequired` or equivalent state is updated through explicit APIs.
- Reset behavior is explicit.
- Theme state is not persisted unless explicitly requested.

---

### 10. Tests policy

Check:

- Automated tests are not added before the dedicated testing issue unless explicitly requested.
- Existing tests are not removed without reason.
- Manual verification is documented for UI/runtime changes.
- Test-related documentation does not claim tests exist if they do not.

---

## Review output format

Return exactly:

```md
## Pass/fail

Pass/Fail

## Problems found

- ...

## Required fixes

- ...

## Suggested minimal fixes

- ...

## Commands executed

- `git status --short` — pass/fail
- `git diff --stat` — pass/fail
- `npm run build` — pass/fail
- `npm run lint` — pass/fail/not available
- `npm run test` — pass/fail/not available/not executed

## Regression risk

Low/Medium/High

## Residual debt

- ...

## Veredict

Issue/Fase X cerrable: sí/no
```

If the result is `no`, state the smallest set of changes needed to make it closable.
