import type { PromptTemplateCatalog } from '../../../types/index';

export const devopsSreTemplates: PromptTemplateCatalog = {
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
