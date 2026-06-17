# Backlog Fase 5 — Hooks y automatizaciones

**Estado de entrada:** Fase 4 cerrada.  
**Aplicación:** AI Prompt & Workflow Builder.  
**Objetivo de la fase:** generar hooks y automatizaciones de forma segura, explícita y revisable.

---

# Decisión estratégica

Los hooks se implementan después de los artefactos reutilizables porque tienen mayor riesgo.

Un hook puede ejecutar acciones locales o afectar al entorno del usuario. Por tanto, la fase exige:

```text
- modelo seguro;
- compatibilidad honesta;
- warnings visibles;
- ninguna ejecución automática;
- ningún comando destructivo por defecto;
- revisión de seguridad antes de cerrar;
- commit solo al final de la fase.
```

---

# Reglas específicas de Fase 5

```text
- No activar hooks automáticamente.
- No ejecutar comandos.
- No generar comandos destructivos por defecto.
- No ocultar comandos generados.
- No fingir soporte en proveedores sin hooks.
- Claude Code es el único candidato inicial con soporte nativo si el catálogo lo valida.
- Todo hook debe incluir riskLevel y safetyWarnings.
- /pbw-commit solo se usa en la última issue de la fase.
```

---

# Uso de Skills en Fase 5

```text
Catálogo/compatibilidad          → /pbw-catalog
Modelo/exporters/UI              → /pbw-issue
Revisión de seguridad/cierre     → /pbw-review
Última issue de fase             → /pbw-commit
```

---

# Secuencia exacta

```text
5.1.1 → 5.1.2 → 5.1.3 → 5.1.4
5.2.1 → 5.2.2 → 5.2.3 → 5.2.4
5.3.1 → 5.3.2 → 5.3.3 → 5.3.4 → 5.3.5
```

---

# Fase 5.1 — Modelo seguro de Hook

## Objetivo

Modelar hooks como artefactos de automatización con nivel de riesgo, sin generar todavía configuración ejecutable.

## Campos mínimos

```text
event
matcher
actionType
command
timeout
blocking
riskLevel
safetyWarnings
```

---

## Issue 5.1.1 — Catálogo y compatibilidad de Hook

```text
/pbw-catalog

Issue 5.1.1: Catálogo y compatibilidad de Hook

Objetivo:
Definir Hook como artefacto en catálogo y representar compatibilidad real por proveedor.

Contexto:
Los hooks no tienen equivalencia general en todos los proveedores. No se debe fingir soporte.

Restricciones:
1. No implementar exporter.
2. No generar configuración.
3. No activar hooks.
4. No fingir soporte en ChatGPT, Claude web o GitHub Copilot si no existe.
5. No introducir any.

Tareas:
1. Revisar artifact-kinds.json.
2. Añadir o activar hook.
3. Revisar providers.
4. Definir compatibilidad por proveedor.
5. Marcar Claude Code como native solo si corresponde.
6. Marcar otros proveedores como unsupported/equivalent/partial según corresponda.
7. Validar referencias.
8. Ejecutar npm run build.
9. Ejecutar npm run lint si existe.
10. Ejecutar npm run test si existe.

Criterios de aceptación:
- Hook existe en catálogo.
- Compatibilidad honesta.
- No se expone como funcional sin exporter.
- Build pasa.

Salida esperada:
1. JSON modificados.
2. Compatibilidad definida.
3. Validaciones.
4. Resultado build/lint/test.
5. Veredicto: “Issue 5.1.1 cerrable: sí/no”.
```

---

## Issue 5.1.2 — Modelo de dominio Hook

```text
/pbw-issue

Issue 5.1.2: Modelo de dominio Hook

Objetivo:
Crear modelo tipado de Hook con campos mínimos y sin comportamiento ejecutable.

Restricciones:
1. No generar scripts.
2. No activar hooks.
3. No crear exporter todavía.
4. No introducir any.
5. No mezclar con UI.

Tareas:
1. Crear HookDefinition o tipo equivalente.
2. Añadir event.
3. Añadir matcher.
4. Añadir actionType.
5. Añadir command.
6. Añadir timeout.
7. Añadir blocking.
8. Añadir riskLevel.
9. Añadir safetyWarnings.
10. Ejecutar npm run build.
11. Ejecutar npm run lint si existe.
12. Ejecutar npm run test si existe.

Criterios de aceptación:
- Modelo Hook tipado.
- No hay ejecución.
- No hay scripts.
- No hay any.
- Build pasa.

Salida esperada:
1. Modelo creado.
2. Decisiones de tipado.
3. Resultado build/lint/test.
4. Veredicto: “Issue 5.1.2 cerrable: sí/no”.
```

