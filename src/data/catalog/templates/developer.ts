import type { PromptTemplateCatalog } from '../../../types/index';

export const developerTemplates: PromptTemplateCatalog = {
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
  }
};
