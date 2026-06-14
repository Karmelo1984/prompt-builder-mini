import type { FlowCatalog, PromptTypes, ConstraintCatalog, OutputCatalog, ProfileCatalog, PromptTemplateCatalog } from '../types/index';

export const flowCatalog: FlowCatalog = {
  fix: {
    label: 'Corregir algo que falla',
    short: 'Errores, tracebacks, regresiones, tests en rojo o fallos reproducibles.',
    types: ['debug', 'sql', 'regex']
  },
  build: {
    label: 'Construir o ampliar',
    short: 'Features, endpoints, componentes, automatizaciones o piezas nuevas.',
    types: ['feature', 'tests', 'regex']
  },
  review: {
    label: 'Revisar calidad',
    short: 'Code review, seguridad, rendimiento, mantenibilidad o deuda técnica.',
    types: ['review', 'refactor', 'sql']
  },
  understand: {
    label: 'Entender o migrar',
    short: 'Código legacy, módulos ajenos, migraciones de versión o tecnología.',
    types: ['explain', 'migration', 'refactor']
  },
  decide: {
    label: 'Tomar decisión técnica',
    short: 'Arquitectura, trade-offs, elección de librerías, patrones o estrategia.',
    types: ['architecture', 'migration', 'review']
  }
};

export const promptTypes: PromptTypes = {
  debug: {
    label: 'Debug / traceback',
    short: 'Encontrar causa raíz y aplicar el cambio mínimo.',
    role: 'senior developer con foco en diagnóstico rápido y cambios mínimos',
    objective: 'localizar la causa raíz y proponer un fix mínimo verificable',
    output: ['causa', 'diff', 'test', 'riesgos'],
    constraints: ['noRefactor', 'noDeps', 'noApi', 'priorizarBloqueante'],
    question: '¿Qué causa el error y cuál es el cambio mínimo seguro para corregirlo?'
  },
  feature: {
    label: 'Feature',
    short: 'Añadir funcionalidad con criterios de aceptación.',
    role: 'senior developer orientado a producción y mantenibilidad',
    objective: 'implementar la funcionalidad indicada con el cambio mínimo mantenible',
    output: ['plan', 'files', 'diff', 'tests', 'commands'],
    constraints: ['backwardCompatibility', 'noDeps', 'noApi', 'smallSteps'],
    question: '¿Cómo implementarías esta funcionalidad de forma mínima, mantenible y verificable?'
  },
  review: {
    label: 'Code review',
    short: 'Detectar bugs reales, riesgos y mejoras prioritarias.',
    role: 'reviewer senior especializado en bugs, seguridad, rendimiento y mantenibilidad',
    objective: 'revisar el código priorizando problemas reales sobre estilo menor',
    output: ['table', 'severity', 'fixes', 'risks'],
    constraints: ['noStyleNitpicks', 'markOpinions', 'noBigRewrite'],
    question: '¿Qué problemas reales ves y qué fix recomendarías para cada uno?'
  },
  refactor: {
    label: 'Refactor seguro',
    short: 'Mejorar estructura sin cambiar comportamiento observable.',
    role: 'senior developer especializado en refactors seguros de código legacy',
    objective: 'mejorar estructura interna manteniendo comportamiento idéntico',
    output: ['plan', 'diff', 'tests', 'risks'],
    constraints: ['noApi', 'noDeps', 'sameBehavior', 'smallSteps'],
    question: '¿Cuál es el refactor más seguro y cómo verifico que no cambió el comportamiento?'
  },
  tests: {
    label: 'Tests',
    short: 'Crear cobertura útil, determinista y mantenible.',
    role: 'QA automation engineer experto en tests deterministas y mantenibles',
    objective: 'diseñar y generar tests que cubran los casos críticos',
    output: ['cases', 'testCode', 'commands', 'mocks'],
    constraints: ['noFragileTests', 'blackBox', 'edgeCases'],
    question: '¿Qué tests esenciales añadirías y cuál es el código exacto?'
  },
  sql: {
    label: 'SQL / rendimiento',
    short: 'Optimizar query, índices o diagnóstico de datos.',
    role: 'DBA senior especializado en PostgreSQL y optimización de consultas',
    objective: 'mejorar la consulta sin cambiar su resultado lógico',
    output: ['cause', 'query', 'indexes', 'explain', 'risks'],
    constraints: ['sameResult', 'noSchemaChangeUnlessNeeded', 'explainAssumptions'],
    question: '¿Cómo optimizarías esta consulta y qué verificaciones harías?'
  },
  explain: {
    label: 'Explicar código',
    short: 'Entender código heredado sin modificarlo.',
    role: 'senior developer pedagógico especializado en explicar código legacy',
    objective: 'explicar qué hace el código y detectar riesgos sin modificarlo',
    output: ['summary', 'flow', 'risks', 'questions'],
    constraints: ['noChanges', 'noBasics', 'separateFacts'],
    question: '¿Qué hace este código, cuál es su flujo y qué riesgos ves?'
  },
  migration: {
    label: 'Migración',
    short: 'Convertir entre tecnologías o versiones con bajo riesgo.',
    role: 'senior developer especializado en migraciones incrementales y compatibilidad',
    objective: 'migrar el código minimizando riesgo y manteniendo comportamiento',
    output: ['plan', 'mapping', 'diff', 'tests', 'risks'],
    constraints: ['smallSteps', 'sameBehavior', 'noDeps', 'backwardCompatibility'],
    question: '¿Cuál es el plan de migración más seguro y el primer cambio aplicable?'
  },
  regex: {
    label: 'Regex',
    short: 'Crear expresión regular validada con casos positivos y negativos.',
    role: 'especialista en expresiones regulares con foco en legibilidad y falsos positivos',
    objective: 'crear una regex exacta para los casos indicados',
    output: ['regex', 'explanationShort', 'examplesPassFail', 'edgeCases'],
    constraints: ['noOverengineering', 'specifyFlavor', 'warnLimitations'],
    question: '¿Cuál es la regex adecuada y qué casos pasan o fallan?'
  },
  architecture: {
    label: 'Arquitectura / decisión',
    short: 'Comparar opciones y elegir trade-off.',
    role: 'arquitecto de software orientado a decisiones reversibles',
    objective: 'comparar alternativas técnicas y recomendar una decisión justificada',
    output: ['options', 'tradeoffs', 'decision', 'risks', 'nextSteps'],
    constraints: ['noHype', 'stateAssumptions', 'preferSimple'],
    question: '¿Qué opción elegirías, por qué y bajo qué supuestos cambiaría la decisión?'
  }
};

