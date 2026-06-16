import type { PromptTemplateCatalog } from '../../../types/index';

export const techLeadTemplates: PromptTemplateCatalog = {
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
  }
};
