# Backlog Fase 3 — Estabilización, catálogo canónico y producto escalable

**Estado de partida:** Fase 2 completada.  
**Aplicación:** AI Prompt & Workflow Builder.  
**Capacidad operativa actual:** generación de prompts optimizados.  
**Objetivo de la fase:** dejar el sistema estable, eliminar deuda técnica, conectar catálogo JSON real y después añadir capacidades escalables.

---

# Decisión estratégica

La antigua Fase 3 empezaba directamente con exportación, URLs, historial, favoritos y tracking.

Se reajusta porque antes hay que estabilizar la base:

```text
1. UI visible coherente.
2. Tema claro/oscuro funcional sin persistencia.
3. Botón Limpiar solo en wizard.
4. Copy no aplicable eliminado.
5. JSON útiles poblados y conectados.
6. Hardcodeos eliminados.
7. resolveBuilderOptions conectado de verdad.
8. Código muerto eliminado.
9. Tests automatizados al final.
10. Documentación y commit de cierre.
```

---

# Reglas específicas de Fase 3

```text
- Prompt sigue siendo la única capacidad operativa obligatoria.
- Skills/hooks/workflows no se exponen como funcionales.
- El botón Limpiar desaparece de home.
- El botón Limpiar debe reiniciar el wizard completo.
- El tema claro/oscuro funciona durante sesión sin localStorage.
- resolveBuilderOptions no puede quedar como sistema falso.
- Los JSON sin valor actual se eliminan al final del saneamiento de catálogo.
- La Skill /pbw-commit solo se usa en la última issue de la fase.
```

---

# Uso de Skills en Fase 3

```text
Issues de UI/código      → /pbw-issue
Issues de catálogo JSON  → /pbw-catalog
Issues de revisión       → /pbw-review
Última issue de la fase  → /pbw-commit
```

---

# Secuencia exacta

```text
3.1.1 → 3.1.2 → 3.1.3 → 3.1.4 → 3.1.5 → 3.1.6
3.2.1 → 3.2.2 → 3.2.3 → 3.2.4 → 3.2.5 → 3.2.6 → 3.2.7
3.3.1 → 3.3.2 → 3.3.3 → 3.3.4 → 3.3.5 → 3.3.6 → 3.3.7
3.4.1 → 3.4.2 → 3.4.3 → 3.4.4 → 3.4.5 → 3.4.6 → 3.4.7 → 3.4.8 → 3.4.9 → 3.4.10
3.5.1 → 3.5.2 → 3.5.3 → 3.5.4 → 3.5.5 → 3.5.6 → 3.5.7
```

---

# Fase 3.1 — Estabilización visible de home y wizard

## Objetivo

Corregir la experiencia visible actual antes de tocar catálogo profundo o nuevas features.

## Resultado esperado

```text
- Home sin acciones no aplicables.
- Botón Limpiar fuera de home.
- Botón Limpiar funcional en wizard.
- Tema claro/oscuro funcional durante sesión.
- Copy no aplicable eliminado.
- UI coherente con la capacidad real del producto.
```

---

## Issue 3.1.1 — Auditar acciones visibles de home y wizard

```text
/pbw-review

Issue 3.1.1: Auditar acciones visibles de home y wizard

Objetivo:
Inventariar todos los botones, CTAs, toggles, enlaces y bloques visibles para clasificar qué funciona, qué está roto, qué no aplica y qué debe tratarse en issues posteriores.

Contexto:
Se han detectado problemas en el botón de tema claro/oscuro, botón Limpiar en home y bloque “¿Listo para construir los mejores prompts?”. Antes de modificar, hay que localizar implementación real y handlers asociados.

Restricciones:
1. No implementar cambios funcionales.
2. No eliminar código salvo hallazgo trivial confirmado y documentado.
3. No rediseñar la landing.
4. No mezclar con corrección de tema.
5. No introducir any.

Tareas:
1. Inspeccionar home.
2. Inspeccionar wizard.
3. Listar botones y CTAs visibles.
4. Localizar handlers asociados.
5. Clasificar cada acción como:
   - funcional;
   - rota;
   - no aplicable;
   - duplicada;
   - pendiente de decisión.
6. Identificar específicamente:
   - botón Limpiar en home;
   - botón Limpiar en wizard;
   - toggle claro/oscuro;
   - bloque “¿Listo para construir los mejores prompts?”;
   - CTAs de entrada al builder;
   - acciones de exportación;
   - acciones de reset.
7. Ejecutar npm run build.
8. Ejecutar npm run lint si existe.

Criterios de aceptación:
- Existe inventario de acciones visibles.
- Cada acción tiene estado y ubicación.
- Quedan claras las issues derivadas.
- No se han mezclado cambios funcionales.
- Build pasa.

Salida esperada:
1. Tabla de acciones visibles.
2. Estado de cada acción.
3. Archivos implicados.
4. Issues derivadas.
5. Resultado build/lint.
6. Veredicto: “Issue 3.1.1 cerrable: sí/no”.
```

---

## Issue 3.1.2 — Corregir tema claro/oscuro sin persistencia

```text
/pbw-issue

Issue 3.1.2: Corregir tema claro/oscuro sin persistencia

Objetivo:
Hacer que el botón de tema claro/oscuro funcione durante la sesión sin persistir la preferencia en localStorage.

Contexto:
El botón existe, pero no funciona correctamente. La preferencia visual no debe persistirse todavía porque se quiere persistir lo mínimo posible.

Restricciones:
1. No usar localStorage.
2. No usar sessionStorage salvo justificación explícita.
3. No añadir dependencias.
4. No rediseñar paleta.
5. No crear sistema complejo de preferencias.
6. No mezclar con botón Limpiar.
7. No introducir any.

Tareas:
1. Localizar implementación actual del toggle.
2. Identificar si usa clase CSS, atributo data-theme o estado en memoria.
3. Corregir el cambio de tema.
4. Mantener estado durante la sesión de la SPA.
5. Asegurar que no se escribe en localStorage.
6. Actualizar aria-label o texto visible si aplica.
7. Verificar que home y wizard reflejan el cambio.
8. Ejecutar npm run build.
9. Ejecutar npm run lint si existe.

Criterios de aceptación:
- El botón cambia entre claro y oscuro.
- El cambio afecta a toda la aplicación.
- El estado dura mientras la SPA está cargada.
- Recargar puede volver al valor por defecto.
- No se escribe en localStorage.
- Build pasa.

Verificación manual:
1. Abrir home.
2. Pulsar toggle.
3. Confirmar cambio visual.
4. Entrar al wizard.
5. Confirmar que el tema sigue activo.
6. Pulsar de nuevo.
7. Confirmar reversión.
8. Revisar localStorage y confirmar que no se escribe tema.

Salida esperada:
1. Causa del fallo.
2. Archivos modificados.
3. Decisión de estado en memoria.
4. Verificación manual.
5. Resultado build/lint.
6. Veredicto: “Issue 3.1.2 cerrable: sí/no”.
```

---

## Issue 3.1.3 — Eliminar botón Limpiar de home

