# Backlog reajustado — AI Prompt & Workflow Builder

**Estado de partida asumido:** Fase 1 terminada.

La aplicación ya dispone de:

- flujo Perfil → Plantilla;
- 8 perfiles;
- 37 plantillas;
- recomendaciones por plantilla;
- prompt dinámico;
- checklist actualizado;
- reset en cascada;
- build funcional;
- backlog previo basado en `Prompt Builder Wizard`.

## Decisión estratégica

El producto deja de ser únicamente un generador de prompts y pasa a llamarse:

```text
AI Prompt & Workflow Builder
```

La V1 seguirá generando **prompts optimizados**, pero la arquitectura debe quedar preparada para soportar después:

```text
Prompt
Skill
Hook
Project Instructions
Scoped Instructions
Prompt File
Agent Instructions
Workflow
Checklist
```

## Proveedores objetivo iniciales

```text
ChatGPT
Claude
Claude Code / Claude CLI
GitHub Copilot
```

No se añaden otros proveedores hasta que exista necesidad real.

## Regla de producto

Los conceptos no están normalizados entre proveedores.

Por tanto, la app usará nombres funcionales comunes y mostrará equivalencias:

```text
Skill
  Claude Code: Skill
  GitHub Copilot: Prompt file / AGENTS.md
  ChatGPT: Custom GPT / Custom instructions
  Claude: Project instructions / Skill según entorno

Hook
  Claude Code: Hook
  ChatGPT: sin equivalente directo
  Claude web: sin equivalente directo
  GitHub Copilot: sin equivalente directo general
```

No se debe fingir compatibilidad cuando no existe.

---

# Principios técnicos obligatorios

## 1. Arquitectura antes que UX

No rediseñar landing ni wizard antes de tener:

```text
ArtifactKind
AiProvider
ProviderCapability
ProviderArtifactCompatibility
CatalogRepository
JsonCatalogRepository
ArtifactExporter
PromptExporter
```

Si se rediseña la UI antes, se hardcodeará compatibilidad y habrá retrabajo.

## 2. JSON hoy, BBDD/API mañana

Los datos actuales vivirán en:

```text
src/data/catalog/
```

Pero la app no debe consumir JSON crudo desde componentes.

Correcto:

```text
UI → useCatalog / CatalogService → CatalogRepository → JsonCatalogRepository → JSON
```

Mañana:

```text
UI → useCatalog / CatalogService → CatalogRepository → DatabaseCatalogRepository → API/BBDD
```

## 3. IDs dinámicos

No usar unions cerradas ni enums para ids dinámicos de catálogo.

Correcto:

```ts
export type ProfileId = string;
export type TemplateId = string;
export type ConstraintId = string;
export type OutputFormatId = string;
export type ContextFieldId = string;
export type ArtifactKindId = string;
export type ProviderId = string;
```

Los enums solo se permiten para dominios realmente estables:

```ts
ArtifactKind
AiProvider
ProviderCapability
SupportLevel
BuilderMode
ExportFormat
```

## 4. Validación runtime obligatoria

Validar siempre:

```text
- ids vacíos prohibidos;
- ids duplicados prohibidos;
- referencias rotas prohibidas;
- template.profileId debe existir;
- recommendedRestrictions deben existir;
- recommendedOutputs deben existir;
- requiredContextFields deben existir;
- artifactKind debe existir;
- provider debe existir;
- compatibility debe referenciar provider/artifact existentes;
- cada perfil debe tener al menos una plantilla;
- strings obligatorios no vacíos.
```

## 5. Restricciones globales para todas las issues

```text
- No reescribir la app.
- No migrar a framework.
- No instalar dependencias salvo justificación explícita.
- Mantener TypeScript strict.
- No introducir any.
- No dejar código muerto.
- No duplicar estado.
- No meter lógica de negocio en renderer.
- No consumir JSON crudo desde UI.
- No mezclar issues.
- Ejecutar npm run build.
- Ejecutar npm run lint si existe.
- Ejecutar npm run test si existe.
```

---

# Arquitectura objetivo

```text
src/
  app/
    landing/
      components/
      pages/

    builder/
      components/
      hooks/
      pages/

    shared/
      components/

  domain/
    artifacts/
      artifact-kind.ts
      artifact-definition.ts
      artifact-template.ts
      artifact-exporter.ts
      artifact-generation.ts
      artifact-compatibility.ts

    providers/
      ai-provider.ts
      provider-capability.ts
      provider-compatibility.ts
      provider-display-name.ts

    catalog/
      catalog-repository.ts
      catalog-loader.ts
      catalog-normalizer.ts
      catalog-validator.ts
      catalog-types.ts

    exporters/
      prompt/
        prompt-exporter.ts

      claude-code-skill/
        claude-code-skill-exporter.ts

      claude-code-hook/
        claude-code-hook-exporter.ts

      copilot-instructions/
        copilot-instructions-exporter.ts

      copilot-prompt-file/
        copilot-prompt-file-exporter.ts

      chatgpt-custom-gpt/
        chatgpt-custom-gpt-exporter.ts

      agents-md/
        agents-md-exporter.ts

  data/
    catalog/
      artifact-kinds.json
      providers.json
      provider-capabilities.json
      provider-equivalents.json
      artifact-provider-compatibility.json
      profiles.json

      templates/
        prompt-templates.json
        skill-templates.json
        hook-templates.json
        instruction-templates.json
        workflow-templates.json

      contexts/
        context-fields.json
        context-presets.json

      constraints/
        global-constraints.json
        provider-constraints.json
        artifact-constraints.json

      outputs/
        output-formats.json
        provider-output-formats.json

      exporters/
        export-targets.json

  infrastructure/
    catalog/
      jsonCatalogRepository.ts
      databaseCatalogRepository.ts
      catalogRepositoryFactory.ts

  types/
    json.d.ts

  utils/
    assertNever.ts
    slugify.ts
    normalizeId.ts
```

---

# Secuencia óptima de implementación

```text
Fase 1.5 — Reorientación de producto y dominio base
Fase 1.6 — Catálogo desacoplado y migración a JSON
Fase 1.7 — Exporters y generación preparada para artefactos
Fase 2   — Landing profesional y wizard guiado
Fase 2.5 — UX avanzada y reducción de abandono
Fase 3   — Producto escalable
Fase 4   — Artefactos reutilizables
Fase 5   — Hooks y automatizaciones
```

## Secuencia exacta

```text
1.5.1 → 1.5.2 → 1.5.3 → 1.5.4
1.6.1 → 1.6.2 → 1.6.3 → 1.6.4 → 1.6.5
1.7.1 → 1.7.2 → 1.7.3
2.1   → 2.2   → 2.3   → 2.4
2.5.1 → 2.5.2 → 2.5.3 → 2.5.4 → 2.5.5
3.1   → 3.2   → 3.3   → 3.4
4.1   → 4.2   → 4.3   → 4.4
5.1   → 5.2   → 5.3
```