export const constraintCatalog: ConstraintCatalog = {
  noRefactor: 'No refactorices código no relacionado.',
  noDeps: 'No añadas dependencias salvo que sea imprescindible y lo justifiques.',
  noApi: 'No cambies la API pública ni contratos existentes sin avisar.',
  priorizarBloqueante: 'Si hay varios problemas, prioriza el bloqueante primero.',
  backwardCompatibility: 'Mantén compatibilidad hacia atrás.',
  noStyleNitpicks: 'No comentes estilo menor salvo que oculte un bug.',
  markOpinions: 'Si algo es opinión, márcalo como opinión.',
  noBigRewrite: 'No propongas reescrituras grandes si existe un fix local.',
  sameBehavior: 'El comportamiento observable debe seguir siendo idéntico.',
  smallSteps: 'Propón cambios pequeños, revisables y reversibles.',
  noFragileTests: 'No generes tests frágiles por tiempo, red, orden aleatorio o datos externos.',
  blackBox: 'Prioriza pruebas de comportamiento sobre implementación interna.',
  edgeCases: 'Incluye bordes: null, vacío, duplicados, errores externos y límites.',
  sameResult: 'No cambies el resultado lógico.',
  noSchemaChangeUnlessNeeded: 'No propongas cambios de esquema salvo que sean claramente necesarios.',
  explainAssumptions: 'Declara supuestos sobre volumen, índices o datos.',
  noChanges: 'No modifiques código; solo explica y analiza.',
  noBasics: 'No expliques conceptos básicos salvo que sean necesarios para el diagnóstico.',
  separateFacts: 'Separa hechos observables, inferencias y dudas.',
  noOverengineering: 'No sobrediseñes la solución.',
  specifyFlavor: 'Indica el flavor de regex asumido: JS, Python, PCRE, etc.',
  warnLimitations: 'Indica limitaciones y falsos positivos/falsos negativos previsibles.',
  noHype: 'Evita recomendaciones por moda; justifica por restricciones reales.',
  stateAssumptions: 'Declara supuestos y datos que faltan.',
  preferSimple: 'Prefiere la solución más simple que cumpla requisitos.'
};