```text
/pbw-issue

Issue 3.1.3: Eliminar botón Limpiar de home

Objetivo:
Eliminar el botón Limpiar de la página principal porque en home no existe estado de proceso que limpiar.

Contexto:
Limpiar solo tiene sentido dentro del wizard, donde existe un proceso iniciado.

Restricciones:
1. No eliminar reset útil del wizard.
2. No tocar todavía la lógica interna del reset del wizard salvo si está acoplada al botón de home.
3. No cambiar tema.
4. No cambiar copy ajeno.
5. No introducir any.

Tareas:
1. Localizar botón Limpiar en home.
2. Eliminarlo del render de home.
3. Revisar handlers asociados.
4. Eliminar handlers huérfanos si quedan sin uso.
5. Revisar estilos asociados.
6. Eliminar estilos muertos confirmados.
7. Ejecutar npm run build.
8. Ejecutar npm run lint si existe.

Criterios de aceptación:
- Home no muestra botón Limpiar.
- No se elimina el reset del wizard.
- No quedan handlers huérfanos.
- No quedan estilos muertos evidentes.
- Build pasa.

Verificación manual:
1. Abrir home.
2. Confirmar que no aparece Limpiar.
3. Entrar al wizard.
4. Confirmar que la app carga sin errores.

Salida esperada:
1. Ubicación original del botón.
2. Archivos modificados.
3. Código eliminado.
4. Verificación manual.
5. Resultado build/lint.
6. Veredicto: “Issue 3.1.3 cerrable: sí/no”.
```

---

## Issue 3.1.4 — Asegurar botón Limpiar funcional en wizard

```text
/pbw-issue

Issue 3.1.4: Asegurar botón Limpiar funcional en wizard

Objetivo:
Mantener o reubicar el botón Limpiar dentro del wizard para reiniciar completamente el proceso.

Contexto:
El botón Limpiar sí tiene sentido dentro del wizard, pero debe reiniciar todo el flujo y no dejar estado residual.

Restricciones:
1. No volver a mostrar Limpiar en home.
2. No crear reset parcial ambiguo.
3. No afectar al tema.
4. No duplicar estado.
5. No introducir any.
6. No mezclar con copy de home.

Tareas:
1. Localizar reset actual del wizard.
2. Verificar qué estado limpia.
3. Asegurar que limpia:
   - artifact;
   - provider;
   - profile;
   - template;
   - context fields;
   - additional context;
   - constraints;
   - outputs;
   - generated prompt;
   - reviewRequired;
   - errores visibles si existen.
4. Confirmar que no limpia tema.
5. Añadir confirmación solo si ya existe patrón de confirmación o si la acción puede ser destructiva para texto del usuario.
6. Ejecutar npm run build.
7. Ejecutar npm run lint si existe.

Criterios de aceptación:
- Wizard muestra Limpiar donde tiene sentido.
- Limpiar reinicia todo el proceso.
- No cambia el tema.
- No deja prompt generado stale.
- Build pasa.

Verificación manual:
1. Entrar al wizard.
2. Seleccionar artefacto, proveedor, perfil y plantilla.
3. Escribir contexto.
4. Seleccionar restricciones y formato.
5. Generar prompt.
6. Pulsar Limpiar.
7. Confirmar estado inicial del wizard.
8. Confirmar que el tema no cambia.

Salida esperada:
1. Estado limpiado.
2. Archivos modificados.
3. Riesgos residuales.
4. Verificación manual.
5. Resultado build/lint.
6. Veredicto: “Issue 3.1.4 cerrable: sí/no”.
```

---

## Issue 3.1.5 — Eliminar bloque no aplicable de home

```text
/pbw-issue

Issue 3.1.5: Eliminar bloque “¿Listo para construir los mejores prompts?”

Objetivo:
Eliminar el bloque “¿Listo para construir los mejores prompts?” si no aplica al producto actual.

Contexto:
La home debe comunicar capacidades reales. No debe conservar bloques de marketing genérico que no encajan con AI Prompt & Workflow Builder.

Restricciones:
1. No rediseñar toda la home.
2. No sustituirlo por marketing inventado.
3. No prometer skills/hooks/workflows como disponibles.
4. No cambiar lógica del wizard.
5. No introducir any.

Tareas:
1. Localizar bloque.
2. Eliminar render del bloque.
3. Revisar estilos asociados.
4. Eliminar estilos muertos confirmados.
5. Revisar handlers asociados si existieran.
6. Ejecutar npm run build.
7. Ejecutar npm run lint si existe.

Criterios de aceptación:
- El bloque no aparece.
- Home no queda rota.
- No quedan estilos muertos evidentes.
- No se añaden promesas falsas.
- Build pasa.

Verificación manual:
1. Abrir home.
2. Confirmar que el bloque no aparece.
3. Confirmar que los CTAs restantes tienen sentido.
4. Confirmar que no hay errores de consola.

Salida esperada:
1. Texto eliminado.
2. Archivos modificados.
3. Estilos eliminados o conservados con justificación.
4. Verificación manual.
5. Resultado build/lint.
6. Veredicto: “Issue 3.1.5 cerrable: sí/no”.
```

---

## Issue 3.1.6 — Revisar copy funcional mínimo

```text
/pbw-issue

Issue 3.1.6: Revisar copy funcional mínimo de home y wizard

Objetivo:
Asegurar que los textos visibles describen lo que la aplicación hace ahora, sin inventar funcionalidades futuras.

Contexto:
La V1 genera prompts optimizados. La arquitectura puede preparar otros artefactos, pero eso no debe mostrarse como disponible si todavía no lo está.

Restricciones:
1. No inventar funcionalidades.
2. No añadir proveedores nuevos.
3. No prometer soporte inexistente.
4. No rediseñar UI.
5. No cambiar lógica de generación.
6. No introducir any.

Tareas:
1. Revisar textos visibles de home.
2. Revisar textos visibles del wizard.
3. Detectar términos legacy.
4. Detectar promesas no implementadas.
5. Corregir copy mínimo.
6. Marcar futuras capacidades como futuras solo si se muestran.
7. Ejecutar npm run build.
8. Ejecutar npm run lint si existe.

Criterios de aceptación:
- La app no promete features no disponibles.
- Prompt aparece como capacidad operativa.
- Skills/hooks/workflows no aparecen como funcionales.
- No hay términos legacy visibles.
- Build pasa.

Verificación manual:
1. Abrir home.
2. Leer CTAs y secciones.
3. Entrar al wizard.
4. Confirmar que el copy coincide con el flujo real.

Salida esperada:
1. Textos modificados.
2. Textos eliminados.
3. Promesas falsas eliminadas.
4. Resultado build/lint.
5. Veredicto: “Fase 3.1 cerrable: sí/no”.
```

---

# Fase 3.2 — Catálogo JSON canónico y eliminación de hardcodeos

## Objetivo

Convertir los JSON útiles en fuente real de datos, eliminar hardcodeos y borrar JSON sin valor actual.

## Resultado esperado

```text
- JSON canónicos definidos.
- Datos hardcodeados migrados a JSON.
- JsonCatalogRepository consume datos reales.
- UI sin imports directos a JSON.
- resolveBuilderOptions conectado con reglas reales.
- JSON sin valor actual eliminados.
```

---

## Issue 3.2.1 — Inventariar JSON y hardcodeos actuales