---

## Issue 5.1.3 — Validación de seguridad de Hook

```text
/pbw-issue

Issue 5.1.3: Validación de seguridad de Hook

Objetivo:
Crear validaciones para evitar hooks ambiguos o peligrosos.

Restricciones:
1. No bloquear todo comando por defecto, pero sí clasificar riesgo.
2. No generar comandos destructivos por defecto.
3. No ejecutar comandos.
4. No introducir any.
5. No mezclar con exporter.

Validaciones mínimas:
- event obligatorio.
- matcher obligatorio si aplica.
- command visible si actionType es command.
- timeout definido.
- riskLevel obligatorio.
- safetyWarnings obligatorio para riesgos medios/altos.
- comandos destructivos conocidos deben marcarse como high/critical o rechazarse según política.

Tareas:
1. Crear validador de Hook.
2. Definir riskLevel.
3. Definir reglas de warnings.
4. Definir política para comandos destructivos.
5. Ejecutar npm run build.
6. Ejecutar npm run lint si existe.
7. Ejecutar npm run test si existe.

Criterios de aceptación:
- Hooks se validan.
- Riesgo se clasifica.
- Warnings se generan.
- No se ejecuta nada.
- Build pasa.

Salida esperada:
1. Validador creado.
2. Reglas de riesgo.
3. Resultado build/lint/test.
4. Veredicto: “Issue 5.1.3 cerrable: sí/no”.
```

---

## Issue 5.1.4 — Revisión del modelo Hook

```text
/pbw-review

Issue 5.1.4: Revisión del modelo Hook

Objetivo:
Auditar que el modelo de Hook es seguro antes de crear exporter.

Restricciones:
1. No implementar exporter.
2. No implementar UI.
3. No ocultar riesgos.
4. No introducir any.

Checklist:
- Modelo tipado.
- riskLevel obligatorio.
- safetyWarnings soportado.
- No ejecución.
- No scripts.
- Compatibilidad honesta.
- Comandos visibles si existen.

Tareas:
1. Revisar catálogo.
2. Revisar modelo.
3. Revisar validación.
4. Ejecutar npm run build.
5. Ejecutar npm run lint si existe.
6. Ejecutar npm run test si existe.

Criterios de aceptación:
- Modelo seguro.
- Sin ejecución accidental.
- Build/lint/test pasan.

Salida esperada:
1. Hallazgos.
2. Riesgos residuales.
3. Fixes mínimos.
4. Resultado build/lint/test.
5. Veredicto: “Fase 5.1 cerrable: sí/no”.
```

---

# Fase 5.2 — Claude Code Hook exporter

## Objetivo

Generar fragmentos de configuración y archivos necesarios para hooks Claude Code sin activarlos automáticamente.

---

## Issue 5.2.1 — Crear ClaudeCodeHookExporter

```text
/pbw-issue

Issue 5.2.1: Crear ClaudeCodeHookExporter

Objetivo:
Crear exporter para generar configuración de hook Claude Code como salida revisable.

Restricciones:
1. No activar hooks automáticamente.
2. No ejecutar comandos.
3. No generar comandos destructivos por defecto.
4. No ocultar comandos.
5. No introducir any.

Tareas:
1. Crear ClaudeCodeHookExporter.
2. Recibir HookDefinition validado.
3. Generar settings fragment.
4. Generar files si procede.
5. Incluir warnings.
6. Devolver ArtifactExportResult.
7. Ejecutar npm run build.
8. Ejecutar npm run lint si existe.
9. Ejecutar npm run test si existe.

Criterios de aceptación:
- Exporter creado.
- Genera settings fragment.
- No activa nada.
- Warnings incluidos.
- Build pasa.

Salida esperada:
1. Exporter creado.
2. Formato generado.
3. Warnings.
4. Resultado build/lint/test.
5. Veredicto: “Issue 5.2.1 cerrable: sí/no”.
```

---

## Issue 5.2.2 — Preview seguro de Hook