export const outputCatalog: OutputCatalog = {
  causa: 'Causa raíz en una línea.',
  cause: 'Causa probable o diagnóstico.',
  diff: 'Diff mínimo aplicable.',
  test: 'Test mínimo o comando de verificación.',
  tests: 'Tests nuevos o modificados.',
  riesgos: 'Riesgos si el fix es incompleto.',
  risks: 'Riesgos, supuestos y efectos secundarios.',
  plan: 'Plan breve antes del código.',
  files: 'Archivos a modificar.',
  commands: 'Comandos para verificar.',
  table: 'Tabla de hallazgos.',
  severity: 'Severidad por problema: crítica, alta, media, baja.',
  fixes: 'Fix recomendado por hallazgo.',
  cases: 'Casos de prueba esenciales.',
  testCode: 'Código de tests.',
  mocks: 'Mocks/stubs necesarios.',
  query: 'Query optimizada.',
  indexes: 'Índices recomendados, si aplican.',
  explain: 'Qué mirar en EXPLAIN/EXPLAIN ANALYZE.',
  summary: 'Resumen ejecutivo del flujo.',
  flow: 'Flujo paso a paso.',
  questions: 'Preguntas críticas pendientes.',
  mapping: 'Mapa origen → destino de la migración.',
  regex: 'Regex final lista para copiar.',
  explanationShort: 'Explicación corta de la regex.',
  examplesPassFail: 'Casos que deben pasar y fallar.',
  edgeCases: 'Casos borde.',
  options: 'Opciones comparadas.',
  tradeoffs: 'Trade-offs claros.',
  decision: 'Recomendación final.',
  nextSteps: 'Siguientes pasos concretos.'
};

export const tips: string[] = [
  'Define la situación antes de pegar código. Si el objetivo está mal, el prompt también.',
  'Usa rol técnico concreto: barato en tokens, útil para el enfoque.',
  'Pega solo contexto verificable: función, traceback, query, criterios o contrato afectado.',
  'Pon restricciones explícitas: no refactor, no nuevas dependencias, no cambiar API.',
  'Pide salida exacta: causa, diff, test, comando y riesgos.',
  'Abre conversación nueva al cambiar de tarea para no pagar historial viejo.',
  'Usa modo compacto para tareas simples; usa XML cuando haya contexto largo o varios bloques.'
];

export const profileCatalog: ProfileCatalog = {
  'product-owner': {
    label: 'Product Owner',
    description: 'Enfocado en definición de requisitos, priorización y valor de negocio.'
  },
  'qa-manual': {
    label: 'QA Manual',
    description: 'Especializado en casos de prueba, escenarios y validación manual.'
  },
  'qa-automation': {
    label: 'QA Automation',
    description: 'Enfocado en tests automatizados, cobertura y confiabilidad.'
  },
  'developer': {
    label: 'Developer',
    description: 'Senior developer enfocado en calidad, testing y mantenibilidad del código.'
  },
  'tech-lead': {
    label: 'Tech Lead / Architect',
    description: 'Especializado en decisiones técnicas, arquitectura y deuda técnica.'
  },
  'product-designer': {
    label: 'Product Designer / UX',
    description: 'Enfocado en experiencia de usuario, flujos y componentes.'
  },
  'data-analyst': {
    label: 'Data Analyst',
    description: 'Especializado en métricas, análisis SQL y dashboards.'
  },
  'devops-sre': {
    label: 'DevOps / SRE',
    description: 'Enfocado en incidentes, despliegues y confiabilidad de sistemas.'
  }
};

