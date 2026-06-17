# Backlog Fase 4 — Artefactos reutilizables

**Estado de entrada:** Fase 3 cerrada.  
**Aplicación:** AI Prompt & Workflow Builder.  
**Objetivo de la fase:** empezar a generar artefactos distintos de prompt sin romper la arquitectura ni fingir compatibilidad entre proveedores.

---

# Decisión estratégica

Fase 4 introduce artefactos reutilizables de bajo riesgo antes de hooks.

Orden recomendado:

```text
1. Project Instructions.
2. Prompt Files / Agent Instructions.
3. Claude Code Skill.
4. Plantillas personalizadas de usuario.
```

No empezar por hooks.

Los hooks se posponen a Fase 5 porque pueden ejecutar acciones locales y requieren revisión de seguridad específica.

---

# Reglas específicas de Fase 4

```text
- No implementar hooks.
- No generar scripts ejecutables.
- No fingir equivalencia exacta entre proveedores.
- No exponer artefactos como disponibles si no tienen exporter funcional.
- Todo artifact disponible debe tener compatibilidad clara.
- Todo exporter debe usar ArtifactExportResult.
- Las plantillas de usuario no modifican JSON base.
- localStorage solo se permite vía repositorio encapsulado.
- /pbw-commit solo se usa en la última issue de la fase.
```

---

# Uso de Skills en Fase 4

```text
Issues de catálogo/compatibilidad → /pbw-catalog
Issues de exporters/UI           → /pbw-issue
Issues de revisión               → /pbw-review
Última issue de fase             → /pbw-commit
```

---

# Secuencia exacta

```text
4.1.1 → 4.1.2 → 4.1.3 → 4.1.4 → 4.1.5
4.2.1 → 4.2.2 → 4.2.3 → 4.2.4
4.3.1 → 4.3.2 → 4.3.3 → 4.3.4
4.4.1 → 4.4.2 → 4.4.3 → 4.4.4
4.5.1 → 4.5.2 → 4.5.3 → 4.5.4
```

---

# Fase 4.1 — Project Instructions

## Objetivo

Generar instrucciones persistentes por proveedor usando ArtifactExporter.

## Targets iniciales

```text
ChatGPT        → Custom instructions / Custom GPT instructions
Claude         → Project instructions
Claude Code    → CLAUDE.md
GitHub Copilot → .github/copilot-instructions.md
```

---

## Issue 4.1.1 — Catálogo de Project Instructions

```text
/pbw-catalog

Issue 4.1.1: Catálogo de Project Instructions

Objetivo:
Añadir o activar el artefacto Project Instructions en el catálogo, con compatibilidad por proveedor y sin habilitar combinaciones falsas.

Contexto:
Project Instructions es el primer artefacto reutilizable porque aporta valor directo y tiene menos riesgo que hooks.

Restricciones:
1. No implementar exporter todavía.
2. No cambiar UI todavía salvo si es necesario para compilar.
3. No fingir equivalencia exacta.
4. No añadir proveedores nuevos.
5. No introducir any.

Tareas:
1. Revisar artifact-kinds.json.
2. Revisar providers.json.
3. Revisar artifact-provider-compatibility.json.
4. Añadir o activar project-instructions.
5. Definir supportLevel por proveedor.
6. Añadir notes/equivalencias si aplica.
7. Validar referencias.
8. Ejecutar npm run build.
9. Ejecutar npm run lint si existe.
10. Ejecutar npm run test si existe.

Criterios de aceptación:
- Project Instructions existe en catálogo.
- Compatibilidad definida por proveedor.
- No se marca como native si solo es equivalent/partial.
- No se habilita UI funcional sin exporter.
- Build pasa.

Salida esperada:
1. JSON modificados.
2. Compatibilidad definida.
3. Validación aplicada.
4. Resultado build/lint/test.
5. Veredicto: “Issue 4.1.1 cerrable: sí/no”.
```