---

# Fase 1.5 — Reorientación de producto y dominio base

## Objetivo

Renombrar el producto y crear el dominio mínimo para crecer desde Prompt Builder hacia AI Prompt & Workflow Builder sin rehacer la arquitectura.

## Resultado esperado

```text
- Nombre actualizado.
- Dominio Artifact/Provider creado.
- Compatibilidad y equivalencias modeladas.
- Legacy eliminado.
- La generación actual de prompts sigue funcionando.
```

---

## Issue 1.5.1 — Renombrar producto y copy base

```text
/pbw-issue

Issue 1.5.1: Renombrar producto a AI Prompt & Workflow Builder

Objetivo:
Renombrar la aplicación de Prompt Builder Wizard a AI Prompt & Workflow Builder sin cambiar todavía el flujo funcional.

Contexto:
La app actual ya genera prompts con flujo Perfil → Plantilla. Queremos reposicionar el producto para que la V1 siga centrada en prompts, pero la arquitectura y la comunicación permitan crecer hacia skills, hooks, instrucciones y workflows.

Restricciones:
1. No cambies arquitectura todavía.
2. No cambies wizard todavía.
3. No cambies estilos globales.
4. No implementes skills/hooks.
5. No instales dependencias.
6. No introduzcas any.
7. Mantén generación de prompt intacta.

Tareas:
1. Cambiar título visible a “AI Prompt & Workflow Builder”.
2. Cambiar metadata/document title.
3. Actualizar hero/copy principal.
4. Sustituir menciones visibles de “Prompt Builder Wizard”.
5. Mantener aclaración: “En V1 se generan prompts optimizados”.
6. Ejecutar build/lint/test.

Criterios de aceptación:
- El producto se presenta como AI Prompt & Workflow Builder.
- La app no promete funcionalidades futuras como disponibles.
- El flujo actual sigue funcionando.
- Build pasa.
- Lint/test pasan si existen.

Salida esperada:
1. Archivos modificados.
2. Textos cambiados.
3. Validaciones ejecutadas.
4. Resultado build/lint/test.
5. Veredicto: “Issue 1.5.1 cerrable: sí/no”.
```

---

## Issue 1.5.2 — Eliminar legacy Flow/PromptType

```text
/pbw-issue

Issue 1.5.2: Eliminar sistema legacy Flow/PromptType

Objetivo:
Eliminar definitivamente el sistema legacy basado en flowCatalog, promptTypes, Flow, PromptType y cualquier método asociado al flujo anterior.

Contexto:
El backlog anterior ya contemplaba esta issue. Se mantiene, pero ahora debe ejecutarse antes de crear el nuevo dominio Artifact/Provider para no construir encima de basura legacy.

Restricciones:
1. No implementes nuevas features.
2. No cambies UI salvo eliminar referencias legacy visibles.
3. No cambies estilos.
4. No migres todavía a JSON.
5. No particiones catálogo todavía.
6. Mantén TypeScript strict.
7. No introduzcas any.
8. No rompas Perfil → Plantilla.
9. No rompas reset en cascada.
10. No rompas recomendaciones por plantilla.
11. No rompas prompt dinámico.

Tareas:
1. Buscar referencias a:
   - flowCatalog
   - promptTypes
   - Flow
   - PromptType
   - selectedFlow
   - selectedType
   - getSelectedFlow
   - getSelectedType
   - getFlowList
   - getPromptTypeList
2. Clasificar referencias legacy.
3. Eliminar datos, tipos, métodos e imports sin uso real.
4. Confirmar que la app usa solo:
   - profileCatalog
   - promptTemplateCatalog
   - constraintCatalog
   - outputCatalog
   - tips
   - selectedProfile
   - selectedTemplate
5. Ejecutar build/lint/test.
6. Verificar runtime mínimo.

Criterios de aceptación:
- No existe flowCatalog.
- No existe promptTypes.
- No existen tipos Flow/PromptType si no tienen uso real.
- No hay imports legacy.
- El wizard actual sigue funcionando.
- Build pasa.

Verificación runtime:
1. Cargar app.
2. Ver 8 perfiles.
3. Seleccionar Developer.
4. Ver 7 plantillas.
5. Seleccionar plantilla.
6. Confirmar prompt generado.

Salida esperada:
1. Referencias encontradas.
2. Referencias eliminadas.
3. Archivos modificados.
4. Confirmación de no legacy.
5. Resultado build/lint/test.
6. Veredicto: “Issue 1.5.2 cerrable: sí/no”.
```

---

## Issue 1.5.3 — Crear dominio Artifact/Provider/Compatibility

```text
/pbw-issue

Issue 1.5.3: Crear dominio Artifact/Provider/Compatibility

Objetivo:
Crear el modelo de dominio que permitirá soportar prompts, skills, hooks, instrucciones, prompt files, agent instructions y workflows.

Contexto:
La app sigue generando solo prompts. Esta issue prepara el dominio sin cambiar todavía el wizard ni la generación final.

Restricciones:
1. No implementes UI nueva.
2. No implementes skills/hooks funcionales.
3. No migres todavía a JSON.
4. No cambies PromptBuilder salvo imports/tipos mínimos.
5. No uses enums para ids dinámicos.
6. Sí puedes usar enums para dominios estables.
7. No introduzcas any.
8. No instales dependencias.

Estructura objetivo:
src/domain/artifacts/
src/domain/providers/

Tipos mínimos:
- ArtifactKind
- AiProvider
- ProviderCapability
- SupportLevel
- ProviderArtifactCompatibility
- ProviderEquivalent
- ArtifactDefinition
- ArtifactTemplateBase

ArtifactKind mínimo:
- prompt
- skill
- hook
- project_instructions
- scoped_instructions
- prompt_file
- agent_instructions
- workflow
- checklist

AiProvider mínimo:
- generic
- chatgpt
- claude
- claude_code
- github_copilot

SupportLevel:
- native
- equivalent
- partial
- unsupported

Tareas:
1. Crear carpetas domain/artifacts y domain/providers.
2. Crear enums/constantes estables.
3. Crear tipos base.
4. Crear helper assertNever si hace falta.
5. Crear matriz inicial en TypeScript temporal si aún no existe JSON.
6. No conectar todavía la UI salvo que sea necesario para compilar.
7. Ejecutar build/lint/test.

Criterios de aceptación:
- Existe dominio Artifact/Provider.
- Se pueden representar ChatGPT, Claude, Claude Code y GitHub Copilot.
- Se pueden representar compatibilidades nativas/equivalentes/parciales/no soportadas.
- No hay comportamiento nuevo visible todavía.
- Build pasa.

Salida esperada:
1. Archivos creados.
2. Decisiones sobre enums vs ids dinámicos.
3. Matriz mínima definida.
4. Resultado build/lint/test.
5. Riesgos residuales.
6. Veredicto: “Issue 1.5.3 cerrable: sí/no”.
```