```text
/pbw-issue

Issue 5.2.2: Preview seguro de Hook

Objetivo:
Mostrar una vista previa completa y explícita de la configuración generada antes de copiar o descargar.

Restricciones:
1. No ocultar comandos.
2. No ejecutar comandos.
3. No activar hooks.
4. No introducir any.
5. No mezclar con descarga.

Tareas:
1. Crear preview de settings fragment.
2. Mostrar command completo.
3. Mostrar riskLevel.
4. Mostrar safetyWarnings.
5. Mostrar provider compatibility.
6. Ejecutar npm run build.
7. Ejecutar npm run lint si existe.
8. Ejecutar npm run test si existe.

Criterios de aceptación:
- Preview muestra configuración completa.
- Command visible.
- Warnings visibles.
- No ejecución.
- Build pasa.

Verificación manual:
1. Crear hook de bajo riesgo.
2. Revisar preview.
3. Crear hook con warning.
4. Confirmar warning visible.
5. Confirmar que nada se ejecuta.

Salida esperada:
1. UI modificada.
2. Casos manuales.
3. Resultado build/lint/test.
4. Veredicto: “Issue 5.2.2 cerrable: sí/no”.
```

---

## Issue 5.2.3 — Copiar y descargar Hook

```text
/pbw-issue

Issue 5.2.3: Copiar y descargar Hook

Objetivo:
Permitir copiar o descargar la configuración generada del hook sin activarla.

Restricciones:
1. No activar hooks automáticamente.
2. No ejecutar comandos.
3. No generar scripts destructivos por defecto.
4. No ocultar warnings.
5. No introducir any.

Tareas:
1. Integrar copy con ArtifactExportResult.
2. Integrar descarga de settings fragment.
3. Integrar descarga de files auxiliares si existen.
4. Mantener warnings visibles.
5. Ejecutar npm run build.
6. Ejecutar npm run lint si existe.
7. Ejecutar npm run test si existe.

Criterios de aceptación:
- Copiar funciona.
- Descargar funciona.
- Nada se activa.
- Warnings visibles.
- Build pasa.

Verificación manual:
1. Generar hook.
2. Copiar settings fragment.
3. Descargar archivo.
4. Confirmar contenido.
5. Confirmar que nada se ejecuta.

Salida esperada:
1. Copy/download implementados.
2. Casos manuales.
3. Resultado build/lint/test.
4. Veredicto: “Issue 5.2.3 cerrable: sí/no”.
```

---

## Issue 5.2.4 — Revisión de exporter Claude Code Hook

```text
/pbw-review

Issue 5.2.4: Revisión de exporter Claude Code Hook

Objetivo:
Auditar que el exporter de Hook no introduce riesgos de ejecución, ocultación o soporte falso.

Restricciones:
1. No implementar features nuevas.
2. No ocultar riesgos.
3. No introducir any.

Checklist:
- No ejecución automática.
- No comandos destructivos por defecto.
- Command visible.
- Warnings visibles.
- riskLevel visible.
- settings fragment revisable.
- Compatibilidad solo donde aplica.
- No soporte falso.

Tareas:
1. Revisar exporter.
2. Revisar UI.
3. Revisar validaciones.
4. Ejecutar npm run build.
5. Ejecutar npm run lint si existe.
6. Ejecutar npm run test si existe.

Criterios de aceptación:
- Exporter seguro.
- Sin activación automática.
- Build/lint/test pasan.

Salida esperada:
1. Hallazgos.
2. Riesgos.
3. Fixes mínimos.
4. Resultado build/lint/test.
5. Veredicto: “Fase 5.2 cerrable: sí/no”.
```

---

# Fase 5.3 — Seguridad, tests, documentación y cierre

## Objetivo

Cerrar hooks con revisión de seguridad, cobertura y documentación.

---

## Issue 5.3.1 — Revisión de seguridad de hooks