```text
/pbw-catalog

Issue 3.2.1: Inventariar JSON y hardcodeos actuales

Objetivo:
Auditar todos los JSON de src/data/catalog y todos los datos equivalentes hardcodeados en TypeScript.

Contexto:
Los JSON no deben conservarse como decoración. Si sustituyen hardcodeos actuales, se pueblan y conectan. Si no aportan valor actual, se eliminan.

Restricciones:
1. No eliminar JSON en esta issue.
2. No poblar JSON todavía salvo corrección trivial.
3. No cambiar runtime.
4. No introducir any.
5. No consumir JSON desde UI.

Tareas:
1. Listar todos los JSON bajo src/data/catalog.
2. Para cada JSON indicar:
   - ruta;
   - schemaVersion;
   - número de items;
   - si está importado;
   - quién lo usa;
   - si duplica datos TS;
   - si sustituye un hardcodeo;
   - si aporta valor actual;
   - decisión propuesta.
3. Buscar hardcodeos de:
   - artifact kinds;
   - providers;
   - provider capabilities;
   - provider equivalents;
   - compatibility;
   - constraints;
   - outputs;
   - context fields;
   - rules;
   - exporters.
4. Definir lista de JSON canónicos.
5. Definir lista de JSON a eliminar.
6. Definir orden de migración.
7. Ejecutar npm run build.
8. Ejecutar npm run lint si existe.

Criterios de aceptación:
- Inventario completo.
- Hardcodeos localizados.
- JSON canónicos identificados.
- JSON eliminables identificados.
- No se han mezclado cambios de runtime.
- Build pasa.

Salida esperada:
1. Tabla de JSON.
2. Tabla de hardcodeos.
3. JSON canónicos.
4. JSON eliminables.
5. Plan de migración.
6. Resultado build/lint.
7. Veredicto: “Issue 3.2.1 cerrable: sí/no”.
```

---

## Issue 3.2.2 — Poblar artefactos y proveedores desde JSON

```text
/pbw-catalog

Issue 3.2.2: Poblar artifact-kinds, providers, capabilities y equivalents

Objetivo:
Mover datos de artefactos, proveedores, capacidades y equivalencias desde TypeScript hardcodeado a JSON canónico.

Contexto:
El catálogo debe ser la fuente de verdad. No debe haber datos duplicados entre TypeScript y JSON.

Restricciones:
1. No habilitar nuevas features visibles.
2. No inventar compatibilidad.
3. No añadir proveedores nuevos.
4. No consumir JSON desde UI.
5. No introducir any.
6. No mantener duplicidad activa.

JSON objetivo:
- src/data/catalog/artifact-kinds.json
- src/data/catalog/providers.json
- src/data/catalog/provider-capabilities.json
- src/data/catalog/provider-equivalents.json

Tareas:
1. Revisar tipos actuales de artefactos y proveedores.
2. Poblar artifact-kinds.json.
3. Poblar providers.json.
4. Poblar provider-capabilities.json.
5. Poblar provider-equivalents.json.
6. Conectar JsonCatalogRepository.
7. Validar ids vacíos y duplicados.
8. Validar referencias cruzadas.
9. Eliminar hardcodeos sustituidos.
10. Ejecutar npm run build.
11. Ejecutar npm run lint si existe.

Criterios de aceptación:
- Los JSON contienen datos reales.
- JsonCatalogRepository los consume.
- No hay duplicidad activa TS/JSON.
- La UI no importa JSON.
- No se habilitan features futuras.
- Build pasa.

Salida esperada:
1. JSON poblados.
2. Hardcodeos eliminados.
3. Validaciones aplicadas.
4. Archivos modificados.
5. Resultado build/lint.
6. Veredicto: “Issue 3.2.2 cerrable: sí/no”.
```

---

## Issue 3.2.3 — Poblar compatibilidad artifact-provider

```text
/pbw-catalog

Issue 3.2.3: Poblar compatibilidad artifact-provider desde JSON

Objetivo:
Convertir artifact-provider-compatibility.json en fuente canónica de compatibilidad.

Contexto:
La compatibilidad no debe vivir hardcodeada en renderer, repositorio inline o matrices TypeScript duplicadas.

Restricciones:
1. No inventar soporte.
2. No perder supportLevel.
3. No perder equivalencias útiles.
4. No habilitar artefactos no implementados.
5. No introducir any.
6. No consumir JSON desde UI.

JSON objetivo:
- src/data/catalog/artifact-provider-compatibility.json

Tareas:
1. Localizar todas las fuentes de compatibilidad.
2. Comparar contenido.
3. Definir formato final del JSON.
4. Poblar entries necesarias.
5. Incluir providerId.
6. Incluir artifactKindId.
7. Incluir supportLevel.
8. Incluir equivalentArtifactId o notes si aplica.
9. Conectar JsonCatalogRepository.
10. Eliminar hardcodeos sustituidos.
11. Ejecutar validación runtime.
12. Ejecutar npm run build.
13. Ejecutar npm run lint si existe.

Criterios de aceptación:
- Compatibilidad vive en JSON canónico.
- No hay matriz duplicada activa.
- UI obtiene compatibilidad desde catálogo normalizado.
- No se finge soporte inexistente.
- Build pasa.

Salida esperada:
1. Fuentes anteriores.
2. JSON final.
3. Hardcodeos eliminados.
4. Validaciones.
5. Resultado build/lint.
6. Veredicto: “Issue 3.2.3 cerrable: sí/no”.
```

---

## Issue 3.2.4 — Unificar constraints, outputs y context fields

```text
/pbw-catalog

Issue 3.2.4: Unificar constraints, outputs y context fields

Objetivo:
Dejar una única fuente de verdad para restricciones, formatos de salida y campos de contexto.

Contexto:
Existen rutas potencialmente duplicadas entre definitions, contexts, constraints y outputs. Hay que conservar solo lo útil para el estado actual.

Restricciones:
1. No eliminar datos sin comparar.
2. No cambiar ids salvo bug real.
3. No cambiar comportamiento visible salvo corrección justificada.
4. No introducir any.
5. No meter lógica de catálogo en renderer.

JSON candidatos:
- src/data/catalog/definitions/constraints.json
- src/data/catalog/definitions/output-formats.json
- src/data/catalog/definitions/context-fields.json
- src/data/catalog/contexts/context-fields.json
- src/data/catalog/contexts/context-presets.json
- src/data/catalog/constraints/global-constraints.json
- src/data/catalog/constraints/provider-constraints.json
- src/data/catalog/constraints/artifact-constraints.json
- src/data/catalog/outputs/provider-output-formats.json

Tareas:
1. Comparar contenido de JSON activos y huérfanos.
2. Decidir rutas canónicas.
3. Poblar rutas canónicas.
4. Migrar datos sin pérdida.
5. Eliminar duplicados sin valor actual.
6. Conectar JsonCatalogRepository.
7. Validar referencias contra templates, providers y artifacts.
8. Ejecutar npm run build.
9. Ejecutar npm run lint si existe.

Criterios de aceptación:
- Una fuente de verdad para constraints.
- Una fuente de verdad para outputs.
- Una fuente de verdad para context fields.
- JSON duplicados sin valor eliminados.
- Build pasa.

Salida esperada:
1. Comparativa de JSON.
2. Decisión de rutas canónicas.
3. Datos migrados.
4. JSON eliminados con justificación.
5. Resultado build/lint.
6. Veredicto: “Issue 3.2.4 cerrable: sí/no”.
```

---

## Issue 3.2.5 — Conectar resolveBuilderOptions con reglas JSON

