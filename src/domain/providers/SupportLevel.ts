export enum SupportLevel {
  Native = 'native',
  Equivalent = 'equivalent',
  Partial = 'partial',
  Unsupported = 'unsupported',
}

export const SupportLevelLabels: Record<SupportLevel, string> = {
  [SupportLevel.Native]: 'Soporte nativo',
  [SupportLevel.Equivalent]: 'Equivalente/Alternativa',
  [SupportLevel.Partial]: 'Soporte parcial',
  [SupportLevel.Unsupported]: 'No soportado',
};