---

## Issue 4.1.2 — Modelo de entrada para Project Instructions

```text
/pbw-issue

Issue 4.1.2: Modelo de entrada para Project Instructions

Objetivo:
Definir el modelo mínimo de entrada necesario para generar instrucciones persistentes.

Restricciones:
1. No implementar exporter todavía.
2. No añadir UI compleja.
3. No duplicar PromptData si puede reutilizarse de forma limpia.
4. No introducir any.
5. No mezclar con Prompt Files.

Tareas:
1. Revisar ArtifactExportInput.
2. Definir campos requeridos para project instructions.
3. Reutilizar contexto existente si procede.
4. Separar objetivo, reglas, contexto y formato.
5. Añadir tipos necesarios.
6. Ejecutar npm run build.
7. Ejecutar npm run lint si existe.
8. Ejecutar npm run test si existe.

Criterios de aceptación:
- Modelo tipado.
- No se duplica estado innecesario.
- No hay any.
- Build pasa.

Salida esperada:
1. Tipos creados/modificados.
2. Decisiones de modelo.
3. Resultado build/lint/test.
4. Veredicto: “Issue 4.1.2 cerrable: sí/no”.
```

---

## Issue 4.1.3 — Exporter base de Project Instructions

```text
/pbw-issue

Issue 4.1.3: Exporter base de Project Instructions

Objetivo:
Crear ProjectInstructionsExporter usando ArtifactExportResult.

Restricciones:
1. No implementar hooks.
2. No generar scripts ejecutables.
3. No cambiar PromptExporter.
4. No introducir any.
5. No exponer UI si no está preparada.

Tareas:
1. Crear exporter.
2. Generar salida textual base.
3. Incluir warnings si supportLevel no es native.
4. Devolver ArtifactExportResult.
5. Ejecutar npm run build.
6. Ejecutar npm run lint si existe.
7. Ejecutar npm run test si existe.

Criterios de aceptación:
- Exporter creado.
- Devuelve ArtifactExportResult.
- Incluye warnings cuando aplica.
- Build pasa.

Salida esperada:
1. Exporter creado.
2. Formato generado.
3. Warnings definidos.
4. Resultado build/lint/test.
5. Veredicto: “Issue 4.1.3 cerrable: sí/no”.
```

---

## Issue 4.1.4 — Targets por proveedor para Project Instructions

```text
/pbw-issue

Issue 4.1.4: Targets por proveedor para Project Instructions

Objetivo:
Generar salidas específicas por proveedor para Project Instructions.

Restricciones:
1. No fingir equivalencia exacta.
2. No generar archivos peligrosos.
3. No activar hooks.
4. No introducir any.

Targets:
- ChatGPT: texto para Custom instructions / Custom GPT instructions.
- Claude: texto para Project instructions.
- Claude Code: archivo CLAUDE.md.
- GitHub Copilot: archivo .github/copilot-instructions.md.

Tareas:
1. Añadir mapping por proveedor.
2. Generar copyText.
3. Generar files cuando aplique.
4. Añadir warnings de compatibilidad.
5. Ejecutar npm run build.
6. Ejecutar npm run lint si existe.
7. Ejecutar npm run test si existe.

Criterios de aceptación:
- Cada proveedor soportado genera salida adecuada.
- Equivalencias parciales se avisan.
- No se generan scripts.
- Build pasa.

Salida esperada:
1. Targets implementados.
2. Archivos generados por proveedor.
3. Warnings.
4. Resultado build/lint/test.
5. Veredicto: “Issue 4.1.4 cerrable: sí/no”.
```

---

## Issue 4.1.5 — UI mínima para Project Instructions