```text
/pbw-catalog

Issue 3.2.5: Conectar resolveBuilderOptions con reglas JSON

Objetivo:
Hacer que resolveBuilderOptions tenga efecto real usando reglas cargadas desde JSON.

Contexto:
El sistema existe, pero no debe permanecer como maquinaria inútil. Debe consumir reglas reales o no existir.

Restricciones:
1. No hardcodear reglas en TypeScript.
2. No resolver reglas en renderer.
3. No inventar reglas sin base en datos actuales.
4. No cambiar UX salvo resultado de reglas reales.
5. No introducir any.
6. No duplicar recomendaciones existentes.

JSON objetivo:
- src/data/catalog/rules/constraint-rules.json
- src/data/catalog/rules/context-field-rules.json
- src/data/catalog/rules/output-format-rules.json

Tareas:
1. Revisar resolveBuilderOptions.
2. Revisar rule-matching.
3. Revisar rule-specificity.
4. Definir contrato final de reglas.
5. Poblar reglas derivadas de recomendaciones actuales.
6. Conectar repositorio de builder-options.
7. Validar ids referenciados.
8. Asegurar fallback si no hay reglas aplicables.
9. Confirmar efecto runtime.
10. Ejecutar npm run build.
11. Ejecutar npm run lint si existe.

Criterios de aceptación:
- resolveBuilderOptions no usa allRules hardcodeado vacío.
- Las reglas vienen de JSON.
- El builder consume opciones resueltas.
- Cambiar perfil/plantilla puede cambiar opciones si hay reglas.
- Fallback seguro si no hay reglas.
- Build pasa.

Verificación manual:
1. Abrir wizard.
2. Seleccionar perfil/plantilla con reglas.
3. Confirmar restricciones/outputs/context fields esperados.
4. Cambiar selección.
5. Confirmar resolución distinta si aplica.

Salida esperada:
1. Contrato de reglas.
2. JSON poblados.
3. Conexión implementada.
4. Evidencia runtime.
5. Resultado build/lint.
6. Veredicto: “Issue 3.2.5 cerrable: sí/no”.
```

---

## Issue 3.2.6 — Eliminar JSON sin valor actual

```text
/pbw-catalog

Issue 3.2.6: Eliminar JSON sin valor actual

Objetivo:
Eliminar JSON que no aportan valor al estado actual tras poblar y conectar los catálogos necesarios.

Contexto:
No se quieren placeholders inútiles. Si más adelante hacen falta, se crearán entonces.

Restricciones:
1. No eliminar JSON activo.
2. No eliminar JSON que sustituye hardcodeos actuales.
3. No eliminar JSON con datos necesarios.
4. No dejar imports rotos.
5. No introducir any.
6. No mezclar con features nuevas.

Tareas:
1. Partir del inventario de 3.2.1.
2. Confirmar qué JSON ya están conectados.
3. Confirmar qué JSON no tienen valor actual.
4. Eliminar JSON sin valor.
5. Eliminar imports o referencias muertas.
6. Revisar documentación si menciona rutas eliminadas.
7. Ejecutar npm run build.
8. Ejecutar npm run lint si existe.

Criterios de aceptación:
- Solo permanecen JSON con valor actual.
- No quedan JSON decorativos.
- No quedan imports rotos.
- No queda documentación falsa.
- Build pasa.

Salida esperada:
1. JSON eliminados.
2. Motivo por JSON.
3. JSON conservados.
4. Resultado build/lint.
5. Veredicto: “Issue 3.2.6 cerrable: sí/no”.
```

---

## Issue 3.2.7 — Revisión de catálogo canónico

```text
/pbw-review

Issue 3.2.7: Revisión de catálogo canónico

Objetivo:
Auditar que el catálogo queda estable, sin hardcodeos sustituidos pendientes, sin JSON decorativos y sin duplicidad TS/JSON.

Restricciones:
1. No implementar features nuevas.
2. No cambiar UI.
3. No introducir dependencias.
4. No introducir any.
5. No ocultar deuda residual.

Auditoría:
- JSON canónicos.
- Imports directos a JSON.
- Compatibilidad duplicada.
- Hardcodeos de providers/artifacts/compatibility.
- Hardcodeos de constraints/outputs/context fields.
- Rules conectadas.
- Referencias rotas.
- JSON vacíos sin valor.

Tareas:
1. Ejecutar búsquedas de imports JSON.
2. Ejecutar búsquedas de hardcodeos conocidos.
3. Verificar repositorios.
4. Verificar validación/normalización.
5. Ejecutar npm run build.
6. Ejecutar npm run lint si existe.

Criterios de aceptación:
- Catálogo estable.
- JSON útiles conectados.
- JSON sin valor eliminados.
- Sin hardcodeos sustituidos pendientes.
- Build pasa.

Salida esperada:
1. Hallazgos.
2. Problemas encontrados.
3. Fixes mínimos sugeridos.
4. Resultado build/lint.
5. Veredicto: “Fase 3.2 cerrable: sí/no”.
```

---

# Fase 3.3 — Saneamiento técnico obligatorio

## Objetivo

Eliminar deuda técnica que bloquea desarrollo seguro.

## Resultado esperado

```text
- PromptBuilder sin deuda transicional.
- PromptExporter con contrato claro.
- PromptValidator conectado o eliminado.
- Compatibilidad unificada.
- reviewRequired mutado explícitamente.
- Código muerto eliminado.
```

---

## Issue 3.3.1 — Resolver deuda transicional de PromptBuilder

```text
/pbw-issue

Issue 3.3.1: Resolver deuda transicional de PromptBuilder

Objetivo:
Eliminar dependencias temporales de PromptBuilder hacia catálogos antiguos o datos que deben venir de CatalogIndex/BuilderScreenModel.

Contexto:
PromptBuilder no debe depender de catálogos legacy ni formatear datos de presentación si esa responsabilidad pertenece al modelo de pantalla.

Restricciones:
1. No cambiar comportamiento visible.
2. No cambiar generación de prompt salvo bug real.
3. No importar JSON desde PromptBuilder.
4. No meter lógica de presentación en servicios.
5. No introducir any.
6. No mezclar con exporters.

Tareas:
1. Buscar TEMPORARY/TRANSITIONAL.
2. Buscar imports a catálogos legacy.
3. Revisar getTemplateLabel.
4. Revisar getPromptTemplateData.
5. Revisar getAllowedTemplates.
6. Migrar responsabilidades a CatalogIndex o BuilderScreenModel.
7. Eliminar imports legacy.
8. Verificar flujo Perfil → Plantilla → Prompt.
9. Ejecutar npm run build.
10. Ejecutar npm run lint si existe.

Criterios de aceptación:
- PromptBuilder no depende de catálogos legacy.
- No quedan comentarios transicionales asociados.
- Las plantillas se filtran correctamente.
- Labels se muestran correctamente.
- Build pasa.

Salida esperada:
1. Métodos migrados.
2. Nueva ubicación de responsabilidades.
3. Imports eliminados.
4. Validación manual.
5. Resultado build/lint.
6. Veredicto: “Issue 3.3.1 cerrable: sí/no”.
```

---

## Issue 3.3.2 — Cerrar contrato de PromptExporter

```text
/pbw-issue

Issue 3.3.2: Cerrar contrato real de PromptExporter

Objetivo:
Eliminar ambigüedad entre buildPrompt, export, ArtifactExporter y salidas futuras.

Contexto:
La generación actual funciona, pero existen métodos no conectados o parcialmente muertos.

Restricciones:
1. No implementar Markdown todavía.
2. No implementar bundles todavía.
3. No cambiar semántica del prompt generado.
4. No romper copy/download.
5. No dejar métodos públicos inútiles.
6. No introducir any.

Tareas:
1. Revisar PromptExporter.
2. Revisar ArtifactExporter.
3. Revisar llamadas reales.
4. Decidir:
   - conectar export;
   - eliminar export;
   - renombrar métodos.
5. Eliminar parsePromptData si no aporta.
6. Mantener buildPrompt si es operativo.
7. Ejecutar npm run build.
8. Ejecutar npm run lint si existe.

Criterios de aceptación:
- PromptExporter no tiene métodos muertos ambiguos.
- El contrato de generación queda claro.
- Prompt actual sigue generándose.
- Copy/download siguen funcionando.
- Build pasa.

Salida esperada:
1. Estrategia elegida.
2. Métodos eliminados o conectados.
3. Archivos modificados.
4. Riesgos residuales.
5. Resultado build/lint.
6. Veredicto: “Issue 3.3.2 cerrable: sí/no”.
```

