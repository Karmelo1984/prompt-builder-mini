import type { PromptTemplateCatalog } from '../../../types/index';

export const qaAutomationTemplates: PromptTemplateCatalog = {
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
  }
};