```text
/pbw-issue

Issue 4.1.5: UI mínima para Project Instructions

Objetivo:
Permitir seleccionar Project Instructions y exportar la salida generada.

Restricciones:
1. No rediseñar wizard.
2. No implementar otros artefactos.
3. No prometer compatibilidad inexistente.
4. No introducir any.
5. No mezclar con Prompt Files.

Tareas:
1. Mostrar Project Instructions solo si el catálogo lo permite.
2. Aplicar compatibilidad por proveedor.
3. Permitir generar salida.
4. Permitir copiar/descargar.
5. Mostrar warnings.
6. Ejecutar npm run build.
7. Ejecutar npm run lint si existe.
8. Ejecutar npm run test si existe.

Criterios de aceptación:
- Project Instructions se puede seleccionar.
- Solo combinaciones soportadas aparecen activas.
- Export funciona.
- Warnings visibles.
- Build pasa.

Verificación manual:
1. Seleccionar Project Instructions.
2. Seleccionar proveedor soportado.
3. Generar salida.
4. Copiar/descargar.
5. Confirmar warning si aplica.

Salida esperada:
1. UI modificada.
2. Casos manuales.
3. Resultado build/lint/test.
4. Veredicto: “Fase 4.1 cerrable: sí/no”.
```

---

# Fase 4.2 — Prompt Files / Agent Instructions

## Objetivo

Generar artefactos reutilizables tipo prompt file o agent instructions.

---

## Issue 4.2.1 — Catálogo de Prompt Files y Agent Instructions

```text
/pbw-catalog

Issue 4.2.1: Catálogo de Prompt Files y Agent Instructions

Objetivo:
Definir compatibilidad y disponibilidad de Prompt Files y Agent Instructions.

Restricciones:
1. No implementar exporter todavía.
2. No añadir proveedores nuevos.
3. No fingir equivalencia exacta.
4. No introducir any.

Tareas:
1. Revisar artifact-kinds.json.
2. Añadir o activar prompt-file y agent-instructions.
3. Revisar compatibilidad por proveedor.
4. Añadir notes/equivalencias.
5. Validar referencias.
6. Ejecutar npm run build.
7. Ejecutar npm run lint si existe.
8. Ejecutar npm run test si existe.

Criterios de aceptación:
- Artefactos definidos en catálogo.
- Compatibilidad clara.
- No se habilita funcionalidad sin exporter.
- Build pasa.

Salida esperada:
1. JSON modificados.
2. Compatibilidad definida.
3. Resultado build/lint/test.
4. Veredicto: “Issue 4.2.1 cerrable: sí/no”.
```

---

## Issue 4.2.2 — Exporters de Prompt Files y Agent Instructions

```text
/pbw-issue

Issue 4.2.2: Exporters de Prompt Files y Agent Instructions

Objetivo:
Crear exporters para generar prompt files y agent instructions según proveedor.

Restricciones:
1. No implementar hooks.
2. No generar scripts ejecutables.
3. No introducir any.
4. No mezclar con Claude Code Skill.

Targets orientativos:
- GitHub Copilot: prompt file / AGENTS.md si aplica.
- Claude Code: CLAUDE.md o estructura equivalente si aplica.
- ChatGPT: instrucciones reutilizables para GPT personalizado si aplica.
- Claude: project instructions si aplica.

Tareas:
1. Crear exporters necesarios.
2. Generar ArtifactExportResult.
3. Generar files cuando aplique.
4. Añadir warnings de equivalencia.
5. Ejecutar npm run build.
6. Ejecutar npm run lint si existe.
7. Ejecutar npm run test si existe.

Criterios de aceptación:
- Exporters operativos.
- UI no vende equivalencia falsa.
- Se puede copiar/descargar salida.
- Build pasa.

Salida esperada:
1. Exporters creados.
2. Compatibilidad aplicada.
3. Archivos generados.
4. Resultado build/lint/test.
5. Veredicto: “Issue 4.2.2 cerrable: sí/no”.
```

---

## Issue 4.2.3 — UI para Prompt Files y Agent Instructions

