import type { PromptTemplateCatalog } from '../../../types/index';

export const dataAnalystTemplates: PromptTemplateCatalog = {
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
  }
};
