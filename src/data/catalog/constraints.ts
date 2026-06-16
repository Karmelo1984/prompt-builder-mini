import type { ConstraintCatalog } from '../../types/index';

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
