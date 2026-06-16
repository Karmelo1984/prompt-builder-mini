import type { PromptTemplateCatalog } from '../../../types/index';

export const qaManualTemplates: PromptTemplateCatalog = {
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
  }
};