---

## Issue 1.5.4 — Particionar catálogo TypeScript sin migrar a JSON

```text
/pbw-issue

Issue 1.5.4: Particionar catálogo TypeScript por dominio

Objetivo:
Dividir el catálogo grande actual en módulos TypeScript pequeños, manteniendo comportamiento funcional y sin migrar todavía a JSON.

Contexto:
El legacy ya fue eliminado y existe dominio Artifact/Provider. Ahora hay que reducir acoplamiento antes de mover datos a JSON.

Restricciones:
1. No migres a JSON.
2. No cambies UI.
3. No cambies estilos.
4. No implementes features nuevas.
5. No cambies generación de prompt.
6. Mantén API pública estable.
7. No introduzcas any.

Estructura temporal:
src/data/catalog/
  index.ts
  profiles.ts
  constraints.ts
  outputs.ts
  tips.ts
  context-fields.ts
  compatibility.ts
  artifact-kinds.ts
  providers.ts
  templates/
    index.ts
    product-owner.ts
    qa-manual.ts
    qa-automation.ts
    developer.ts
    tech-lead.ts
    product-designer.ts
    data-analyst.ts
    devops-sre.ts

Tratamiento de catalogs.ts:
- Mantener como fachada temporal si hay muchos imports:
  export * from './catalog';
- Eliminarlo si actualizar imports es seguro.

Tareas:
1. Inspeccionar imports actuales.
2. Crear estructura modular.
3. Mover perfiles, plantillas, constraints, outputs y tips.
4. Mover compatibilidad Artifact/Provider si ya existe en datos temporales.
5. Crear index.ts como API pública.
6. Asegurar validación existente.
7. Ejecutar build/lint/test.
8. Verificar runtime mínimo.

Criterios de aceptación:
- catalogs.ts deja de ser un fichero grande de datos.
- Catálogo separado por dominio.
- Plantillas separadas por perfil.
- No hay cambios funcionales.
- Build pasa.

Salida esperada:
1. Estructura anterior detectada.
2. Nueva estructura creada.
3. Decisión sobre catalogs.ts.
4. Resultado build/lint/test.
5. Veredicto: “Issue 1.5.4 cerrable: sí/no”.
```

---

# Fase 1.6 — Catálogo desacoplado y migración a JSON

## Objetivo

Crear una frontera clara entre dominio, origen de datos y UI.

## Resultado esperado

```text
- CatalogRepository creado.
- JsonCatalogRepository creado.
- JSON versionados en src/data/catalog.
- Validación y normalización centralizadas.
- UI sin imports directos a JSON.
- Preparado para BBDD/API.
```

---

## Issue 1.6.1 — Modelo de catálogo, normalización y validación

```text
/pbw-issue

Issue 1.6.1: Crear modelo de catálogo, normalización y validación runtime

Objetivo:
Crear una capa de catálogo preparada para datos externos, diferenciando datos crudos, validación runtime, modelo normalizado y consumo por UI/servicios.

Restricciones:
1. No migres datos a JSON todavía.
2. No cambies UI.
3. No cambies estilos.
4. No implementes features nuevas.
5. No conviertas la app en async global si no es necesario.
6. No introduzcas any.
7. No uses enums para ids dinámicos.

Estructura:
src/domain/catalog/
  catalog-types.ts
  catalog-loader.ts
  catalog-normalizer.ts
  catalog-validator.ts
  catalog-repository.ts

Modelos:
- CatalogBundle
- CatalogIndex
- CatalogLoader
- CatalogRepository
- CatalogValidationError
- CatalogValidationResult

CatalogBundle:
- artifactKinds
- providers
- providerCapabilities
- providerEquivalents
- compatibility
- profiles
- templates
- constraints
- outputs
- contextFields
- tips

CatalogIndex:
- artifactKindsById
- providersById
- profilesById
- templatesById
- templatesByProfileId
- constraintsById
- outputsById
- contextFieldsById
- compatibilityByProviderAndArtifact

Tareas:
1. Crear tipos de catálogo.
2. Crear normalizeCatalog(bundle).
3. Crear validateCatalogBundle(bundle).
4. Validar ids, referencias cruzadas y strings obligatorios.
5. Crear staticCatalogLoader usando datos TypeScript actuales.
6. Exportar catálogo validado/normalizado.
7. Mantener compatibilidad con imports existentes.
8. Ejecutar build/lint/test.

Criterios de aceptación:
- Existe CatalogBundle.
- Existe CatalogIndex.
- Existe validación runtime centralizada.
- Existe normalización centralizada.
- App sigue funcionando.
- Build pasa.

Salida esperada:
1. Tipos creados.
2. Validaciones aplicadas.
3. Normalización descrita.
4. Resultado build/lint/test.
5. Veredicto: “Issue 1.6.1 cerrable: sí/no”.
```

---

## Issue 1.6.2 — Crear JSON versionados en src/data/catalog

```text
/pbw-issue

Issue 1.6.2: Extraer catálogo a JSON versionados

Objetivo:
Mover los datos del catálogo desde TypeScript a JSON versionados dentro de src/data/catalog, sin conectar todavía la app a JSON si eso mezcla extracción e integración.

Restricciones:
1. No cambies UI.
2. No cambies comportamiento funcional.
3. No cambies ids salvo bug real.
4. No uses YAML.
5. No elimines todavía datos TS si la integración queda para la siguiente issue.
6. No introduzcas any.

Formato obligatorio:
Cada JSON debe tener:

{
  "schemaVersion": 1,
  "items": []
}

Estructura:
src/data/catalog/
  artifact-kinds.json
  providers.json
  provider-capabilities.json
  provider-equivalents.json
  artifact-provider-compatibility.json
  profiles.json
  templates/
    prompt-templates.json
    skill-templates.json
    hook-templates.json
    instruction-templates.json
    workflow-templates.json
  contexts/
    context-fields.json
    context-presets.json
  constraints/
    global-constraints.json
    provider-constraints.json
    artifact-constraints.json
  outputs/
    output-formats.json
    provider-output-formats.json
  exporters/
    export-targets.json

Tareas:
1. Crear estructura JSON.
2. Migrar perfiles.
3. Migrar 37 plantillas actuales como prompt-templates.
4. Añadir artifact-kinds.
5. Añadir providers.
6. Añadir provider-capabilities.
7. Añadir equivalencias proveedor.
8. Añadir compatibilidad artifact-provider.
9. Migrar constraints, outputs, tips/context fields.
10. Validar JSON con script/node.
11. Ejecutar build/lint/test.

Conteo esperado:
- perfiles: 8.
- prompt templates: 37.
- product-owner: 5.
- qa-manual: 5.
- qa-automation: 4.
- developer: 7.
- tech-lead: 4.
- product-designer: 4.
- data-analyst: 4.
- devops-sre: 4.

Criterios de aceptación:
- JSON válidos.
- Datos migrados sin pérdida.
- No hay datos legacy.
- Compatibilidad Artifact/Provider representada en JSON.
- Build pasa.

Salida esperada:
1. JSON creados.
2. Conteos.
3. Confirmación de JSON válido.
4. Resultado build/lint/test.
5. Veredicto: “Issue 1.6.2 cerrable: sí/no”.
```