```text
/pbw-issue

Issue 4.2.3: UI para Prompt Files y Agent Instructions

Objetivo:
Permitir seleccionar y exportar Prompt Files / Agent Instructions desde el wizard.

Restricciones:
1. No rediseñar wizard.
2. No implementar hooks.
3. No exponer artefactos sin exporter.
4. No introducir any.

Tareas:
1. Mostrar artefactos disponibles según catálogo.
2. Aplicar compatibilidad por proveedor.
3. Permitir generar salida.
4. Permitir copiar/descargar.
5. Mostrar warnings.
6. Ejecutar npm run build.
7. Ejecutar npm run lint si existe.
8. Ejecutar npm run test si existe.

Criterios de aceptación:
- Se pueden seleccionar artefactos soportados.
- Se bloquean combinaciones no soportadas.
- Export funciona.
- Build pasa.

Verificación manual:
1. Seleccionar Prompt File o Agent Instructions.
2. Seleccionar proveedor soportado.
3. Generar salida.
4. Copiar/descargar.
5. Confirmar warnings.

Salida esperada:
1. UI modificada.
2. Casos manuales.
3. Resultado build/lint/test.
4. Veredicto: “Issue 4.2.3 cerrable: sí/no”.
```

---

## Issue 4.2.4 — Revisión de Prompt Files / Agent Instructions

```text
/pbw-review

Issue 4.2.4: Revisión de Prompt Files / Agent Instructions

Objetivo:
Auditar que los artefactos reutilizables no confunden proveedores ni generan salidas incorrectas.

Restricciones:
1. No implementar features.
2. No ocultar deuda.
3. No introducir any.

Checklist:
- Compatibilidad clara.
- Warnings visibles.
- Exporters usan ArtifactExportResult.
- No hay scripts ejecutables.
- No se finge equivalencia exacta.
- UI no muestra unsupported como activo.

Tareas:
1. Revisar catálogo.
2. Revisar exporters.
3. Revisar UI.
4. Ejecutar npm run build.
5. Ejecutar npm run lint si existe.
6. Ejecutar npm run test si existe.

Criterios de aceptación:
- Sin soporte falso.
- Sin código muerto nuevo.
- Build/lint/test pasan.

Salida esperada:
1. Hallazgos.
2. Fixes mínimos.
3. Resultado build/lint/test.
4. Veredicto: “Fase 4.2 cerrable: sí/no”.
```

---

# Fase 4.3 — Claude Code Skill

## Objetivo

Permitir generar una estructura básica de Skill para Claude Code como artefacto del producto.

## Nota

No confundir con las Skills internas del repositorio (`/pbw-issue`, `/pbw-review`, `/pbw-catalog`, `/pbw-commit`).

---

## Issue 4.3.1 — Catálogo de Claude Code Skill

```text
/pbw-catalog

Issue 4.3.1: Catálogo de Claude Code Skill

Objetivo:
Definir Skill como artefacto generable para Claude Code.

Restricciones:
1. No implementar hooks.
2. No generar scripts ejecutables.
3. No exponer Skill como soportado en proveedores sin equivalente real.
4. No introducir any.

Tareas:
1. Revisar artifact-kinds.json.
2. Revisar compatibilidad Claude Code.
3. Marcar soporte native solo para Claude Code si aplica.
4. Marcar otros proveedores como unsupported/equivalent/partial según corresponda.
5. Validar referencias.
6. Ejecutar npm run build.
7. Ejecutar npm run lint si existe.
8. Ejecutar npm run test si existe.

Criterios de aceptación:
- Skill definida como artefacto.
- Compatibilidad honesta.
- No se habilita sin exporter.
- Build pasa.

Salida esperada:
1. JSON modificados.
2. Compatibilidad definida.
3. Resultado build/lint/test.
4. Veredicto: “Issue 4.3.1 cerrable: sí/no”.
```

---

## Issue 4.3.2 — Modelo de Claude Code Skill

