---
name: pbw-catalog
description: Use this skill when editing JSON catalog data, profiles, templates, artifacts, providers, compatibility, builder option rules, restrictions, context fields or outputs in the AI Prompt & Workflow Builder repository.
allowed-tools: Read Grep Glob Edit Write Bash
---

# AI Prompt & Workflow Builder catalog editor

Use this skill when modifying catalog data.

Catalog data includes:

- artifact kinds
- providers
- provider capabilities
- provider equivalents
- artifact-provider compatibility
- profiles
- prompt templates
- restrictions / constraints
- output formats
- context fields
- builder option rules
- export targets when they are catalog-driven

---

## Catalog architecture

Catalog data must flow through:

```text
UI → BuilderScreenModel / Service → CatalogRepository → JsonCatalogRepository → JSON
```

Forbidden:

```text
UI → JSON
handlers → JSON
renderer → JSON
renderer → catalog validation
renderer → provider compatibility rules
```

---

## JSON value rule

A JSON file must provide current value.

A JSON file provides current value when:

- It is currently used by the app.
- It replaces hardcoded TypeScript data.
- It removes duplicated TS/JSON sources of truth.
- It is connected by the current issue.
- It supports an actually available product capability.

A JSON file should be removed when:

- It is empty.
- It is not connected.
- It does not replace a hardcode.
- It only represents a future feature.
- Keeping it creates confusion about canonical data.

Do not keep placeholder JSON files just because they may be useful later.

---

## JSON shape

Catalog JSON files should use this base shape unless an existing connected contract requires otherwise:

```json
{
  "schemaVersion": 1,
  "items": []
}
```

Do not change the shape without updating:

- type definitions
- repository loading
- validation
- normalization
- documentation if affected

---

## ID rules

- Use lowercase kebab-case for dynamic ids.
- Keep ids stable.
- Do not rename existing ids unless migration is explicitly required.
- Do not duplicate ids.
- Do not use translated ids if a stable language-neutral id is possible.
- Keep labels user-facing and Spanish when shown to users.
- Keep internal ids stable and language-neutral when possible.

---

## Dynamic ids

Do not model catalog ids as closed unions or enums.

Use string aliases for dynamic catalog ids:

```ts
export type ProfileId = string;
export type TemplateId = string;
export type ConstraintId = string;
export type OutputFormatId = string;
export type ContextFieldId = string;
export type ArtifactKindId = string;
export type ProviderId = string;
```

Enums or const maps are acceptable only for stable domains when already part of the architecture.

---

## Required validation

When editing catalog data, validate:

- ids are not empty
- ids are unique
- required strings are not empty
- referenced profile ids exist
- referenced template ids exist when applicable
- referenced artifact ids exist
- referenced provider ids exist
- referenced constraints exist
- referenced outputs exist
- referenced context fields exist
- every template references an existing profile
- every profile has at least one available template if the profile is active
- compatibility references existing providers and artifacts
- builder option rules reference existing ids
- no unsupported feature is marked as available

---

## Profiles

Every profile must have:

- stable id
- label
- short description

Every active profile should have at least one template.

---

## Templates

Every prompt template must have:

- stable id
- label
- short description
- associated profile id
- recommended role
- recommended objective
- recommended context fields
- recommended restrictions
- recommended outputs
- recommended final question
- suggested output format

Do not change template semantics while doing structural catalog work unless the issue explicitly asks for it.

---

## Artifacts

Artifact catalog data must distinguish between:

- available
- coming soon
- unsupported
- internal/future only

Do not expose a future artifact as operational unless the issue implements the full flow.

Artifact examples:

- prompt
- skill
- hook
- project-instructions
- scoped-instructions
- prompt-file
- agent-instructions
- workflow
- checklist

Use the repository’s existing id convention if already defined.

---

## Providers

Provider catalog data must include only supported target providers.

Initial target providers:

- ChatGPT
- Claude
- Claude Code / Claude CLI
- GitHub Copilot

Do not add providers unless the issue explicitly requires it.

---

## Compatibility

Compatibility must not be hardcoded in UI.

Compatibility should represent:

- native
- equivalent
- partial
- unsupported

If there is no direct equivalent, say so in data or notes.

Do not pretend equivalent means native.

---

## Builder option rules

Rules for restrictions, outputs and context fields must come from JSON when catalog-driven.

Do not leave:

```ts
const allRules = [];
```

as the real implementation.

Rules must be validated against existing ids.

If no rule applies, fallback behavior must be explicit.

---

## Hardcoded data migration

When moving hardcoded data to JSON:

1. Identify the hardcoded source.
2. Create or update the canonical JSON.
3. Update TypeScript types if needed.
4. Load the JSON through `JsonCatalogRepository`.
5. Validate data.
6. Normalize data.
7. Remove the hardcoded source.
8. Remove unused imports/exports.
9. Run build/lint.

Do not leave both TS and JSON as active sources of truth.

---

## Commands

Always run:

```bash
npm run build
```

Run if available:

```bash
npm run lint
```

Run only if already available:

```bash
npm run test
```

---

## Final response format

```md
## Catalog area changed

- ...

## JSON files changed

- ...

## TypeScript files changed

- ...

## Hardcoded data removed

- ...

## Validation performed

- ...

## Commands executed

- `npm run build` — pass/fail
- `npm run lint` — pass/fail/not available
- `npm run test` — pass/fail/not available/not executed

## Residual risks

- ...

## Veredict

Catalog change cerrable: sí/no
```
