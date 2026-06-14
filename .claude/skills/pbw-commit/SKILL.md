---

name: pbw-commit
description: Use this skill to generate a Spanish Conventional Commit message from the current git changes in the Prompt Builder repository.
allowed-tools: Bash
-------------------

# Spanish commit message generator

Use this skill when the user asks for a commit message after making changes in the Prompt Builder repository.

## Goal

Generate a standard commit message in Spanish based only on the actual git changes present in the repository.

The message must follow Conventional Commits format and must describe what really changed, not what the issue or prompt intended to change.

## Constraints

* Do not run `git commit`.
* Do not run `git add`.
* Do not modify files.
* Do not install dependencies.
* Do not infer changes from the issue description if they are not present in the diff.
* Do not invent affected areas, files, behavior, or validation results.
* Do not mention files unless it improves clarity.
* Keep the message concise, specific, and reviewable.
* Use Spanish for the summary and body.
* Use English only for Conventional Commits keywords, for example `feat`, `fix`, `docs`, `BREAKING CHANGE`.

## Process

1. Inspect the repository state:

   ```bash
   git status --short
   ```

2. Inspect unstaged changes:

   ```bash
   git diff --stat
   git diff --name-only
   git diff
   ```

3. Inspect staged changes:

   ```bash
   git diff --cached --stat
   git diff --cached --name-only
   git diff --cached
   ```

4. Inspect untracked files:

   ```bash
   git ls-files --others --exclude-standard
   ```

5. If there are untracked files, inspect their content when they are relevant text files.

   Prefer safe read-only commands such as:

   ```bash
   sed -n '1,220p' <file>
   ```

   Do not inspect large generated files unless needed.

6. Determine the commit type.

7. Determine the scope only if it is clear.

8. Generate the commit message.

9. Return only the requested output format.

## Commit type rules

Use the most accurate Conventional Commit type:

* `feat`: nueva funcionalidad visible o nueva capacidad de producto
* `fix`: corrección de bug
* `refactor`: cambio interno sin alterar comportamiento esperado
* `docs`: cambios de documentación
* `test`: cambios en tests
* `style`: formato, estilos o cambios visuales sin cambio funcional
* `build`: cambios en dependencias, empaquetado, scripts o configuración de build
* `ci`: cambios en workflows o integración continua
* `chore`: mantenimiento general sin impacto funcional directo
* `perf`: mejora de rendimiento
* `revert`: reversión de cambios

When several types could apply, choose the one that best represents the main purpose of the diff.

Examples:

* Changes in `.github/workflows/*` usually use `ci`.
* Changes in `package.json` or `package-lock.json` usually use `build`, unless they are only metadata.
* Changes only in `README.md` usually use `docs`.
* Changes only in `.claude/*` usually use `chore` or `docs`, depending on whether they document usage or configure assistant behavior.
* Changes in source code that add user-facing behavior usually use `feat`.
* Changes in source code that correct broken behavior usually use `fix`.
* Changes that simplify code without changing behavior usually use `refactor`.

## Scope rules

Use a scope only when it is clear from the changed files or affected module.

Preferred scopes for this repository:

* `app`
* `builder`
* `wizard`
* `prompts`
* `profiles`
* `templates`
* `ui`
* `config`
* `docs`
* `deps`
* `ci`
* `claude`

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

## Title rules

* Write the title in Spanish.
* Keep it short and specific.
* Prefer under 72 characters when possible.
* Do not end the title with a period.
* Use lowercase after the colon unless a proper noun requires uppercase.
* Do not use generic titles such as:

  * `chore: cambios varios`
  * `fix: corrige errores`
  * `docs: actualiza documentación`
  * `feat: añade mejoras`

Prefer specific titles such as:

```text
docs(readme): actualiza el nombre público de la aplicación
```

```text
ci(pages): ajusta el despliegue con el nuevo nombre de la app
```

```text
chore(claude): añade skill para generar commits en castellano
```

## Body rules

Add a body only when the diff contains multiple meaningful changes or when the title alone would be ambiguous.

When adding a body:

* Use short bullet points.
* Maximum 4 bullets.
* Each bullet must be based on the actual diff.
* Do not repeat the title.
* Do not mention validation commands unless the diff includes validation-related changes.

Example:

```text
feat(profiles): añade perfiles de uso para generación de prompts

- incorpora perfiles orientados a producto, QA, desarrollo y diseño
- conecta las plantillas disponibles con cada perfil
- mantiene la configuración tipada sin introducir código muerto
```

## Breaking changes

If the diff introduces an incompatible change:

1. Add `!` after the type or scope.
2. Add a footer with `BREAKING CHANGE:`.

Example:

```text
feat(config)!: cambia la estructura de perfiles de prompts

BREAKING CHANGE: la configuración anterior de perfiles deja de ser compatible.
```

## No changes

If there are no staged, unstaged, or untracked changes, return:

```text
No hay cambios en git para generar un mensaje de commit.
```

## Output format

Return only this:

```text
Suggested commit message

<commit message>
```

Do not add explanations before or after the output.

## Examples

```text
Suggested commit message

fix(editor): corrige la actualización de variables al editar prompts
```

```text
Suggested commit message

feat(templates): añade plantillas por perfil de uso

- incorpora plantillas para producto, QA, desarrollo y diseño
- mantiene la selección tipada desde la configuración
- evita duplicar lógica de generación de prompts
```

```text
Suggested commit message

docs: actualiza la documentación del flujo de trabajo
```

```text
Suggested commit message

ci(pages): ajusta el despliegue de GitHub Pages
```

```text
Suggested commit message

chore(claude): añade skill para commits convencionales en castellano
```