---

## Issue 1.6.3 — Implementar JsonCatalogRepository

```text
/pbw-issue

Issue 1.6.3: Implementar JsonCatalogRepository

Objetivo:
Hacer que la app cargue el catálogo desde JSON mediante CatalogRepository, validando y normalizando antes de exponer datos.

Restricciones:
1. UI no debe importar JSON.
2. PromptBuilder no debe importar JSON.
3. Handlers no deben validar catálogo.
4. No dupliques datos TS/JSON.
5. No conviertas toda la app en async si no es necesario.
6. No introduzcas any.
7. No instales dependencias.

Estructura:
src/infrastructure/catalog/
  jsonCatalogRepository.ts
  databaseCatalogRepository.ts
  catalogRepositoryFactory.ts

Tareas:
1. Importar JSON desde JsonCatalogRepository.
2. Si es necesario, habilitar resolveJsonModule.
3. Construir CatalogBundle.
4. Ejecutar validateCatalogBundle.
5. Ejecutar normalizeCatalog.
6. Exponer métodos de CatalogRepository.
7. Crear factory.
8. Adaptar hooks/servicios para consumir repositorio.
9. Eliminar datos TS duplicados.
10. Ejecutar build/lint/test.
11. Verificar runtime.

Criterios de aceptación:
- Los datos se leen desde JSON.
- La app consume modelo validado/normalizado.
- No hay imports directos de JSON desde UI.
- No hay duplicidad TS/JSON.
- Hay 8 perfiles y 37 plantillas.
- Build pasa.

Verificación runtime:
1. Cargar app.
2. Ver 8 perfiles.
3. Seleccionar Developer.
4. Ver 7 plantillas.
5. Seleccionar QA Manual.
6. Ver 5 plantillas.
7. Seleccionar plantilla.
8. Confirmar prompt sin placeholders innecesarios.

Salida esperada:
1. Cómo se importan JSON.
2. Cambios en tsconfig si aplica.
3. Datos TS eliminados.
4. Validaciones aplicadas.
5. Conteo final.
6. Resultado build/lint/test.
7. Veredicto: “Issue 1.6.3 cerrable: sí/no”.
```

---

## Issue 1.6.4 — Crear DatabaseCatalogRepository placeholder

```text
/pbw-issue

Issue 1.6.4: Crear DatabaseCatalogRepository placeholder

Objetivo:
Dejar preparada la sustitución futura de JSON por BBDD/API sin implementar backend todavía.

Restricciones:
1. No conectes a una API real.
2. No añadas dependencias.
3. No cambies UI.
4. No cambies comportamiento.
5. No introduzcas any.
6. No dejes código muerto confuso: debe ser placeholder explícito.

Tareas:
1. Crear DatabaseCatalogRepository con la misma interfaz.
2. Implementarlo como placeholder documentado que lance error controlado o quede no usado.
3. Añadir comentarios mínimos sobre el contrato esperado.
4. Asegurar que la factory usa JsonCatalogRepository por defecto.
5. Ejecutar build/lint/test.

Criterios de aceptación:
- Existe alternativa futura sin acoplar UI.
- No se usa en runtime.
- No rompe build.
- No introduce deuda técnica confusa.

Salida esperada:
1. Archivos creados.
2. Contrato documentado.
3. Resultado build/lint/test.
4. Veredicto: “Issue 1.6.4 cerrable: sí/no”.
```

---

## Issue 1.6.5 — Limpieza final de arquitectura de catálogo

```text
/pbw-review

Issue 1.6.5: Limpieza final de catálogo y deuda técnica

Objetivo:
Auditar y limpiar deuda técnica tras migración a JSON y repositorio.

Restricciones:
1. No features nuevas.
2. No cambios visuales.
3. No cambios de comportamiento.
4. No cambiar ids salvo bug real.
5. No eliminar validaciones útiles.
6. No introducir any.

Auditoría:
- Legacy Flow/PromptType.
- Datos duplicados TS/JSON.
- Imports directos a JSON desde UI.
- Validación fuera de domain/catalog.
- Tipos muertos.
- Exports muertos.
- Métodos muertos.
- Catálogo no normalizado.
- Referencias rotas.

Tareas:
1. Ejecutar búsquedas de legacy.
2. Ejecutar búsqueda de imports a JSON.
3. Eliminar código muerto real.
4. Confirmar validación y normalización.
5. Ejecutar build/lint/test.
6. Ejecutar runtime básico.

Criterios de aceptación:
- Sin legacy.
- Sin duplicación TS/JSON.
- Sin imports JSON en UI.
- Catálogo validado/normalizado.
- Build pasa.

Salida esperada:
1. Código muerto encontrado.
2. Código muerto eliminado.
3. Código conservado y justificación.
4. Resultado build/lint/test.
5. Veredicto: “Fase 1.6 cerrable: sí/no”.
```

---

# Fase 1.7 — Exporters y generación preparada para artefactos

## Objetivo

Encapsular la generación de salida para que el prompt actual sea solo un exporter operativo, y los futuros artefactos no obliguen a rehacer PromptBuilder.

---

## Issue 1.7.1 — Crear interfaz ArtifactExporter

```text
/pbw-issue

Issue 1.7.1: Crear interfaz ArtifactExporter

Objetivo:
Crear una capa de exportadores para generar salidas por tipo de artefacto y proveedor.

Restricciones:
1. No cambies UI.
2. No implementes skills/hooks todavía.
3. No dupliques PromptBuilder.
4. No introduzcas any.
5. No instales dependencias.

Estructura:
src/domain/artifacts/artifact-exporter.ts
src/domain/exporters/

Tipos:
- ArtifactExporter
- ArtifactExportInput
- ArtifactExportResult
- ArtifactExportFile
- ArtifactExportTarget

Tareas:
1. Crear tipos de exportación.
2. Modelar salida simple y salida multiarchivo.
3. Añadir soporte para:
   - copyText
   - files
   - warnings
   - provider
   - artifactKind
4. Ejecutar build/lint/test.

Criterios de aceptación:
- Existe interfaz de exportación.
- Soporta texto simple y bundles futuros.
- No cambia comportamiento visible.
- Build pasa.

Salida esperada:
1. Tipos creados.
2. Decisiones de modelo.
3. Resultado build/lint/test.
4. Veredicto: “Issue 1.7.1 cerrable: sí/no”.
```

