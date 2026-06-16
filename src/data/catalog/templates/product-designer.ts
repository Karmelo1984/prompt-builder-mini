import type { PromptTemplateCatalog } from '../../../types/index';

export const productDesignerTemplates: PromptTemplateCatalog = {
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
  }
};