```text
/pbw-review

Issue 5.3.1: Revisión de seguridad de hooks

Objetivo:
Auditar hooks para evitar salidas peligrosas, ambiguas o engañosas.

Restricciones:
1. No implementar features.
2. No ocultar riesgos.
3. No permitir comandos destructivos por defecto.
4. No fingir soporte de proveedores.
5. No introducir any.

Auditoría:
- Warnings visibles.
- riskLevel correcto.
- No comandos destructivos por defecto.
- No ejecución automática.
- No soporte falso.
- Export multiarchivo revisable.
- Compatibilidad clara.
- Documentación actualizada o pendiente.

Tareas:
1. Revisar modelo Hook.
2. Revisar validador.
3. Revisar exporter.
4. Revisar UI.
5. Ejecutar npm run build.
6. Ejecutar npm run lint si existe.
7. Ejecutar npm run test si existe.

Criterios de aceptación:
- Warnings visibles.
- No hay comandos destructivos por defecto.
- No se prometen hooks en proveedores sin soporte.
- Build/lint/test pasan.

Salida esperada:
1. Hallazgos.
2. Riesgos.
3. Cambios necesarios.
4. Resultado build/lint/test.
5. Veredicto: “Issue 5.3.1 cerrable: sí/no”.
```

---

## Issue 5.3.2 — Tests de hooks

```text
/pbw-issue

Issue 5.3.2: Tests de hooks

Objetivo:
Añadir tests para modelo, validación y exporter de hooks.

Restricciones:
1. No cambiar comportamiento funcional salvo bug real.
2. No introducir any.
3. No ejecutar comandos reales.
4. No usar fixtures peligrosas sin neutralizarlas.

Cobertura mínima:
1. Hook válido pasa validación.
2. Hook sin warnings requeridos falla.
3. Hook con comando destructivo se marca como riesgo alto/crítico o se rechaza.
4. ClaudeCodeHookExporter genera settings fragment.
5. Exporter no activa nada.

Tareas:
1. Crear tests de modelo.
2. Crear tests de validación.
3. Crear tests de exporter.
4. Ejecutar npm run test.
5. Ejecutar npm run build.
6. Ejecutar npm run lint.

Criterios de aceptación:
- Tests de hooks pasan.
- No se ejecuta ningún comando.
- Build/lint pasan.

Salida esperada:
1. Tests creados.
2. Casos cubiertos.
3. Resultado test/build/lint.
4. Veredicto: “Issue 5.3.2 cerrable: sí/no”.
```

---

## Issue 5.3.3 — Documentar hooks y seguridad

```text
/pbw-issue

Issue 5.3.3: Documentar hooks y seguridad

Objetivo:
Actualizar documentación para explicar qué genera la app, qué no ejecuta y qué riesgos debe revisar el usuario.

Restricciones:
1. No ocultar riesgos.
2. No decir que la app activa hooks.
3. No fingir soporte fuera de Claude Code si no existe.
4. No cambiar código funcional.

Tareas:
1. Actualizar docs/status.md.
2. Actualizar docs/backlog.md.
3. Actualizar docs/architecture.md.
4. Actualizar docs/development.md.
5. Crear ADR de seguridad de hooks.
6. Documentar riskLevel.
7. Documentar safetyWarnings.
8. Ejecutar npm run build.
9. Ejecutar npm run lint si existe.
10. Ejecutar npm run test si existe.

Criterios de aceptación:
- Seguridad documentada.
- No se promete ejecución automática.
- Compatibilidad documentada.
- Build/lint/test pasan.

Salida esperada:
1. Documentos modificados.
2. ADR creado.
3. Resultado build/lint/test.
4. Veredicto: “Issue 5.3.3 cerrable: sí/no”.
```

---

## Issue 5.3.4 — Revisión de cierre de Fase 5

```text
/pbw-review

Issue 5.3.4: Revisión de cierre de Fase 5

Objetivo:
Auditar que Fase 5 queda cerrable.

Restricciones:
1. No implementar features nuevas.
2. No hacer refactors grandes.
3. No ocultar deuda.
4. No introducir any.

Checklist:
- Hook catalogado correctamente.
- Compatibilidad honesta.
- Modelo Hook tipado.
- Validación de riesgo.
- Warnings visibles.
- Exporter Claude Code Hook funciona.
- No ejecución automática.
- No comandos destructivos por defecto.
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
- Fase 5 cerrable.

Salida esperada:
1. Resultado checklist.
2. Deuda residual.
3. Riesgos.
4. Veredicto: “Fase 5 cerrable: sí/no”.
```

---

## Issue 5.3.5 — Generar commit de cierre de Fase 5

```text
/pbw-commit

Issue 5.3.5: Generar commit de cierre de Fase 5

Objetivo:
Generar un mensaje de commit en castellano siguiendo Conventional Commits para los cambios de cierre de Fase 5.

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
2. Veredicto: “Fase 5 cerrada y lista para commit: sí/no”.
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