---

## Issue 1.7.2 — Convertir generación actual en PromptExporter

```text
/pbw-issue

Issue 1.7.2: Encapsular generación actual en PromptExporter

Objetivo:
Mover la generación actual de prompt a un PromptExporter operativo, manteniendo la salida actual.

Restricciones:
1. No cambies el contenido semántico del prompt salvo ajuste mínimo.
2. No rompas XML/compacto si existe.
3. No rompas copy/download/handoff.
4. No implementes otros exporters.
5. No introduzcas any.

Tareas:
1. Inspeccionar PromptBuilder actual.
2. Extraer generación a PromptExporter o envolver PromptBuilder si es más seguro.
3. Asegurar que UI llama a capa de exportación.
4. Mantener compatibilidad con salida actual.
5. Ejecutar build/lint/test.
6. Verificar runtime.

Criterios de aceptación:
- Prompt actual se genera mediante PromptExporter.
- La salida no cambia de forma relevante.
- Copy/download/handoff siguen funcionando.
- Build pasa.

Salida esperada:
1. Estrategia elegida: extraer o envolver.
2. Archivos modificados.
3. Resultado build/lint/test.
4. Evidencia runtime.
5. Veredicto: “Issue 1.7.2 cerrable: sí/no”.
```

---

## Issue 1.7.3 — Crear placeholders tipados de exporters futuros

```text
/pbw-issue

Issue 1.7.3: Crear placeholders tipados de exporters futuros

Objetivo:
Crear placeholders explícitos para exporters futuros sin simular funcionalidad disponible.

Exporters futuros:
- ClaudeCodeSkillExporter
- ClaudeCodeHookExporter
- CopilotInstructionsExporter
- CopilotPromptFileExporter
- ChatGptCustomGptExporter
- AgentsMdExporter

Restricciones:
1. No hacerlos funcionales todavía.
2. No exponer botones activos si no generan salida real.
3. No meter código muerto ambiguo.
4. Los placeholders deben devolver unsupported/notImplemented de forma explícita.
5. No introducir any.

Tareas:
1. Crear carpetas de exporters futuros.
2. Crear clases/funciones tipadas.
3. Marcar estado notImplemented.
4. Añadir tests mínimos si existe infraestructura.
5. Ejecutar build/lint/test.

Criterios de aceptación:
- Exporters futuros existen como contrato.
- No son accesibles como funcionalidad real.
- No engañan a la UI.
- Build pasa.

Salida esperada:
1. Exporters placeholder creados.
2. Cómo se evita simular funcionalidad.
3. Resultado build/lint/test.
4. Veredicto: “Fase 1.7 cerrable: sí/no”.
```

---

# Fase 2 — Landing profesional y wizard guiado

## Objetivo

Reposicionar la página como producto profesional y transformar el wizard en un flujo guiado por decisiones, no en una lista de pasos administrativos.

---

## Issue 2.1 — Landing profesional

```text
/pbw-issue

Issue 2.1: Crear landing profesional

Objetivo:
Convertir la página inicial en una landing clara de AI Prompt & Workflow Builder.

Restricciones:
1. No cambies la lógica del builder.
2. No implementes features futuras.
3. No cambies radicalmente paleta visual.
4. No añadas dependencias.
5. No introduzcas any.

Estructura:
- HeroSection
- ValueProposition
- ArtifactTypeCards
- ProviderCompatibility
- WorkflowPreview
- SecurityNotes
- RoadmapTeaser
- CTA hacia builder

Copy base:
“Construye prompts, instrucciones y flujos reutilizables para trabajar mejor con ChatGPT, Claude, Claude Code y GitHub Copilot.”

Tareas:
1. Crear componentes de landing.
2. Mostrar Prompt como disponible.
3. Mostrar Skill/Hook/Workflow como próximamente.
4. Mostrar compatibilidad de forma resumida.
5. Añadir CTA “Crear artefacto IA”.
6. Mantener estilo visual actual.
7. Ejecutar build/lint/test.

Criterios de aceptación:
- La home ya no parece solo un formulario.
- El usuario entiende qué puede crear ahora.
- Las funciones futuras están marcadas como próximas.
- Build pasa.

Salida esperada:
1. Componentes creados.
2. Copy principal.
3. Resultado build/lint/test.
4. Veredicto: “Issue 2.1 cerrable: sí/no”.
```

---

## Issue 2.2 — Selector de artefacto y proveedor

```text
/pbw-issue

Issue 2.2: Añadir selector de artefacto y proveedor

Objetivo:
Añadir al flujo las decisiones “qué quieres crear” y “dónde lo vas a usar”.

Restricciones:
1. Solo Prompt debe estar operativo.
2. Skill/Hook/Workflow deben mostrarse como próximamente o no soportado.
3. No generar combinaciones falsas.
4. Compatibilidad debe venir del catálogo.
5. No hardcodear equivalencias en componentes.
6. No introducir any.

Flujo:
- Crear
- Destino
- Perfil
- Objetivo
- Información
- Reglas
- Formato
- Exportar

Tareas:
1. Crear ArtifactSelector.
2. Crear ProviderSelector.
3. Consumir compatibilidad desde catálogo.
4. Bloquear artefactos no disponibles.
5. Mostrar equivalencias cuando aplique.
6. Mantener Prompt como camino operativo.
7. Ejecutar build/lint/test.

Criterios de aceptación:
- Se puede seleccionar Prompt.
- Se puede seleccionar proveedor.
- Opciones futuras no aparecen como funcionales.
- Compatibilidad visible.
- Build pasa.

Salida esperada:
1. Componentes creados.
2. Estado añadido.
3. Compatibilidad aplicada.
4. Resultado build/lint/test.
5. Veredicto: “Issue 2.2 cerrable: sí/no”.
```

---

## Issue 2.3 — Reemplazar “pasos” por flujo guiado

```text
/pbw-issue

Issue 2.3: Reemplazar pasos por flujo guiado

Objetivo:
Sustituir etiquetas “Paso 1, Paso 2...” por navegación de decisiones.

Antes:
- Paso 1 — Perfil de uso
- Paso 2 — Plantilla
- Paso 3 — Contexto mínimo
- Paso 4 — Restricciones
- Paso 5 — Salida requerida

Después:
- Crear
- Destino
- Perfil
- Objetivo
- Información
- Reglas
- Formato
- Exportar

Restricciones:
1. No cambiar la lógica de generación.
2. No romper navegación.
3. No usar solo color para estados.
4. No introducir any.

Estados:
- pending
- current
- completed
- reviewRequired
- locked

Tareas:
1. Crear función centralizada getFlowSectionState.
2. Actualizar navegación.
3. Permitir volver a secciones completadas.
4. Bloquear secciones inválidas.
5. Añadir aria-current si aplica.
6. Ejecutar build/lint/test.

Criterios de aceptación:
- La UI ya no habla de “pasos”.
- El usuario ve flujo de decisiones.
- No se puede saltar a secciones inválidas.
- Build pasa.

Salida esperada:
1. Modelo de estados.
2. Archivos modificados.
3. Resultado build/lint/test.
4. Veredicto: “Issue 2.3 cerrable: sí/no”.
```

