import type { PromptTemplateCatalog } from '../../../types/index';

export const productOwnerTemplates: PromptTemplateCatalog = {
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
  }
};