```text
/pbw-issue

Issue 4.3.2: Modelo de Claude Code Skill

Objetivo:
Definir el modelo necesario para generar una Skill de Claude Code.

Salida objetivo:
.claude/
  skills/
    <skill-name>/
      SKILL.md

Restricciones:
1. No generar hooks.
2. No generar scripts ejecutables.
3. No activar comandos locales.
4. No introducir any.

Tareas:
1. Definir SkillArtifactInput.
2. Validar nombre de skill.
3. Definir campos mínimos de SKILL.md.
4. Definir warnings de revisión.
5. Ejecutar npm run build.
6. Ejecutar npm run lint si existe.
7. Ejecutar npm run test si existe.

Criterios de aceptación:
- Modelo tipado.
- Validación de nombre.
- No hay scripts.
- Build pasa.

Salida esperada:
1. Modelo creado.
2. Validaciones.
3. Resultado build/lint/test.
4. Veredicto: “Issue 4.3.2 cerrable: sí/no”.
```

---

## Issue 4.3.3 — ClaudeCodeSkillExporter

```text
/pbw-issue

Issue 4.3.3: Crear ClaudeCodeSkillExporter

Objetivo:
Crear exporter para generar estructura básica de Skill de Claude Code.

Restricciones:
1. No generar hooks.
2. No generar scripts ejecutables.
3. No activar comandos locales.
4. Usar ArtifactExportResult multiarchivo.
5. No introducir any.

Tareas:
1. Crear ClaudeCodeSkillExporter.
2. Generar SKILL.md.
3. Generar ruta .claude/skills/<skill-name>/SKILL.md.
4. Añadir warnings.
5. Devolver ArtifactExportResult.
6. Ejecutar npm run build.
7. Ejecutar npm run lint si existe.
8. Ejecutar npm run test si existe.

Criterios de aceptación:
- Genera SKILL.md.
- Genera árbol de archivos.
- No genera scripts ejecutables.
- Muestra advertencias.
- Build pasa.

Salida esperada:
1. Exporter creado.
2. Formato generado.
3. Validaciones.
4. Resultado build/lint/test.
5. Veredicto: “Issue 4.3.3 cerrable: sí/no”.
```

---

## Issue 4.3.4 — UI para Claude Code Skill

```text
/pbw-issue

Issue 4.3.4: UI para Claude Code Skill

Objetivo:
Permitir generar Claude Code Skill desde el wizard.

Restricciones:
1. No implementar hooks.
2. No generar scripts ejecutables.
3. No ocultar warnings.
4. No introducir any.

Tareas:
1. Mostrar Skill solo para combinaciones soportadas.
2. Permitir definir nombre de skill.
3. Generar preview de archivos.
4. Permitir copiar/descargar contenido.
5. Mostrar warnings de revisión.
6. Ejecutar npm run build.
7. Ejecutar npm run lint si existe.
8. Ejecutar npm run test si existe.

Criterios de aceptación:
- Skill se puede generar.
- Se muestra estructura de archivos.
- No se generan scripts.
- Warnings visibles.
- Build pasa.

Verificación manual:
1. Seleccionar Skill.
2. Seleccionar Claude Code.
3. Introducir nombre válido.
4. Generar salida.
5. Revisar SKILL.md.
6. Confirmar warnings.

Salida esperada:
1. UI modificada.
2. Casos manuales.
3. Resultado build/lint/test.
4. Veredicto: “Fase 4.3 cerrable: sí/no”.
```

---

# Fase 4.4 — Plantillas personalizadas de usuario

## Objetivo

Permitir crear plantillas propias sin modificar catálogo JSON base.

---

## Issue 4.4.1 — Modelo y repositorio de plantillas de usuario