---

## Issue 2.4 — Cards de perfiles, plantillas y artefactos

```text
/pbw-issue

Issue 2.4: Cards visuales para artefactos, proveedores, perfiles y plantillas

Objetivo:
Mejorar la selección usando cards visuales escaneables.

Restricciones:
1. No cambiar modelo de catálogo.
2. No cambiar PromptExporter.
3. No añadir dependencias.
4. Mantener accesibilidad básica.
5. No introducir any.

Tareas:
1. Crear SelectionCard reutilizable.
2. Usarla en ArtifactSelector.
3. Usarla en ProviderSelector.
4. Usarla en ProfileSelector.
5. Usarla en TemplateSelector.
6. Mostrar estado selected/disabled/coming soon.
7. Mantener data-profile y data-template si se usan en tests.
8. Ejecutar build/lint/test.

Criterios de aceptación:
- Selecciones principales son cards.
- Se mantiene navegación por teclado.
- Estado selected es claro.
- Build pasa.

Salida esperada:
1. Componentes afectados.
2. Decisiones de accesibilidad.
3. Resultado build/lint/test.
4. Veredicto: “Fase 2 cerrable: sí/no”.
```

---

# Fase 2.5 — UX avanzada y reducción de abandono

## Objetivo

Hacer el builder más usable sin tocar arquitectura base.

---

## Issue 2.5.1 — Modo rápido / avanzado

```text
/pbw-issue

Issue 2.5.1: Añadir modo rápido y avanzado

Objetivo:
Permitir crear prompts con menos fricción sin duplicar wizard.

Modo rápido:
- Artefacto Prompt.
- Proveedor.
- Perfil.
- Plantilla.
- Información mínima.
- Usa reglas y formato recomendados.

Modo avanzado:
- Flujo completo.
- Reglas editables.
- Formato editable.

Restricciones:
1. No crear dos wizards.
2. No duplicar estado.
3. No duplicar PromptExporter.
4. No introducir any.

Criterios de aceptación:
- Modo rápido genera prompt con menos acciones.
- Modo avanzado conserva control completo.
- Build pasa.
```

---

## Issue 2.5.2 — Información guiada por plantilla

```text
/pbw-issue

Issue 2.5.2: Información guiada por plantilla

Objetivo:
Renderizar campos de información según requiredContextFields de la plantilla.

Restricciones:
1. Mantener campo de información adicional.
2. No meter lógica de catálogo en UI.
3. No romper modo rápido/avanzado.
4. No introducir any.

Criterios de aceptación:
- Bug report muestra campos de bug report.
- Historia de usuario muestra campos propios.
- Prompt incluye contexto estructurado.
- Checklist detecta contexto insuficiente.
- Build pasa.
```

---

## Issue 2.5.3 — Reset no destructivo y revisión

```text
/pbw-issue

Issue 2.5.3: Reset no destructivo con estado requiere revisión

Objetivo:
Evitar borrar texto del usuario al cambiar perfil/plantilla.

Reglas:
- Cambiar perfil conserva contexto si es posible.
- Marca secciones afectadas como requiere revisión.
- Permite aplicar recomendaciones.
- Permite limpiar manualmente.

Restricciones:
1. No duplicar estado.
2. No mezclar reset en renderer.
3. No introducir any.

Criterios de aceptación:
- No se pierde texto sin acción explícita.
- Stepper/flujo muestra reviewRequired.
- Prompt sigue generándose.
- Build pasa.
```

---

## Issue 2.5.4 — Empty states y microcopy

```text
/pbw-issue

Issue 2.5.4: Empty states y microcopy

Objetivo:
Mejorar claridad textual sin rediseñar.

Cambios:
- “Contexto mínimo” → “Información necesaria”.
- “Salida requerida” → “Formato de respuesta”.
- Empty state del prompt.
- Ayuda contextual en secciones bloqueadas.
- Sin términos legacy visibles.

Criterios de aceptación:
- Primera pantalla comprensible.
- Prompt vacío explica qué falta.
- No hay términos legacy visibles.
- Build pasa.
```

---

## Issue 2.5.5 — Accesibilidad básica y revisión UX

```text
/pbw-review

Issue 2.5.5: Accesibilidad básica y revisión final UX

Objetivo:
Auditar navegación, teclado, estados, labels y regresiones.

Criterios de aceptación:
- Flujo básico completado con teclado.
- Cards seleccionables con teclado.
- Inputs con labels.
- Foco visible.
- Estados no dependen solo de color.
- Copy/download/handoff funcionan.
- Build/lint/test pasan.
- Fase 2.5 cerrable.
```

---

# Fase 3 — Producto escalable

## Objetivo

Añadir capacidades útiles sin contaminar arquitectura.

## Issues reajustadas

Se eliminan o posponen elementos que aportan menos al roadmap inmediato. La prioridad pasa a ser:

```text
Exportación
URLs navegables
Historial local
Favoritos
Tracking
```

Las plantillas personalizadas pasan a Fase 4 porque afectan al modelo system/user y pueden interferir con skills/workflows.

---

## Issue 3.1 — Exportación Markdown y bundle simple

```text
/pbw-issue

Issue 3.1: Exportación Markdown y bundle simple

Objetivo:
Añadir exportación Markdown y preparar la UI para futuras salidas multiarchivo.

Restricciones:
1. No implementar ZIP todavía salvo que ya exista soporte.
2. No romper descarga TXT.
3. Usar ArtifactExportResult.
4. No introducir any.

Criterios de aceptación:
- TXT sigue funcionando.
- Markdown funciona.
- ExportPanel consume ArtifactExportResult.
- Build pasa.
```

---

## Issue 3.2 — URLs navegables

```text
/pbw-issue

Issue 3.2: URLs navegables por artifact/provider/profile/template

Objetivo:
Permitir abrir el builder con decisiones preseleccionadas.

Formato:
- ?artifact=prompt
- ?artifact=prompt&provider=claude_code
- ?artifact=prompt&provider=github_copilot&profile=developer&template=debug

Restricciones:
1. No introducir router.
2. Validar ids contra catálogo.
3. Ignorar params inválidos.
4. No introducir any.

Criterios de aceptación:
- Params válidos preseleccionan.
- Params inválidos no rompen.
- Build pasa.
```

---

## Issue 3.3 — Historial local

