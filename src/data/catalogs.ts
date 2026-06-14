import type { FlowCatalog, PromptTypes, ConstraintCatalog, OutputCatalog } from '../types/index';

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
    role: 'arquitecto de software pragmático orientado a decisiones reversibles',
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