```text
/pbw-issue

Issue 4.4.1: Modelo y repositorio de plantillas de usuario

Objetivo:
Crear modelo y repositorio local para plantillas personalizadas de usuario.

Restricciones:
1. No modificar JSON base.
2. localStorage solo vía repositorio.
3. Distinguir system/user.
4. No sobrescribir ids system.
5. No introducir any.

Tareas:
1. Definir UserTemplate.
2. Crear LocalUserTemplateRepository.
3. Validar ids.
4. Validar campos requeridos.
5. Evitar colisión con templates system.
6. Ejecutar npm run build.
7. Ejecutar npm run lint si existe.
8. Ejecutar npm run test si existe.

Criterios de aceptación:
- Modelo creado.
- Repositorio encapsulado.
- No modifica JSON base.
- No permite colisión con system.
- Build pasa.

Salida esperada:
1. Modelo creado.
2. Servicio creado.
3. Validaciones.
4. Resultado build/lint/test.
5. Veredicto: “Issue 4.4.1 cerrable: sí/no”.
```

---

## Issue 4.4.2 — Integrar plantillas de usuario con catálogo

```text
/pbw-issue

Issue 4.4.2: Integrar plantillas de usuario con catálogo

Objetivo:
Permitir que las plantillas de usuario aparezcan junto a las plantillas system sin modificar JSON base.

Restricciones:
1. No modificar JSON base.
2. No mezclar plantillas user con system como si fueran iguales.
3. No introducir any.
4. No duplicar estado.

Tareas:
1. Cargar templates system desde catálogo.
2. Cargar templates user desde repositorio local.
3. Combinar en modelo normalizado o read model.
4. Marcar source: system/user.
5. Validar que user templates inválidas se ignoran.
6. Ejecutar npm run build.
7. Ejecutar npm run lint si existe.
8. Ejecutar npm run test si existe.

Criterios de aceptación:
- Plantillas user aparecen en builder.
- Plantillas system no se modifican.
- Plantillas inválidas se ignoran.
- Build pasa.

Salida esperada:
1. Integración realizada.
2. Modelo de source.
3. Resultado build/lint/test.
4. Veredicto: “Issue 4.4.2 cerrable: sí/no”.
```

---

## Issue 4.4.3 — UI de plantillas personalizadas

```text
/pbw-issue

Issue 4.4.3: UI de plantillas personalizadas

Objetivo:
Permitir crear, editar y eliminar plantillas de usuario.

Restricciones:
1. No permitir editar/eliminar plantillas system.
2. No modificar JSON base.
3. No introducir any.
4. No crear editor complejo si no es necesario.

Tareas:
1. Añadir UI mínima para crear plantilla.
2. Añadir UI mínima para editar plantilla user.
3. Añadir UI para eliminar plantilla user.
4. Validar campos.
5. Mostrar errores útiles.
6. Ejecutar npm run build.
7. Ejecutar npm run lint si existe.
8. Ejecutar npm run test si existe.

Criterios de aceptación:
- Crear plantilla user funciona.
- Editar plantilla user funciona.
- Eliminar plantilla user funciona.
- No se puede editar/eliminar system.
- Build pasa.

Verificación manual:
1. Crear plantilla.
2. Usarla en builder.
3. Editarla.
4. Confirmar cambios.
5. Eliminarla.
6. Confirmar que system sigue intacto.

Salida esperada:
1. UI creada.
2. Casos manuales.
3. Resultado build/lint/test.
4. Veredicto: “Issue 4.4.3 cerrable: sí/no”.
```

---

## Issue 4.4.4 — Revisión de plantillas personalizadas