---

## Issue 3.3.3 — Conectar o eliminar PromptValidator y Prompt DTO

```text
/pbw-issue

Issue 3.3.3: Resolver PromptValidator y models/Prompt.ts

Objetivo:
Eliminar validadores o DTOs que no aporten valor real.

Contexto:
El proyecto debe quedar mantenible y sin código basura. Si PromptValidator duplica lógica o no participa en runtime, se elimina.

Restricciones:
1. No añadir tests todavía.
2. No cambiar reglas de calidad salvo bug real.
3. No conservar clases sin uso.
4. No eliminar código con uso runtime real.
5. No introducir any.

Tareas:
1. Buscar usos de PromptValidator.
2. Buscar usos de models/Prompt.ts.
3. Comparar con getQualityChecks o lógica equivalente.
4. Si aporta valor:
   - conectarlo;
   - eliminar duplicación.
5. Si no aporta valor:
   - eliminar PromptValidator;
   - eliminar Prompt DTO;
   - eliminar exports muertos.
6. Ejecutar npm run build.
7. Ejecutar npm run lint si existe.

Criterios de aceptación:
- Hay una sola lógica de validación/calidad.
- No quedan DTOs desconectados.
- No quedan validators muertos.
- Build pasa.

Salida esperada:
1. Usos encontrados.
2. Decisión aplicada.
3. Código conectado o eliminado.
4. Riesgos residuales.
5. Resultado build/lint.
6. Veredicto: “Issue 3.3.3 cerrable: sí/no”.
```

---

## Issue 3.3.4 — Corregir reviewRequired

```text
/pbw-issue

Issue 3.3.4: Corregir mutación frágil de reviewRequired

Objetivo:
Evitar que handlers muten estado interno por efecto colateral de shallow copy.

Contexto:
reviewRequired debe cambiarse mediante API explícita de PromptBuilder.

Restricciones:
1. No cambiar flujo funcional.
2. No duplicar estado.
3. No reestructurar toda la app.
4. No mezclar con reset no destructivo.
5. No introducir any.

Tareas:
1. Localizar mutaciones directas de reviewRequired.
2. Crear método explícito:
   - setReviewRequired(scope, value)
   - o equivalente tipado.
3. Sustituir mutaciones directas.
4. Revisar getState para evitar fuga de referencias si procede.
5. Ejecutar npm run build.
6. Ejecutar npm run lint si existe.

Criterios de aceptación:
- handlers no mutan reviewRequired directamente.
- PromptBuilder expone API explícita.
- Comportamiento visual se mantiene.
- Build pasa.

Salida esperada:
1. Mutaciones encontradas.
2. API añadida.
3. Archivos modificados.
4. Resultado build/lint.
5. Veredicto: “Issue 3.3.4 cerrable: sí/no”.
```

---

## Issue 3.3.5 — Resolver placeholders de infraestructura

```text
/pbw-issue

Issue 3.3.5: Resolver placeholders de infraestructura sin valor actual

Objetivo:
Revisar placeholders como DatabaseCatalogRepository, factory setType u otros elementos que solo existan para una futura BBDD/API y decidir si se conservan con valor actual o se eliminan.

Contexto:
El proyecto debe ser escalable, pero no debe conservar código basura. Una abstracción futura solo se conserva si aporta contrato real y no confunde el runtime.

Restricciones:
1. No implementar backend.
2. No conectar API real.
3. No añadir dependencias.
4. No dejar placeholders ambiguos.
5. No introducir any.
6. No mezclar con JSON de catálogo.

Tareas:
1. Localizar DatabaseCatalogRepository.
2. Localizar CatalogRepositoryFactory.setType o equivalentes.
3. Revisar si se usan en runtime.
4. Clasificar cada elemento:
   - conservar con contrato explícito;
   - eliminar;
   - mover a documentación futura.
5. Eliminar código sin valor actual.
6. Ajustar imports/exports.
7. Ejecutar npm run build.
8. Ejecutar npm run lint si existe.

Criterios de aceptación:
- No quedan placeholders ambiguos.
- No queda código futuro sin valor actual.
- El runtime sigue usando JsonCatalogRepository.
- Build pasa.

Salida esperada:
1. Placeholders encontrados.
2. Decisión por elemento.
3. Código eliminado o conservado.
4. Resultado build/lint.
5. Veredicto: “Issue 3.3.5 cerrable: sí/no”.
```

---

## Issue 3.3.6 — Revisar FutureExporters y exports muertos

```text
/pbw-issue

Issue 3.3.6: Revisar FutureExporters y exports muertos

Objetivo:
Eliminar o justificar placeholders de exporters futuros y exports muertos que no tengan uso real.

Contexto:
Los exporters futuros no deben simular funcionalidad ni conservarse como decoración. Si no aportan contrato real actual, se eliminan.

Restricciones:
1. No implementar exporters futuros.
2. No exponer botones activos.
3. No simular funcionalidad.
4. No conservar placeholders ambiguos.
5. No introducir any.

Tareas:
1. Localizar FutureExporters.
2. Revisar exports públicos.
3. Revisar instancias runtime.
4. Clasificar cada exporter:
   - mantener con contrato claro;
   - eliminar;
   - mover a issue futura documentada.
5. Eliminar código sin valor actual.
6. Ejecutar npm run build.
7. Ejecutar npm run lint si existe.

Criterios de aceptación:
- No hay placeholders ambiguos.
- No se exponen funcionalidades futuras falsas.
- El código conservado tiene propósito claro.
- Build pasa.

Salida esperada:
1. Exporters revisados.
2. Exporters eliminados o conservados.
3. Justificación.
4. Resultado build/lint.
5. Veredicto: “Issue 3.3.6 cerrable: sí/no”.
```

---

## Issue 3.3.7 — Revisión final de saneamiento técnico

```text
/pbw-review

Issue 3.3.7: Revisión final de saneamiento técnico

Objetivo:
Auditar la base tras resolver catálogo, PromptBuilder, exporters, validators, placeholders y estado.

Restricciones:
1. No implementar features.
2. No hacer refactors grandes.
3. No instalar dependencias.
4. No introducir any.
5. No ocultar deuda residual.

Auditoría:
- Imports muertos.
- Exports muertos.
- JSON sin valor.
- Hardcodeos sustituidos por JSON.
- Código transicional.
- Placeholders ambiguos.
- Duplicidad de compatibilidad.
- Duplicidad de validación.
- Mutaciones frágiles de estado.
- UI consumiendo JSON crudo.

Tareas:
1. Ejecutar búsquedas relevantes.
2. Revisar estructura de catálogo.
3. Revisar PromptBuilder.
4. Revisar exporters.
5. Revisar handlers.
6. Revisar renderer.
7. Ejecutar npm run build.
8. Ejecutar npm run lint si existe.

Criterios de aceptación:
- No queda deuda bloqueante.
- Deuda residual documentada.
- Build pasa.
- Fase 3.3 cerrable.

Salida esperada:
1. Hallazgos.
2. Código eliminado.
3. Código conservado con justificación.
4. Deuda residual.
5. Resultado build/lint.
6. Veredicto: “Fase 3.3 cerrable: sí/no”.
```

