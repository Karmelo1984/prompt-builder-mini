import type { Prompt } from '../models/Prompt';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export class PromptValidator {
  static validate(prompt: Prompt): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Errores críticos
    if (!prompt.role || prompt.role.includes('[')) {
      errors.push('Rol técnico no definido o incompleto');
    }
    if (!prompt.objective || prompt.objective.includes('[')) {
      errors.push('Objetivo concreto no definido o incompleto');
    }
    if (!prompt.inputData) {
      errors.push('Input/código/error no pegado');
    }

    // Advertencias
    if (!prompt.stack) {
      warnings.push('Stack/lenguaje no indicado');
    }
    if (!prompt.why) {
      warnings.push('Contexto de negocio/motivo no documentado');
    }
    if (prompt.constraints.length === 0) {
      warnings.push('Sin restricciones explícitas');
    }
    if (prompt.outputs.length === 0) {
      warnings.push('Sin formato de salida definido');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  static getQualityScore(prompt: Prompt): number {
    let score = 0;
    const checks = [
      Boolean(prompt.role && !prompt.role.includes('[')),
      Boolean(prompt.stack),
      Boolean(prompt.objective && !prompt.objective.includes('[')),
      Boolean(prompt.why),
      Boolean(prompt.inputData),
      prompt.constraints.length > 0,
      prompt.outputs.length > 0
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }
}