```text
/pbw-review

Issue 4.4.4: Revisión de plantillas personalizadas

Objetivo:
Auditar que las plantillas de usuario no dañan catálogo system ni introducen persistencia insegura.

Restricciones:
1. No implementar features nuevas.
2. No ocultar deuda.
3. No introducir any.

Checklist:
- JSON base intacto.
- localStorage encapsulado.
- system/user diferenciados.
- ids user validados.
- plantillas inválidas ignoradas.
- no se puede editar system.
- no se puede eliminar system.

Tareas:
1. Revisar modelo.
2. Revisar repositorio local.
3. Revisar UI.
4. Ejecutar npm run build.
5. Ejecutar npm run lint si existe.
6. Ejecutar npm run test si existe.

Criterios de aceptación:
- Sin riesgo para catálogo system.
- Persistencia encapsulada.
- Build/lint/test pasan.

Salida esperada:
1. Hallazgos.
2. Fixes mínimos.
3. Resultado build/lint/test.
4. Veredicto: “Fase 4.4 cerrable: sí/no”.
```

---

# Fase 4.5 — Tests, documentación y cierre

## Objetivo

Cerrar Fase 4 con cobertura, documentación y commit de fase.

---

## Issue 4.5.1 — Tests de artefactos reutilizables

```text
/pbw-issue

Issue 4.5.1: Tests de artefactos reutilizables

Objetivo:
Añadir tests para Project Instructions, Prompt Files, Agent Instructions y Claude Code Skill.

Restricciones:
1. No reabrir diseño funcional.
2. No testear comportamiento provisional.
3. No introducir any.

Cobertura mínima:
1. ProjectInstructionsExporter.
2. PromptFile/AgentInstructions exporters.
3. ClaudeCodeSkillExporter.
4. Compatibilidad unsupported/equivalent/partial/native.
5. Validación de nombre de skill.

Tareas:
1. Crear tests de exporters.
2. Crear tests de compatibilidad.
3. Crear tests de validaciones.
4. Ejecutar npm run test.
5. Ejecutar npm run build.
6. Ejecutar npm run lint.

Criterios de aceptación:
- Tests pasan.
- Build/lint pasan.
- No hay tests de hooks.

Salida esperada:
1. Tests creados.
2. Casos cubiertos.
3. Resultado test/build/lint.
4. Veredicto: “Issue 4.5.1 cerrable: sí/no”.
```

---

## Issue 4.5.2 — Documentar Fase 4

```text
/pbw-issue

Issue 4.5.2: Documentar Fase 4

Objetivo:
Actualizar documentación MkDocs y README con los artefactos reutilizables implementados.

Restricciones:
1. No documentar hooks como disponibles.
2. No fingir equivalencias exactas.
3. No cambiar código funcional.

Tareas:
1. Actualizar docs/status.md.
2. Actualizar docs/backlog.md.
3. Actualizar docs/architecture.md.
4. Actualizar docs/development.md.
5. Actualizar docs/testing.md.
6. Crear ADR sobre artefactos reutilizables.
7. Ejecutar npm run build.
8. Ejecutar npm run lint si existe.
9. Ejecutar npm run test si existe.

Criterios de aceptación:
- Documentación refleja artefactos reales.
- Hooks siguen como futuro.
- Compatibilidad explicada sin exagerar.
- Build/lint/test pasan.

Salida esperada:
1. Documentos modificados.
2. ADR creado.
3. Resultado build/lint/test.
4. Veredicto: “Issue 4.5.2 cerrable: sí/no”.
```

---

## Issue 4.5.3 — Revisión de cierre de Fase 4

```text
/pbw-review

Issue 4.5.3: Revisión de cierre de Fase 4

Objetivo:
Auditar que Fase 4 queda cerrable y que el proyecto está preparado para Fase 5.

Restricciones:
1. No implementar features nuevas.
2. No hacer refactors grandes.
3. No ocultar deuda.
4. No introducir any.

Checklist:
- Project Instructions funciona.
- Prompt Files / Agent Instructions funcionan.
- Claude Code Skill funciona.
- Plantillas de usuario funcionan.
- JSON base no se modifica por plantillas user.
- No hay hooks implementados.
- No hay scripts ejecutables generados.
- Compatibilidad honesta.
- Tests pasan.
- Documentación actualizada.

Tareas:
1. Ejecutar npm run build.
2. Ejecutar npm run lint.
3. Ejecutar npm run test.
4. Revisar documentación.
5. Revisar deuda residual.
6. Emitir veredicto.

Criterios de aceptación:
- Build/lint/test pasan.
- No queda deuda bloqueante.
- Fase 4 cerrable.

Salida esperada:
1. Resultado checklist.
2. Deuda residual.
3. Riesgos para Fase 5.
4. Veredicto: “Fase 4 cerrable: sí/no”.
```