---

# Fase 3.4 — Producto escalable

## Objetivo

Añadir capacidades útiles una vez saneada la base.

## Resultado esperado

```text
- Exportación Markdown.
- Preparación para bundles simples.
- URLs navegables.
- Historial local.
- Favoritos.
- Tracking interno sin servicios externos.
```

---

## Issue 3.4.1 — Exportación Markdown

```text
/pbw-issue

Issue 3.4.1: Exportación Markdown

Objetivo:
Añadir exportación Markdown manteniendo TXT operativo.

Contexto:
PromptExporter y el contrato de exportación ya deben estar saneados antes de esta issue.

Restricciones:
1. No implementar ZIP.
2. No implementar bundles multiarchivo todavía.
3. No romper TXT.
4. No implementar exporters futuros.
5. No introducir any.

Tareas:
1. Revisar contrato de exportación.
2. Añadir formato Markdown.
3. Mantener TXT existente.
4. Adaptar UI mínima de exportación.
5. Ejecutar npm run build.
6. Ejecutar npm run lint si existe.

Criterios de aceptación:
- TXT sigue funcionando.
- Markdown funciona.
- Se puede copiar o descargar Markdown.
- Build pasa.

Verificación manual:
1. Generar prompt.
2. Descargar TXT.
3. Descargar Markdown.
4. Copiar salida.
5. Confirmar contenido correcto.

Salida esperada:
1. Formatos soportados.
2. Archivos modificados.
3. Verificación manual.
4. Resultado build/lint.
5. Veredicto: “Issue 3.4.1 cerrable: sí/no”.
```

---

## Issue 3.4.2 — Preparar bundle simple sin ZIP

```text
/pbw-issue

Issue 3.4.2: Preparar bundle simple sin ZIP

Objetivo:
Preparar la estructura de salida para futuras salidas multiarchivo sin implementar ZIP.

Contexto:
Los artefactos futuros pueden generar varios archivos. La base debe estar preparada sin añadir complejidad innecesaria.

Restricciones:
1. No implementar ZIP.
2. No añadir dependencias.
3. No implementar exporters futuros.
4. No romper TXT/Markdown.
5. No introducir any.

Tareas:
1. Revisar ArtifactExportResult.
2. Asegurar soporte para files opcionales.
3. Asegurar soporte para copyText.
4. Asegurar soporte para warnings.
5. Adaptar UI solo si es necesario.
6. Ejecutar npm run build.
7. Ejecutar npm run lint si existe.

Criterios de aceptación:
- ArtifactExportResult soporta salida simple y files.
- TXT/Markdown siguen funcionando.
- No se implementa ZIP.
- Build pasa.

Salida esperada:
1. Modelo final.
2. Archivos modificados.
3. Riesgos residuales.
4. Resultado build/lint.
5. Veredicto: “Issue 3.4.2 cerrable: sí/no”.
```

---

## Issue 3.4.3 — Parser de URLs navegables

```text
/pbw-issue

Issue 3.4.3: Parser de URLs navegables por query params

Objetivo:
Crear parser tipado para abrir el wizard con decisiones preseleccionadas desde query params.

Formato objetivo:
- ?artifact=prompt
- ?artifact=prompt&provider=claude_code
- ?artifact=prompt&provider=github_copilot&profile=developer&template=debug

Restricciones:
1. No introducir router.
2. Validar ids contra catálogo.
3. Ignorar params inválidos.
4. No guardar texto sensible en URL.
5. No introducir any.
6. No aplicar todavía sincronización bidireccional si no es necesaria.

Tareas:
1. Crear parser tipado.
2. Validar artifact.
3. Validar provider.
4. Validar profile.
5. Validar template.
6. Ignorar params inválidos.
7. Añadir fallback seguro.
8. Ejecutar npm run build.
9. Ejecutar npm run lint si existe.

Criterios de aceptación:
- Params válidos se interpretan correctamente.
- Params inválidos se ignoran.
- No se guarda contexto en URL.
- No se introduce router.
- Build pasa.

Salida esperada:
1. Parser creado.
2. Validaciones.
3. Casos manuales.
4. Resultado build/lint.
5. Veredicto: “Issue 3.4.3 cerrable: sí/no”.
```

---

## Issue 3.4.4 — Aplicar URLs navegables al wizard

```text
/pbw-issue

Issue 3.4.4: Aplicar URLs navegables al wizard

Objetivo:
Usar el parser de query params para inicializar el wizard con decisiones válidas.

Restricciones:
1. No introducir router.
2. No guardar contexto sensible en URL.
3. No romper estado inicial sin params.
4. No introducir any.
5. No mezclar con sincronización bidireccional avanzada.

Tareas:
1. Leer query params al cargar la app.
2. Validar contra catálogo normalizado.
3. Aplicar selección inicial si es válida.
4. Ignorar selección inválida sin romper app.
5. Asegurar cascadas correctas entre artifact/provider/profile/template.
6. Ejecutar npm run build.
7. Ejecutar npm run lint si existe.

Criterios de aceptación:
- URL válida preselecciona decisiones.
- URL inválida no rompe.
- Estado inicial sin URL funciona igual que antes.
- Build pasa.

Verificación manual:
1. Abrir URL con params válidos.
2. Confirmar selección.
3. Abrir URL con params inválidos.
4. Confirmar fallback seguro.
5. Confirmar que no hay errores de consola.

Salida esperada:
1. Integración realizada.
2. Casos manuales.
3. Resultado build/lint.
4. Veredicto: “Issue 3.4.4 cerrable: sí/no”.
```

---

## Issue 3.4.5 — Servicio de historial local

```text
/pbw-issue

Issue 3.4.5: Crear servicio de historial local

Objetivo:
Crear un servicio encapsulado para guardar localmente los últimos artefactos generados.

Contexto:
Esta persistencia sí está aprobada porque forma parte de una feature explícita. Debe minimizar datos sensibles.

Restricciones:
1. localStorage solo vía servicio.
2. No guardar contexto sensible innecesario.
3. Definir límite de entradas.
4. No mezclar con favoritos.
5. No sincronizar con backend.
6. No introducir any.

Tareas:
1. Crear LocalHistoryRepository.
2. Definir HistoryItem.
3. Definir límite de entradas.
4. Guardar metadata mínima.
5. Decidir si se guarda salida generada.
6. Validar ids contra catálogo al restaurar.
7. Ignorar entradas inválidas.
8. Ejecutar npm run build.
9. Ejecutar npm run lint si existe.

Criterios de aceptación:
- Historial encapsulado.
- Hay límite de entradas.
- Entradas inválidas se ignoran.
- No se guarda información innecesaria.
- Build pasa.

Salida esperada:
1. Modelo de historial.
2. Límite definido.
3. Servicio creado.
4. Resultado build/lint.
5. Veredicto: “Issue 3.4.5 cerrable: sí/no”.
```

---

## Issue 3.4.6 — UI de historial local