```text
/pbw-issue

Issue 3.3: Historial local de artefactos generados

Objetivo:
Guardar localmente los últimos prompts generados.

Restricciones:
1. localStorage solo vía servicio.
2. No guardar contexto sensible innecesario.
3. Límite de tamaño.
4. No introducir any.

Criterios de aceptación:
- Historial limitado.
- Restaurar prompt funciona.
- Borrar historial funciona.
- Build pasa.
```

---

## Issue 3.4 — Favoritos

```text
/pbw-issue

Issue 3.4: Favoritos de plantillas y combinaciones frecuentes

Objetivo:
Permitir marcar como favoritas plantillas o combinaciones artifact/provider/profile/template.

Restricciones:
1. No modificar JSON.
2. localStorage encapsulado.
3. No introducir any.

Criterios de aceptación:
- Favoritos persisten.
- Favoritos inválidos se ignoran.
- Build pasa.
```

---

## Issue 3.5 — Tracking interno desacoplado

```text
/pbw-issue

Issue 3.5: Tracking interno desacoplado

Objetivo:
Medir funnel sin servicios externos.

Eventos:
- artifact_selected
- provider_selected
- profile_selected
- template_selected
- context_completed
- prompt_generated
- export_copied
- export_downloaded
- section_changed

Restricciones:
1. No servicios externos.
2. No registrar texto sensible.
3. Tracking desactivable.
4. No introducir any.

Criterios de aceptación:
- Servicio centralizado.
- No-op por defecto o console.debug configurable.
- Build pasa.
```

---

# Fase 4 — Artefactos reutilizables

## Objetivo

Empezar a generar artefactos distintos de prompt.

Orden recomendado:

```text
Project Instructions
Prompt Files
Skills
Plantillas personalizadas
```

No empezar por hooks. Hooks tienen más riesgo porque pueden ejecutar acciones locales.

---

## Issue 4.1 — Project Instructions

```text
/pbw-issue

Issue 4.1: Generar Project Instructions

Objetivo:
Generar instrucciones persistentes por proveedor.

Targets:
- ChatGPT: Custom instructions / Custom GPT instructions
- Claude: Project instructions
- Claude Code: CLAUDE.md
- GitHub Copilot: .github/copilot-instructions.md

Restricciones:
1. No implementar hooks.
2. No generar archivos peligrosos.
3. Usar ArtifactExporter.
4. Mostrar equivalencias.
5. No introducir any.

Criterios de aceptación:
- Se genera texto/archivo según proveedor.
- Se muestran advertencias de compatibilidad.
- Build pasa.
```

---

## Issue 4.2 — Prompt Files / Agent Instructions

```text
/pbw-issue

Issue 4.2: Generar Prompt Files y Agent Instructions

Objetivo:
Generar artefactos reutilizables tipo prompt file / AGENTS.md.

Targets:
- GitHub Copilot: prompt file / AGENTS.md
- Claude Code: comando/skill equivalente si aplica
- ChatGPT: instrucciones reutilizables para GPT personalizado

Criterios de aceptación:
- Exporters operativos.
- UI no vende equivalencia exacta cuando no existe.
- Build pasa.
```

---

## Issue 4.3 — Claude Code Skill

```text
/pbw-issue

Issue 4.3: Generar Claude Code Skill

Objetivo:
Generar estructura básica de skill para Claude Code.

Salida esperada:
.claude/
  skills/
    <skill-name>/
      SKILL.md

Restricciones:
1. No generar hooks.
2. No generar scripts ejecutables salvo issue futura.
3. Añadir advertencias de revisión.
4. Usar ArtifactExportResult multiarchivo.
5. No introducir any.

Criterios de aceptación:
- Genera SKILL.md.
- Genera árbol de archivos.
- Permite copiar/descargar contenido.
- Build pasa.
```

---

## Issue 4.4 — Plantillas personalizadas system/user

```text
/pbw-issue

Issue 4.4: Plantillas personalizadas de usuario

Objetivo:
Permitir crear plantillas propias sin modificar catálogo JSON base.

Restricciones:
1. Distinguir system/user.
2. No sobrescribir ids system.
3. localStorage encapsulado.
4. Validar plantillas de usuario.
5. No introducir any.

Criterios de aceptación:
- Crear plantilla user.
- Usarla en builder.
- Eliminar solo user.
- Catálogo JSON no cambia.
- Build pasa.
```

---

# Fase 5 — Hooks y automatizaciones

## Objetivo

Generar hooks solo cuando ya existan exporters multiarchivo, advertencias de seguridad y modelo de compatibilidad maduro.

---

## Issue 5.1 — Modelo seguro de Hook

```text
/pbw-issue

Issue 5.1: Modelo seguro de Hook

Objetivo:
Modelar hooks como artefactos de automatización con nivel de riesgo.

Campos:
- event
- matcher
- actionType
- command
- timeout
- blocking
- riskLevel
- safetyWarnings

Restricciones:
1. No generar scripts todavía.
2. No activar hooks.
3. No introducir any.

Criterios de aceptación:
- Modelo Hook validado.
- Compatibilidad solo Claude Code nativa.
- Otros proveedores aparecen unsupported/equivalent si procede.
- Build pasa.
```

---

## Issue 5.2 — Claude Code Hook exporter

```text
/pbw-issue

Issue 5.2: Claude Code Hook exporter

Objetivo:
Generar fragmentos de configuración y archivos necesarios para hooks Claude Code.

Restricciones:
1. Mostrar advertencia fuerte de seguridad.
2. No ocultar comandos generados.
3. No generar comandos destructivos por defecto.
4. No introducir any.

Criterios de aceptación:
- Genera settings fragment.
- Genera archivo auxiliar si procede.
- Muestra warnings.
- Build pasa.
```

---

## Issue 5.3 — Revisión de seguridad de hooks

```text
/pbw-review

Issue 5.3: Revisión de seguridad de hooks

Objetivo:
Auditar hooks para evitar salidas peligrosas, ambiguas o engañosas.

Criterios de aceptación:
- Warnings visibles.
- No hay comandos destructivos por defecto.
- No se prometen hooks en proveedores sin soporte.
- Build/lint/test pasan.
- Fase 5 cerrable.
```

---

# Issues eliminadas o absorbidas del backlog anterior

