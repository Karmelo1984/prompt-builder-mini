---
name: pbw-catalog
description: Use this skill when editing profiles, templates, recommended fields, restrictions or outputs in the Prompt Builder Wizard.
allowed-tools: Read Grep Glob Edit Write Bash
---

# Prompt Builder catalog editor

Use this when modifying profile/template catalog data.

## Catalog rules

Every profile must have:

- stable id
- label
- short description

Every template must have:

- stable id
- label
- short description
- associated profile id
- recommended role
- recommended objective
- recommended fields
- recommended restrictions
- recommended outputs
- recommended final question
- suggested output format

## ID rules

- Use lowercase kebab-case.
- Do not rename existing ids unless migration is explicitly required.
- Do not duplicate ids.
- Keep labels user-facing and Spanish.
- Keep internal ids stable and language-neutral if possible.

## Validation

After editing catalogs:

1. Ensure all referenced profile ids exist.
2. Ensure each profile has at least one template.
3. Ensure all required template fields are populated.
4. Run `npm run build`.