```text
/pbw-issue

Issue 3.4.6: UI de historial local

Objetivo:
Permitir ver, restaurar y borrar entradas del historial local.

Restricciones:
1. Usar LocalHistoryRepository.
2. No acceder directamente a localStorage desde UI.
3. No mezclar con favoritos.
4. No guardar texto sensible adicional.
5. No introducir any.

Tareas:
1. Añadir UI mínima de historial.
2. Mostrar metadata suficiente.
3. Permitir restaurar entrada válida.
4. Permitir borrar una entrada.
5. Permitir borrar historial completo.
6. Ignorar entradas inválidas.
7. Ejecutar npm run build.
8. Ejecutar npm run lint si existe.

Criterios de aceptación:
- Historial visible.
- Restaurar funciona si ids son válidos.
- Borrar entrada funciona.
- Borrar historial funciona.
- Build pasa.

Verificación manual:
1. Generar prompt.
2. Confirmar entrada en historial.
3. Restaurar entrada.
4. Borrar entrada.
5. Borrar historial completo.

Salida esperada:
1. UI creada.
2. Casos manuales.
3. Resultado build/lint.
4. Veredicto: “Issue 3.4.6 cerrable: sí/no”.
```

---

## Issue 3.4.7 — Servicio de favoritos

```text
/pbw-issue

Issue 3.4.7: Crear servicio de favoritos

Objetivo:
Crear un servicio encapsulado para favoritos de plantillas y combinaciones frecuentes.

Restricciones:
1. No modificar JSON base.
2. localStorage solo vía servicio.
3. No guardar texto libre del usuario.
4. No mezclar con historial.
5. No permitir favoritos inválidos.
6. No introducir any.

Tareas:
1. Crear LocalFavoritesRepository.
2. Definir FavoriteItem.
3. Soportar favorito de plantilla.
4. Soportar favorito de combinación artifact/provider/profile/template.
5. Validar favoritos contra catálogo al cargar.
6. Ignorar favoritos inválidos.
7. Ejecutar npm run build.
8. Ejecutar npm run lint si existe.

Criterios de aceptación:
- Servicio encapsulado.
- Favoritos inválidos se ignoran.
- No se modifica catálogo JSON.
- No se guarda información sensible.
- Build pasa.

Salida esperada:
1. Modelo creado.
2. Servicio creado.
3. Validaciones.
4. Resultado build/lint.
5. Veredicto: “Issue 3.4.7 cerrable: sí/no”.
```

---

## Issue 3.4.8 — UI de favoritos

```text
/pbw-issue

Issue 3.4.8: UI de favoritos

Objetivo:
Permitir marcar, desmarcar y usar favoritos desde el wizard.

Restricciones:
1. Usar LocalFavoritesRepository.
2. No acceder directamente a localStorage desde UI.
3. No modificar JSON base.
4. No mezclar con historial.
5. No introducir any.

Tareas:
1. Añadir control de favorito en plantilla o combinación.
2. Mostrar favoritos disponibles.
3. Permitir aplicar favorito válido.
4. Ignorar favoritos inválidos.
5. Ejecutar npm run build.
6. Ejecutar npm run lint si existe.

Criterios de aceptación:
- Marcar favorito funciona.
- Desmarcar favorito funciona.
- Aplicar favorito funciona si ids son válidos.
- Favoritos inválidos no rompen.
- Build pasa.

Verificación manual:
1. Marcar una plantilla favorita.
2. Recargar si procede.
3. Aplicar favorito.
4. Eliminar favorito.
5. Confirmar que no hay errores.

Salida esperada:
1. UI modificada.
2. Casos manuales.
3. Resultado build/lint.
4. Veredicto: “Issue 3.4.8 cerrable: sí/no”.
```

---

## Issue 3.4.9 — Tracking interno desacoplado

```text
/pbw-issue

Issue 3.4.9: Tracking interno desacoplado

Objetivo:
Crear un servicio de tracking interno sin servicios externos y sin registrar contenido sensible.

Eventos objetivo:
- artifact_selected
- provider_selected
- profile_selected
- template_selected
- context_completed
- prompt_generated
- export_copied
- export_downloaded
- section_changed
- reset_triggered

Restricciones:
1. No usar servicios externos.
2. No registrar texto sensible.
3. Tracking desactivable.
4. No depender de analytics real.
5. No mezclar con historial.
6. No introducir any.

Tareas:
1. Crear TrackingService.
2. Crear NoopTrackingAdapter por defecto.
3. Crear ConsoleTrackingAdapter configurable.
4. Centralizar nombres de eventos.
5. Definir payloads sin texto de usuario.
6. Ejecutar npm run build.
7. Ejecutar npm run lint si existe.

Criterios de aceptación:
- Servicio centralizado.
- No-op por defecto.
- No se registra texto de usuario.
- Tracking desactivable.
- Build pasa.

Salida esperada:
1. Servicio creado.
2. Eventos definidos.
3. Adaptadores creados.
4. Evidencia de no registrar datos sensibles.
5. Resultado build/lint.
6. Veredicto: “Issue 3.4.9 cerrable: sí/no”.
```

---

## Issue 3.4.10 — Emitir eventos de tracking

```text
/pbw-issue

Issue 3.4.10: Emitir eventos de tracking interno

Objetivo:
Conectar TrackingService a las acciones principales del funnel.

Restricciones:
1. No registrar texto libre del usuario.
2. No cambiar comportamiento funcional.
3. No acoplar tracking a renderer más de lo necesario.
4. No introducir servicios externos.
5. No introducir any.

Tareas:
1. Emitir artifact_selected.
2. Emitir provider_selected.
3. Emitir profile_selected.
4. Emitir template_selected.
5. Emitir context_completed sin texto sensible.
6. Emitir prompt_generated sin prompt completo.
7. Emitir export_copied.
8. Emitir export_downloaded.
9. Emitir section_changed.
10. Emitir reset_triggered.
11. Ejecutar npm run build.
12. Ejecutar npm run lint si existe.

Criterios de aceptación:
- Eventos principales se emiten.
- No se registra texto sensible.
- No-op por defecto no produce ruido.
- Build pasa.

Verificación manual:
1. Activar adaptador console si existe configuración.
2. Ejecutar flujo básico.
3. Confirmar eventos sin contenido sensible.
4. Confirmar que desactivado no emite ruido.

Salida esperada:
1. Eventos conectados.
2. Payloads usados.
3. Verificación manual.
4. Resultado build/lint.
5. Veredicto: “Fase 3.4 cerrable: sí/no”.
```

---

# Fase 3.5 — Tests automatizados y documentación final

## Objetivo

Cerrar Fase 3 con tests y documentación actualizada cuando el comportamiento ya esté definido.

## Resultado esperado

```text
- Tests automatizados mínimos.
- README actualizado.
- Documentación MkDocs actualizada.
- ADRs creados.
- Status/backlog actualizado.
- Commit de cierre de fase propuesto.
```

---

## Issue 3.5.1 — Crear infraestructura de tests

```text
/pbw-issue

Issue 3.5.1: Crear infraestructura de tests automatizados

Objetivo:
Añadir infraestructura mínima de tests una vez cerrado el comportamiento funcional de Fase 3.

Contexto:
Los tests se han pospuesto hasta este punto para no fijar comportamiento provisional.

Restricciones:
1. No reabrir diseño funcional.
2. No testear comportamiento provisional.
3. No añadir dependencias sin justificar.
4. No introducir any.
5. No testear detalles frágiles de DOM si no aportan valor.

Tareas:
1. Proponer herramienta de tests.
2. Añadir dependencia si se justifica.
3. Añadir npm run test.
4. Crear estructura mínima de tests.
5. Ejecutar npm run test.
6. Ejecutar npm run build.
7. Ejecutar npm run lint.

Criterios de aceptación:
- npm run test existe.
- Infraestructura mínima funciona.
- No hay tests sobre features futuras.
- Build/lint pasan.

Salida esperada:
1. Herramienta usada.
2. Dependencias añadidas y justificación.
3. Scripts añadidos.
4. Resultado test/build/lint.
5. Veredicto: “Issue 3.5.1 cerrable: sí/no”.
```