export const promptTemplateCatalog: PromptTemplateCatalog = {
  // Product Owner Templates
  'user-story': {
    label: 'Historia de usuario',
    description: 'Redactar historias claras con criterios y aceptación.',
    profileId: 'product-owner',
    role: 'product manager experto en historias de usuario bien estructuradas',
    objective: 'redactar una historia clara con criterios de aceptación verificables',
    recommendedRestrictions: ['preferSimple', 'stateAssumptions'],
    recommendedOutputs: ['summary', 'cases', 'questions'],
    question: '¿Cómo redactarías esta historia de usuario con criterios claros?'
  },
  'acceptance-criteria': {
    label: 'Criterios de aceptación',
    description: 'Definir criterios Gherkin o escenarios de aceptación.',
    profileId: 'product-owner',
    role: 'product owner especializado en criterios de aceptación verificables',
    objective: 'definir criterios Gherkin concisos y verificables',
    recommendedRestrictions: ['edgeCases', 'separateFacts'],
    recommendedOutputs: ['cases', 'table'],
    question: '¿Cuáles son los criterios Gherkin esenciales para esta funcionalidad?'
  },
  'refinement': {
    label: 'Refinamiento',
    description: 'Preparar una épica o feature para sprint.',
    profileId: 'product-owner',
    role: 'product owner experto en refinamiento de requisitos',
    objective: 'desglosar una épica en historias estimables y independientes',
    recommendedRestrictions: ['preferSimple', 'stateAssumptions'],
    recommendedOutputs: ['plan', 'table', 'questions'],
    question: '¿Cómo desglosaría esta épica en historias estimables?'
  },
  'prioritization': {
    label: 'Priorización',
    description: 'Evaluar y priorizar requisitos por valor e impacto.',
    profileId: 'product-owner',
    role: 'product manager estratégico especializado en priorización de valor',
    objective: 'evaluar alternativas y recomendar orden de implementación por impacto',
    recommendedRestrictions: ['stateAssumptions', 'separateFacts'],
    recommendedOutputs: ['table', 'decision', 'risks'],
    question: '¿Cómo priorizarías estos requisitos por valor e impacto?'
  },
  'impact-analysis': {
    label: 'Análisis de impacto',
    description: 'Evaluar riesgos, beneficios y dependencias de un cambio.',
    profileId: 'product-owner',
    role: 'product strategist especializado en análisis de impacto',
    objective: 'evaluar impacto de negocio, riesgos y dependencias',
    recommendedRestrictions: ['stateAssumptions', 'separateFacts'],
    recommendedOutputs: ['table', 'risks', 'nextSteps'],
    question: '¿Cuál es el impacto esperado y qué riesgos o dependencias hay?'
  },

  // QA Manual Templates
  'test-cases': {
    label: 'Casos de prueba',
    description: 'Crear casos de prueba paso a paso para validación manual.',
    profileId: 'qa-manual',
    role: 'QA manual especializado en casos de prueba detallados y reproducibles',
    objective: 'redactar casos de prueba paso a paso con resultados esperados',
    recommendedRestrictions: ['edgeCases', 'separateFacts'],
    recommendedOutputs: ['cases', 'table'],
    question: '¿Cuáles son los casos de prueba esenciales con pasos exactos?'
  },
  'gherkin-scenarios': {
    label: 'Escenarios Gherkin',
    description: 'Escribir escenarios Gherkin (Given/When/Then) para validación.',
    profileId: 'qa-manual',
    role: 'QA especializado en BDD y escenarios Gherkin claros',
    objective: 'redactar escenarios Gherkin Given/When/Then para cada caso',
    recommendedRestrictions: ['preferSimple', 'edgeCases'],
    recommendedOutputs: ['cases', 'testCode'],
    question: '¿Cuáles son los escenarios Given/When/Then para esta funcionalidad?'
  },
  'bug-report': {
    label: 'Bug report',
    description: 'Redactar reportes de bug con contexto, pasos y evidencia.',
    profileId: 'qa-manual',
    role: 'QA especializado en reportes detallados y reproducibles',
    objective: 'redactar un reporte de bug claro con pasos reproducibles y evidencia',
    recommendedRestrictions: ['separateFacts', 'stateAssumptions'],
    recommendedOutputs: ['summary', 'cases', 'risks'],
    question: '¿Cuál es el reporte de bug claro con pasos reproducibles?'
  },
  'regression-checklist': {
    label: 'Checklist de regresión',
    description: 'Crear checklist para validar regresiones después de cambios.',
    profileId: 'qa-manual',
    role: 'QA experto en cobertura de regresión y casos críticos',
    objective: 'listar casos críticos para validar que no haya regresiones',
    recommendedRestrictions: ['edgeCases', 'separateFacts'],
    recommendedOutputs: ['cases', 'table'],
    question: '¿Cuáles son los casos críticos para validar regresiones?'
  },
  'exploratory-testing': {
    label: 'Pruebas exploratorias',
    description: 'Plan y charter para testing exploratorio sistemático.',
    profileId: 'qa-manual',
    role: 'QA explorador especializado en testing fuera de guión',
    objective: 'diseñar charter y estrategia para testing exploratorio efectivo',
    recommendedRestrictions: ['edgeCases', 'separateFacts'],
    recommendedOutputs: ['plan', 'cases', 'risks'],
    question: '¿Cuál es el charter de testing exploratorio para este área?'
  },

  // QA Automation Templates
  'automated-tests': {
    label: 'Tests automatizados',
    description: 'Escribir tests unitarios, integración o e2e.',
    profileId: 'qa-automation',
    role: 'QA automation engineer especializado en tests deterministas',
    objective: 'escribir suite de tests automatizados confiables y mantenibles',
    recommendedRestrictions: ['noFragileTests', 'blackBox', 'edgeCases'],
    recommendedOutputs: ['testCode', 'commands', 'mocks'],
    question: '¿Cuál es el código exacto de tests automatizados con buena cobertura?'
  },
  'mocks-stubs': {
    label: 'Mocks/stubs',
    description: 'Diseñar mocks, stubs y test doubles necesarios.',
    profileId: 'qa-automation',
    role: 'QA automation especializado en test doubles y aislamientos',
    objective: 'diseñar mocks/stubs para aislar componentes bajo test',
    recommendedRestrictions: ['preferSimple', 'blackBox'],
    recommendedOutputs: ['testCode', 'mocks', 'commands'],
    question: '¿Cuáles son los mocks/stubs necesarios para esta prueba?'
  },
  'flaky-tests-review': {
    label: 'Revisión de flaky tests',
    description: 'Analizar y corregir tests inestables o flakys.',
    profileId: 'qa-automation',
    role: 'QA automation especializado en diagnóstico de test flakys',
    objective: 'identificar causa de flakiness y proponer fix',
    recommendedRestrictions: ['separateFacts', 'stateAssumptions'],
    recommendedOutputs: ['cause', 'fixes', 'testCode', 'risks'],
    question: '¿Cuál es la causa del flakiness y cómo lo arreglarías?'
  },
  'coverage-strategy': {
    label: 'Estrategia de cobertura',
    description: 'Definir estrategia de cobertura (unit, integration, e2e).',
    profileId: 'qa-automation',
    role: 'QA lead especializado en estrategia de testing integral',
    objective: 'definir estrategia de cobertura por nivel de test',
    recommendedRestrictions: ['preferSimple', 'stateAssumptions'],
    recommendedOutputs: ['plan', 'table', 'commands'],
    question: '¿Cuál es la mejor estrategia de cobertura para este código?'
  },

  // Developer Templates
  'debug': {
    label: 'Debug / traceback',
    description: 'Encontrar causa raíz y aplicar el cambio mínimo.',
    profileId: 'developer',
    role: 'senior developer con foco en diagnóstico rápido y cambios mínimos',
    objective: 'localizar la causa raíz y proponer un fix mínimo verificable',
    recommendedRestrictions: ['noRefactor', 'noDeps', 'noApi'],
    recommendedOutputs: ['causa', 'diff', 'test', 'riesgos'],
    question: '¿Qué causa el error y cuál es el cambio mínimo seguro para corregirlo?'
  },
  'feature': {
    label: 'Feature',
    description: 'Implementar funcionalidad nueva con criterios de aceptación.',
    profileId: 'developer',
    role: 'senior developer orientado a producción y mantenibilidad',
    objective: 'implementar funcionalidad con cambio mínimo mantenible',
    recommendedRestrictions: ['backwardCompatibility', 'noDeps', 'smallSteps'],
    recommendedOutputs: ['plan', 'files', 'diff', 'tests', 'commands'],
    question: '¿Cómo implementarías esta funcionalidad de forma mínima y mantenible?'
  },
  'refactor-safe': {
    label: 'Refactor seguro',
    description: 'Mejorar estructura sin cambiar comportamiento observable.',
    profileId: 'developer',
    role: 'senior developer especializado en refactors seguros',
    objective: 'mejorar estructura interna manteniendo comportamiento idéntico',
    recommendedRestrictions: ['noApi', 'noDeps', 'sameBehavior', 'smallSteps'],
    recommendedOutputs: ['plan', 'diff', 'tests', 'risks'],
    question: '¿Cuál es el refactor más seguro y cómo verifico que no cambió el comportamiento?'
  },
  'code-review': {
    label: 'Code review',
    description: 'Revisar código detectando bugs, riesgos y mejoras reales.',
    profileId: 'developer',
    role: 'reviewer senior especializado en bugs, seguridad y rendimiento',
    objective: 'revisar priorizando problemas reales sobre estilo menor',
    recommendedRestrictions: ['noStyleNitpicks', 'markOpinions', 'noBigRewrite'],
    recommendedOutputs: ['table', 'severity', 'fixes', 'risks'],
    question: '¿Qué problemas reales ves y qué fix recomendarías para cada uno?'
  },
  'tests-dev': {
    label: 'Tests',
    description: 'Crear tests unitarios, integración o e2e con buen coverage.',
    profileId: 'developer',
    role: 'QA automation engineer experto en tests deterministas',
    objective: 'diseñar tests que cubran casos críticos y bordes',
    recommendedRestrictions: ['noFragileTests', 'blackBox', 'edgeCases'],
    recommendedOutputs: ['cases', 'testCode', 'commands', 'mocks'],
    question: '¿Qué tests esenciales añadirías y cuál es el código exacto?'
  },
  'sql-performance': {
    label: 'SQL / rendimiento',
    description: 'Optimizar query, índices o diagnóstico de datos.',
    profileId: 'developer',
    role: 'DBA senior especializado en PostgreSQL y optimización',
    objective: 'mejorar query sin cambiar resultado lógico',
    recommendedRestrictions: ['sameResult', 'noSchemaChangeUnlessNeeded', 'explainAssumptions'],
    recommendedOutputs: ['cause', 'query', 'indexes', 'explain', 'risks'],
    question: '¿Cómo optimizarías esta consulta y qué verificaciones harías?'
  },
  'migration-dev': {
    label: 'Migración',
    description: 'Migrar entre tecnologías o versiones con bajo riesgo.',
    profileId: 'developer',
    role: 'senior developer especializado en migraciones incrementales',
    objective: 'migrar código minimizando riesgo y manteniendo comportamiento',
    recommendedRestrictions: ['smallSteps', 'sameBehavior', 'noDeps', 'backwardCompatibility'],
    recommendedOutputs: ['plan', 'mapping', 'diff', 'tests', 'risks'],
    question: '¿Cuál es el plan de migración más seguro y verificable?'
  },

  // Tech Lead / Architect Templates
  'adr': {
    label: 'ADR (Architecture Decision Record)',
    description: 'Documentar decisión arquitectónica con contexto y rationale.',
    profileId: 'tech-lead',
    role: 'arquitecto de software especializado en ADRs claros',
    objective: 'redactar ADR con contexto, decisión y consecuencias',
    recommendedRestrictions: ['stateAssumptions', 'preferSimple'],
    recommendedOutputs: ['summary', 'options', 'decision', 'risks'],
    question: '¿Cuál es el ADR para esta decisión arquitectónica?'
  },
  'technical-tradeoffs': {
    label: 'Trade-offs técnicos',
    description: 'Comparar opciones técnicas evaluando trade-offs.',
    profileId: 'tech-lead',
    role: 'arquitecto de software orientado a decisiones reversibles',
    objective: 'comparar alternativas técnicas con trade-offs claros',
    recommendedRestrictions: ['noHype', 'stateAssumptions', 'preferSimple'],
    recommendedOutputs: ['options', 'tradeoffs', 'decision', 'risks'],
    question: '¿Qué opción elegirías y bajo qué supuestos cambiaría la decisión?'
  },
  'architecture-design': {
    label: 'Diseño arquitectónico',
    description: 'Diseñar arquitectura o componentes con diagramas.',
    profileId: 'tech-lead',
    role: 'arquitecto especializado en diseño modular y escalable',
    objective: 'diseñar arquitectura clara con componentes y flujos',
    recommendedRestrictions: ['preferSimple', 'stateAssumptions'],
    recommendedOutputs: ['summary', 'plan', 'nextSteps', 'risks'],
    question: '¿Cuál es el diseño arquitectónico recomendado?'
  },
  'technical-debt': {
    label: 'Deuda técnica',
    description: 'Evaluar, priorizar y estrategia de deuda técnica.',
    profileId: 'tech-lead',
    role: 'tech lead especializado en evaluación de deuda técnica',
    objective: 'evaluar deuda técnica y proponer estrategia de amortización',
    recommendedRestrictions: ['preferSimple', 'stateAssumptions', 'separateFacts'],
    recommendedOutputs: ['table', 'risks', 'plan', 'nextSteps'],
    question: '¿Cuál es la deuda técnica prioritaria y cómo la abordarías?'
  },

  // Product Designer / UX Templates
  'ux-heuristic': {
    label: 'Análisis heurístico UX',
    description: 'Evaluar usabilidad contra heurísticas de Nielsen.',
    profileId: 'product-designer',
    role: 'UX specialist experto en heurísticas de usabilidad',
    objective: 'evaluar interfaz contra heurísticas y proponer mejoras',
    recommendedRestrictions: ['separateFacts', 'markOpinions'],
    recommendedOutputs: ['table', 'fixes', 'risks'],
    question: '¿Cuáles son los problemas de usabilidad principales?'
  },
  'user-flow': {
    label: 'User flow',
    description: 'Diseñar o evaluar flujos de usuario paso a paso.',
    profileId: 'product-designer',
    role: 'product designer especializado en user flows claros',
    objective: 'diseñar user flow optimizado para el caso de uso',
    recommendedRestrictions: ['preferSimple', 'stateAssumptions'],
    recommendedOutputs: ['summary', 'flow', 'commands'],
    question: '¿Cuál es el flujo de usuario óptimo para esta tarea?'
  },
  'microcopy': {
    label: 'Microcopy',
    description: 'Redactar textos pequeños claros y consistentes en UI.',
    profileId: 'product-designer',
    role: 'content strategist especializado en microcopy clara',
    objective: 'redactar textos pequeños consistentes y precisos',
    recommendedRestrictions: ['preferSimple', 'separateFacts'],
    recommendedOutputs: ['testCode', 'table'],
    question: '¿Cuál es la microcopy clara y consistente para esta UI?'
  },
  'ui-states': {
    label: 'Estados UI',
    description: 'Documentar estados UI (idle, loading, error, success, etc).',
    profileId: 'product-designer',
    role: 'product designer especializado en documentación de estados',
    objective: 'documentar todos los estados posibles de un componente',
    recommendedRestrictions: ['edgeCases', 'preferSimple'],
    recommendedOutputs: ['table', 'summary'],
    question: '¿Cuáles son todos los estados posibles y el comportamiento de cada uno?'
  },

  // Data Analyst Templates
  'metric-definition': {
    label: 'Definición de métrica',
    description: 'Definir métrica clara con cálculo exacto.',
    profileId: 'data-analyst',
    role: 'data analyst especializado en definiciones de métricas',
    objective: 'definir métrica con cálculo exacto, numerador/denominador',
    recommendedRestrictions: ['stateAssumptions', 'separateFacts'],
    recommendedOutputs: ['summary', 'query', 'questions'],
    question: '¿Cuál es la definición exacta de esta métrica?'
  },
  'sql-analysis': {
    label: 'SQL análisis',
    description: 'Escribir query SQL para extraer datos y analizar.',
    profileId: 'data-analyst',
    role: 'data analyst especializado en SQL y análisis exploratorio',
    objective: 'escribir query SQL para validar hipótesis o explorar datos',
    recommendedRestrictions: ['sameResult', 'explainAssumptions'],
    recommendedOutputs: ['query', 'commands', 'explanation'],
    question: '¿Cuál es la query SQL para responder esta pregunta?'
  },
  'dashboard-spec': {
    label: 'Dashboard spec',
    description: 'Especificar dashboard con métricas, filtros y diseño.',
    profileId: 'data-analyst',
    role: 'analytics engineer especializado en specs de dashboards',
    objective: 'especificar dashboard con métricas, visualizaciones y filtros',
    recommendedRestrictions: ['stateAssumptions', 'preferSimple'],
    recommendedOutputs: ['plan', 'table', 'questions'],
    question: '¿Cuál es la spec completa del dashboard?'
  },
  'results-interpretation': {
    label: 'Interpretación de resultados',
    description: 'Interpretar datos, validar supuestos y conclusiones.',
    profileId: 'data-analyst',
    role: 'data scientist especializado en interpretación crítica',
    objective: 'interpretar resultados validando supuestos y conclusiones',
    recommendedRestrictions: ['separateFacts', 'stateAssumptions'],
    recommendedOutputs: ['summary', 'risks', 'questions'],
    question: '¿Cuál es la interpretación correcta de estos datos?'
  },

  // DevOps / SRE Templates
  'incident-diagnosis': {
    label: 'Diagnóstico de incidente',
    description: 'Diagnosticar raíz de incidente y proponer mitigación.',
    profileId: 'devops-sre',
    role: 'SRE especializado en diagnóstico rápido de incidentes',
    objective: 'diagnosticar causa raíz e impacto del incidente',
    recommendedRestrictions: ['separateFacts', 'stateAssumptions', 'priorizarBloqueante'],
    recommendedOutputs: ['summary', 'cause', 'fixes', 'risks'],
    question: '¿Cuál es la causa raíz del incidente y el fix inmediato?'
  },
  'runbook': {
    label: 'Runbook',
    description: 'Escribir runbook para mitigación manual de incidente.',
    profileId: 'devops-sre',
    role: 'SRE especializado en runbooks claros y probados',
    objective: 'escribir runbook paso a paso para responder incidentes',
    recommendedRestrictions: ['preferSimple', 'edgeCases'],
    recommendedOutputs: ['plan', 'cases', 'commands'],
    question: '¿Cuál es el runbook exacto paso a paso para este incidente?'
  },
  'postmortem': {
    label: 'Postmortem',
    description: 'Redactar postmortem de incidente sin culpa.',
    profileId: 'devops-sre',
    role: 'SRE especializado en postmortems constructivos',
    objective: 'redactar postmortem analizando causa raíz y mejoras',
    recommendedRestrictions: ['separateFacts', 'stateAssumptions'],
    recommendedOutputs: ['summary', 'flow', 'nextSteps', 'risks'],
    question: '¿Cuál es el postmortem con aprendizajes y acciones?'
  },
  'deploy-checklist': {
    label: 'Checklist de despliegue',
    description: 'Crear checklist de pre/durante/post despliegue.',
    profileId: 'devops-sre',
    role: 'DevOps especializado en checklists de despliegue seguros',
    objective: 'crear checklist de pasos pre/durante/post despliegue',
    recommendedRestrictions: ['preferSimple', 'edgeCases'],
    recommendedOutputs: ['cases', 'table', 'commands'],
    question: '¿Cuál es el checklist completo para un despliegue seguro?'
  }
};
