---
name: pbw-commit
description: Use this skill to generate a Spanish Conventional Commit message from the current git changes in the AI Prompt & Workflow Builder repository.
allowed-tools: Bash
---

# Spanish commit message generator

Use this skill when the user asks for a commit message after making changes in the AI Prompt & Workflow Builder repository.

---

## Goal

Generate a standard commit message in Spanish based only on the actual git changes present in the repository.

The message must follow Conventional Commits format and must describe what really changed, not what the issue or prompt intended to change.

---

## Constraints

- Do not run `git commit`.
- Do not run `git add`.
- Do not modify files.
- Do not install dependencies.
- Do not infer changes from the issue description if they are not present in the diff.
- Do not invent affected areas, files, behavior, or validation results.
- Do not mention files unless it improves clarity.
- Keep the message concise, specific and reviewable.
- Use Spanish for the summary and body.
- Use English only for Conventional Commits keywords, for example `feat`, `fix`, `docs`, `BREAKING CHANGE`.
- Prefer staged changes when present.
- If staged changes exist, generate the commit message only from staged changes.
- If no staged changes exist, generate the commit message from unstaged and untracked changes.
- Do not read large generated files, binary files, dependency folders, build outputs, coverage outputs or lockfile diffs unless they are the main change.
- Do not claim build/lint/test passed unless the user provided that result or the diff contains that evidence.

---

## Process

1. Inspect the repository state:

```bash
git status --short
```

2. Determine whether staged changes exist:

```bash
git diff --cached --name-only
```

3. If staged changes exist, inspect only staged changes:

```bash
git diff --cached --stat
git diff --cached --name-only
git diff --cached
```

4. If there are no staged changes, inspect unstaged changes:

```bash
git diff --stat
git diff --name-only
git diff
```

5. If there are no staged changes, inspect untracked files:

```bash
git ls-files --others --exclude-standard
```

6. If there are untracked files, inspect their content only when they are relevant text files.

Prefer safe read-only commands such as:

```bash
sed -n '1,220p' <file>
```

7. Avoid dumping very large diffs into context.

If the diff is large:

- inspect `git diff --stat`
- inspect `git diff --name-only`
- inspect only the most relevant files
- summarize based on concrete file-level changes

8. Determine whether the changes form one coherent commit.

9. If the changes are clearly unrelated, return split commit suggestions instead of forcing one vague commit.

10. Determine the commit type.

11. Determine the scope only if it is clear.

12. Generate the commit message.

13. Return only the requested output format.

---

## Commit selection rules

If staged changes exist:

- Generate the message only for staged changes.
- Ignore unstaged and untracked changes unless the user explicitly asks to include them.

If no staged changes exist:

- Generate the message for unstaged and relevant untracked changes.

If there are no staged, unstaged or untracked changes, return:

```text
No hay cambios en git para generar un mensaje de commit.
```

---

## Commit type rules

Use the most accurate Conventional Commit type:

- `feat`: nueva funcionalidad visible o nueva capacidad de producto
- `fix`: corrección de bug
- `refactor`: cambio interno sin alterar comportamiento esperado
- `docs`: cambios de documentación
- `test`: cambios en tests
- `style`: formato, estilos o cambios visuales sin cambio funcional
- `build`: cambios en dependencias, empaquetado, scripts o configuración de build
- `ci`: cambios en workflows o integración continua
- `chore`: mantenimiento general sin impacto funcional directo
- `perf`: mejora de rendimiento
- `revert`: reversión de cambios

When several types could apply, choose the one that best represents the main purpose of the diff.

Examples:

- Changes in `.github/workflows/*` usually use `ci`.
- Changes in `package.json` or lockfiles usually use `build`, unless they are only metadata.
- Changes only in `README.md` usually use `docs`.
- Changes only in `docs/*` usually use `docs`.
- Changes only in `.claude/*` usually use `chore(claude)` or `docs`, depending on whether they configure assistant behavior or document usage.
- Changes in source code that add user-facing behavior usually use `feat`.
- Changes in source code that correct broken behavior usually use `fix`.
- Changes that simplify code without changing behavior usually use `refactor`.
- Changes that only move files or reorganize internals without behavior change usually use `refactor`.

---

## Scope rules

Use a scope only when it is clear from the changed files or affected module.

Preferred scopes:

- `app`
- `architecture`
- `builder`
- `catalog`
- `wizard`
- `prompts`
- `profiles`
- `templates`
- `ui`
- `config`
- `docs`
- `deps`
- `ci`
- `claude`
- `theme`
- `export`
- `tracking`
- `history`
- `favorites`
- `hooks`
- `skills`

Omit the scope if it would be vague or misleading.

Valid formats:

```text
<type>(<scope>): <resumen en castellano>
```

```text
<type>: <resumen en castellano>
```

For breaking changes:

```text
<type>(<scope>)!: <resumen en castellano>
```

or:

```text
<type>!: <resumen en castellano>
```

---

## Title rules

- Write the title in Spanish.
- Keep it short and specific.
- Prefer under 72 characters when possible.
- Do not end the title with a period.
- Use lowercase after the colon unless a proper noun requires uppercase.
- Do not use generic titles such as:
  - `chore: cambios varios`
  - `fix: corrige errores`
  - `docs: actualiza documentación`
  - `feat: añade mejoras`

Prefer specific titles such as:

```text
docs(readme): actualiza la arquitectura real del builder
```

```text
fix(theme): corrige el cambio de tema sin persistencia
```

```text
chore(claude): refuerza las skills de ejecución de issues
```

---

## Body rules

Add a body only when the diff contains multiple meaningful changes or when the title alone would be ambiguous.

When adding a body:

- Use short bullet points.
- Maximum 4 bullets.
- Each bullet must be based on the actual diff.
- Do not repeat the title.
- Do not mention validation commands unless validation output files or documentation were changed.
- Do not claim that build, lint or tests passed unless the user provided that result or the diff includes that evidence.

Example:

```text
refactor(catalog): mueve compatibilidad de proveedores a JSON

- carga la matriz desde el repositorio de catálogo
- elimina la fuente duplicada en TypeScript
- mantiene la validación de referencias entre proveedor y artefacto
```

---

## Split commit rules

If the diff clearly contains unrelated changes, return split commit suggestions.

Use this format:

```text
Suggested split commits

1. <type>(<scope>): <resumen en castellano>

2. <type>(<scope>): <resumen en castellano>
```

Only suggest split commits when the separation is obvious from the diff.

Examples of unrelated changes:

- source refactor + CI workflow change
- documentation rewrite + dependency update
- Claude skill changes + app feature changes
- unrelated bug fixes in different modules

If the changes are related to one issue or one architectural phase, prefer a single commit with a concise body.

---

## Breaking changes

If the diff introduces an incompatible change:

1. Add `!` after the type or scope.
2. Add a footer with `BREAKING CHANGE:`.

Example:

```text
feat(config)!: cambia la estructura de perfiles de prompts

BREAKING CHANGE: la configuración anterior de perfiles deja de ser compatible.
```

---

## No changes

If there are no staged, unstaged or untracked changes, return:

```text
No hay cambios en git para generar un mensaje de commit.
```

---

## Output format

For a single commit, return only this:

```text
Suggested commit message

<commit message>
```

For split commits, return only this:

```text
Suggested split commits

1. <commit message>

2. <commit message>
```

Do not add explanations outside the requested output format.