---

## Issue 3.5.2 — Tests de catálogo y builder-options

```text
/pbw-issue

Issue 3.5.2: Tests de catálogo y builder-options

Objetivo:
Proteger la carga, validación y resolución de catálogo.

Restricciones:
1. No cambiar comportamiento funcional.
2. No modificar catálogo salvo corrección de bug real.
3. No introducir any.
4. No testear detalles de implementación irrelevantes.

Cobertura mínima:
1. CatalogValidator valida JSON actuales.
2. JsonCatalogRepository carga catálogo.
3. Referencias rotas fallan.
4. resolveBuilderOptions aplica reglas.
5. resolveBuilderOptions usa fallback seguro sin reglas aplicables.

Tareas:
1. Crear tests de CatalogValidator.
2. Crear tests de JsonCatalogRepository.
3. Crear tests de reglas.
4. Ejecutar npm run test.
5. Ejecutar npm run build.
6. Ejecutar npm run lint.

Criterios de aceptación:
- Tests críticos de catálogo pasan.
- Tests de reglas pasan.
- Build/lint pasan.

Salida esperada:
1. Tests creados.
2. Casos cubiertos.
3. Resultado test/build/lint.
4. Veredicto: “Issue 3.5.2 cerrable: sí/no”.
```

---

## Issue 3.5.3 — Tests de PromptExporter y exportación

```text
/pbw-issue

Issue 3.5.3: Tests de PromptExporter y exportación

Objetivo:
Proteger la generación de prompt y formatos de exportación.

Restricciones:
1. No cambiar semántica del prompt salvo bug real.
2. No introducir any.
3. No testear detalles frágiles de UI.

Cobertura mínima:
1. PromptExporter genera XML con estructura correcta.
2. PromptExporter genera modo compacto sin bloques XML.
3. PromptExporter omite placeholders innecesarios.
4. Exportación TXT funciona a nivel de modelo.
5. Exportación Markdown funciona a nivel de modelo.

Tareas:
1. Crear fixtures mínimos.
2. Crear tests XML.
3. Crear tests compactos.
4. Crear tests Markdown/TXT.
5. Ejecutar npm run test.
6. Ejecutar npm run build.
7. Ejecutar npm run lint.

Criterios de aceptación:
- Tests de generación pasan.
- Tests de exportación pasan.
- Build/lint pasan.

Salida esperada:
1. Tests creados.
2. Casos cubiertos.
3. Resultado test/build/lint.
4. Veredicto: “Issue 3.5.3 cerrable: sí/no”.
```

---

## Issue 3.5.4 — Tests de URLs y repositorios locales

```text
/pbw-issue

Issue 3.5.4: Tests de URLs, historial y favoritos

Objetivo:
Proteger query params, historial local y favoritos.

Restricciones:
1. No cambiar comportamiento funcional.
2. No testear localStorage real si se puede abstraer.
3. No introducir any.
4. No guardar texto sensible en fixtures.

Cobertura mínima:
1. Query params válidos se parsean correctamente.
2. Query params inválidos se ignoran.
3. Historial ignora entradas inválidas.
4. Favoritos ignoran entradas inválidas.
5. Repositorios respetan límites.

Tareas:
1. Crear tests de parser de URL.
2. Crear tests de LocalHistoryRepository.
3. Crear tests de LocalFavoritesRepository.
4. Ejecutar npm run test.
5. Ejecutar npm run build.
6. Ejecutar npm run lint.

Criterios de aceptación:
- Tests de URL pasan.
- Tests de repositorios pasan.
- Build/lint pasan.

Salida esperada:
1. Tests creados.
2. Casos cubiertos.
3. Resultado test/build/lint.
4. Veredicto: “Issue 3.5.4 cerrable: sí/no”.
```

---

## Issue 3.5.5 — Actualizar documentación MkDocs y README

```text
/pbw-issue

Issue 3.5.5: Actualizar documentación MkDocs y README de Fase 3

Objetivo:
Actualizar la documentación del proyecto para reflejar el estado real tras Fase 3.

Restricciones:
1. No documentar features no implementadas como disponibles.
2. Distinguir activo, futuro y eliminado.
3. No duplicar documentación innecesaria.
4. No cambiar código funcional salvo enlaces o metadata.

Estructura recomendada:
docs/
  index.md
  status.md
  backlog.md
  architecture.md
  development.md
  testing.md
  decisions/
    ADR-0001-claude-code-skills.md
    ADR-0002-catalogo-json-canonico.md
    ADR-0003-tema-sin-persistencia.md
    ADR-0004-tests-al-final-de-fase-3.md
    ADR-0005-tracking-local-sin-servicios-externos.md

Tareas:
1. Actualizar README.md.
2. Actualizar docs/index.md.
3. Actualizar docs/status.md.
4. Actualizar docs/backlog.md.
5. Actualizar docs/architecture.md.
6. Actualizar docs/development.md.
7. Actualizar docs/testing.md.
8. Crear ADRs mínimos.
9. Ejecutar npm run build.
10. Ejecutar npm run lint si existe.
11. Ejecutar npm run test.

Criterios de aceptación:
- Documentación refleja arquitectura real.
- Backlog refleja Fase 3 reorganizada.
- JSON canónicos documentados.
- Skills internas documentadas.
- Tests documentados.
- Build/lint/test pasan.

Salida esperada:
1. Documentos creados/modificados.
2. ADRs creados.
3. Estado documentado.
4. Resultado build/lint/test.
5. Veredicto: “Issue 3.5.5 cerrable: sí/no”.
```

---

## Issue 3.5.6 — Revisión de cierre de Fase 3

```text
/pbw-review

Issue 3.5.6: Revisión de cierre de Fase 3

Objetivo:
Auditar que Fase 3 queda cerrable y que el proyecto está preparado para Fase 4.

Restricciones:
1. No implementar features nuevas.
2. No hacer refactors grandes.
3. No ocultar deuda.
4. No introducir any.

Checklist:
- Home sin acciones no aplicables.
- Tema claro/oscuro funciona sin persistencia.
- Botón Limpiar solo en wizard.
- JSON canónicos conectados.
- JSON sin valor actual eliminados.
- No hay hardcodeos sustituidos pendientes.
- resolveBuilderOptions conectado.
- PromptBuilder sin deuda transicional.
- PromptExporter con contrato claro.
- PromptValidator/models resueltos.
- reviewRequired con API explícita.
- Export Markdown funciona.
- URLs navegables funcionan.
- Historial funciona.
- Favoritos funcionan.
- Tracking no registra texto sensible.
- Tests mínimos pasan.
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
- Documentación actualizada.
- No queda deuda bloqueante.
- Fase 3 cerrable.

Salida esperada:
1. Resultado checklist.
2. Deuda residual.
3. Riesgos.
4. Recomendaciones para Fase 4.
5. Veredicto: “Fase 3 cerrable: sí/no”.
```

---

## Issue 3.5.7 — Generar commit de cierre de Fase 3

```text
/pbw-commit

Issue 3.5.7: Generar commit de cierre de Fase 3

Objetivo:
Generar un mensaje de commit en castellano siguiendo Conventional Commits para los cambios de cierre de Fase 3.

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
2. Veredicto: “Fase 3 cerrada y lista para commit: sí/no”.
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