---

## Issue 4.5.4 — Generar commit de cierre de Fase 4

```text
/pbw-commit

Issue 4.5.4: Generar commit de cierre de Fase 4

Objetivo:
Generar un mensaje de commit en castellano siguiendo Conventional Commits para los cambios de cierre de Fase 4.

Contexto:
La Skill de commit solo debe usarse en la última issue de la fase. No debe modificar archivos ni ejecutar git add/git commit.

Restricciones:
1. No ejecutar git add.
2. No ejecutar git commit.
3. No modificar archivos.
4. No inventar cambios.
5. Basarse solo en el diff real.

Tareas:
1. Ejecutar git status --short.
2. Inspeccionar staged changes si existen.
3. Si no hay staged changes, inspeccionar unstaged/untracked relevantes.
4. Determinar si el commit debe dividirse.
5. Generar mensaje Conventional Commit en castellano.

Criterios de aceptación:
- Mensaje generado desde cambios reales.
- No se modifica el repositorio.
- Si hay cambios inconexos, se proponen split commits.

Salida esperada:
1. Suggested commit message o Suggested split commits.
2. Veredicto: “Fase 4 cerrada y lista para commit: sí/no”.
```

---

# Reglas comunes para las fases pendientes

## Uso obligatorio de Skills

```text
/pbw-issue   → implementar una issue incremental de código o UI.
/pbw-catalog → editar catálogo JSON, compatibilidad, providers, artifacts, constraints, outputs, context fields o reglas.
/pbw-review  → revisar una issue/fase, auditar deuda, validar cierre.
/pbw-commit  → generar mensaje de commit. Solo se usa en la última issue de cada fase.
```

## Restricciones globales

```text
- No reescribir la aplicación.
- No migrar a framework.
- No instalar dependencias salvo justificación explícita.
- Mantener TypeScript strict.
- No introducir any.
- No mezclar issues.
- No dejar código muerto.
- No conservar placeholders sin valor actual.
- No duplicar estado.
- No meter lógica de negocio en renderer.
- No meter lógica de catálogo en renderer.
- No consumir JSON crudo desde UI.
- No importar JSON desde handlers.
- No implementar features futuras como disponibles.
- No usar localStorage salvo issue explícita que lo apruebe.
- No usar localStorage para tema claro/oscuro.
- No implementar tests automatizados hasta la fase indicada.
- Ejecutar npm run build.
- Ejecutar npm run lint si existe.
- Ejecutar npm run test solo si existe.
```

## Regla de JSON

```text
Los JSON no se eliminan por estar vacíos sin revisar, pero tampoco se conservan como decoración.

Un JSON se conserva si:
- contiene datos usados actualmente;
- sustituye datos hardcodeados en TypeScript;
- elimina duplicidad TS/JSON;
- queda conectado en la fase actual;
- aporta valor a una funcionalidad actual.

Un JSON se elimina si:
- está vacío;
- no se va a conectar ahora;
- no sustituye ningún hardcodeo actual;
- solo representa una feature futura;
- crea confusión sobre la fuente canónica.
```

## Regla de tests

```text
Durante desarrollo:
- build;
- lint si existe;
- test solo si ya existe;
- verificación manual cuando afecte a UI/runtime.

Al final de Fase 3:
- crear infraestructura de tests;
- proteger catálogo, exporters, query params y persistencia local.
```