| Issue anterior | Decisión | Motivo |
|---|---|---|
| 2.1 Home funcional + modo rápido/avanzado | Absorbida/reordenada | La landing debe ir antes que modo rápido, pero después de dominio/catalog/exporters |
| 2.2 Cards de perfiles y plantillas | Ampliada | Ahora incluye artifact/provider/profile/template |
| 2.3 Contexto guiado | Conservada | Pasa a Fase 2.5 tras selector artifact/provider |
| 2.4 Stepper navegable | Reformulada | Ya no se habla de stepper sino flujo guiado |
| 2.5 Reset no destructivo | Conservada | Sigue siendo útil |
| 2.6 Microcopy | Conservada | Adaptada al nuevo posicionamiento |
| 2.7 Accesibilidad | Conservada | Pasa a revisión UX conjunta |
| 3.1 Tracking | Pospuesta | Menos prioritaria que exportación/URLs/historial |
| 3.2 Historial | Conservada | Adaptada a artefactos generados |
| 3.3 Favoritos | Conservada | Adaptada a combinaciones |
| 3.4 Markdown | Subida de prioridad | Necesaria para exporters |
| 3.5 URLs | Subida de prioridad | Útil para compartir combinaciones |
| 3.6 Plantillas personalizadas | Pospuesta a Fase 4 | Afecta system/user y conviene tras artifacts |

---

# Tabla resumen final

| Fase | Issue | Título | Prioridad | Tipo |
|---|---:|---|---|---|
| 1.5 | 1.5.1 | Renombrar producto | P0 | Producto |
| 1.5 | 1.5.2 | Eliminar legacy Flow/PromptType | P0 | Arquitectura |
| 1.5 | 1.5.3 | Dominio Artifact/Provider/Compatibility | P0 | Dominio |
| 1.5 | 1.5.4 | Particionar catálogo TS | P0 | Arquitectura |
| 1.6 | 1.6.1 | Modelo catálogo/validación/normalización | P0 | Datos |
| 1.6 | 1.6.2 | JSON versionados | P0 | Datos |
| 1.6 | 1.6.3 | JsonCatalogRepository | P0 | Arquitectura |
| 1.6 | 1.6.4 | DatabaseCatalogRepository placeholder | P1 | Arquitectura futura |
| 1.6 | 1.6.5 | Limpieza catálogo | P0 | QA técnico |
| 1.7 | 1.7.1 | ArtifactExporter | P0 | Export |
| 1.7 | 1.7.2 | PromptExporter | P0 | Export |
| 1.7 | 1.7.3 | Exporters futuros placeholder | P1 | Preparación |
| 2 | 2.1 | Landing profesional | P1 | UX/Product |
| 2 | 2.2 | Selector artefacto/proveedor | P1 | UX/Core |
| 2 | 2.3 | Flujo guiado sin “pasos” | P1 | UX/Nav |
| 2 | 2.4 | Cards visuales | P1 | UX/UI |
| 2.5 | 2.5.1 | Modo rápido/avanzado | P1 | UX |
| 2.5 | 2.5.2 | Información guiada | P1 | UX/Core |
| 2.5 | 2.5.3 | Reset no destructivo | P1 | UX/State |
| 2.5 | 2.5.4 | Empty states y microcopy | P1 | UX Content |
| 2.5 | 2.5.5 | Accesibilidad y revisión UX | P1 | QA |
| 3 | 3.1 | Markdown/bundle simple | P2 | Export |
| 3 | 3.2 | URLs navegables | P2 | Navegación |
| 3 | 3.3 | Historial local | P2 | Retención |
| 3 | 3.4 | Favoritos | P2 | Retención |
| 3 | 3.5 | Tracking interno | P2 | Analytics |
| 4 | 4.1 | Project Instructions | P2 | Artefactos |
| 4 | 4.2 | Prompt Files / Agent Instructions | P2 | Artefactos |
| 4 | 4.3 | Claude Code Skill | P2 | Artefactos |
| 4 | 4.4 | Plantillas personalizadas | P3 | Producto |
| 5 | 5.1 | Modelo seguro Hook | P3 | Automatización |
| 5 | 5.2 | Claude Code Hook exporter | P3 | Automatización |
| 5 | 5.3 | Revisión seguridad hooks | P3 | QA Seguridad |

---

# Prompt maestro para Claude Code

```text
Eres un senior frontend engineer especializado en TypeScript strict, arquitectura limpia, React/DOM, catálogos desacoplados y refactors incrementales sin deuda técnica.

Contexto:
La aplicación actual empezó como Prompt Builder Wizard, pero debe evolucionar a “AI Prompt & Workflow Builder”.

Estado:
La Fase 1 está terminada:
- flujo Perfil → Plantilla;
- 8 perfiles;
- 37 plantillas;
- recomendaciones por plantilla;
- prompt dinámico;
- checklist actualizado;
- reset en cascada;
- build funcional.

Objetivo de producto:
La V1 seguirá generando prompts optimizados, pero la arquitectura debe quedar preparada para soportar:
- Prompt
- Skill
- Hook
- Project Instructions
- Scoped Instructions
- Prompt File
- Agent Instructions
- Workflow
- Checklist

Proveedores objetivo:
- ChatGPT
- Claude
- Claude Code / Claude CLI
- GitHub Copilot

Reglas de compatibilidad:
- No todos los proveedores tienen skills ni hooks.
- La app debe usar nombres funcionales comunes.
- La app debe mostrar equivalencias por proveedor.
- La app no debe simular soporte inexistente.

Arquitectura objetivo:
src/
  app/
  domain/
    artifacts/
    providers/
    catalog/
    exporters/
  data/
    catalog/
  infrastructure/
    catalog/
  types/
  utils/

Restricciones:
- Implementa solo la issue indicada.
- No mezcles issues.
- No reescribas la app.
- No migres a framework.
- No instales dependencias salvo justificación fuerte.
- Mantén TypeScript strict.
- No introduzcas any.
- No dejes código muerto.
- No dupliques estado.
- No consumas JSON crudo desde UI.
- No metas lógica de catálogo en renderer.
- No metas validación de catálogo en handlers.
- No generes features futuras como si estuvieran disponibles.
- Ejecuta npm run build.
- Ejecuta npm run lint si existe.
- Ejecuta npm run test si existe.

Antes de modificar:
1. Inspecciona estructura actual.
2. Localiza archivos relevantes.
3. Propón plan mínimo.
4. Aplica cambios incrementales.

Después de modificar:
1. Lista archivos creados/modificados/eliminados.
2. Explica decisiones técnicas.
3. Explica riesgos residuales.
4. Indica comandos ejecutados y resultado.
5. Da evidencia runtime si aplica.
6. Veredicto explícito:
   “Issue X.Y cerrable: sí/no”.
```

---

# Recomendación de ejecución

El camino con menos retrabajo es:

```text
1. Producto y dominio.
2. Catálogo desacoplado.
3. Exporters.
4. Landing y wizard.
5. UX avanzada.
6. Producto escalable.
7. Artefactos reutilizables.
8. Hooks.
```

No empezar por hooks.

No empezar por plantillas personalizadas.

No rediseñar la landing antes de tener ArtifactKind/Provider/Compatibility.

No crear UI de skills antes de tener exporters.

Lo contrario compila, queda bonito dos tardes y después toca hacer arqueología con pico, pala y vergüenza.
