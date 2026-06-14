import type { AppState, PromptData } from '../types/index';
import { profileCatalog, promptTemplateCatalog, constraintCatalog, outputCatalog } from '../data/catalogs';

export class PromptBuilder {
  private state: AppState;

  constructor() {
    this.state = {
      currentStep: 1,
      selectedProfile: null,
      selectedTemplate: null,
      contextTouched: false
    };
  }

  getState(): Readonly<AppState> {
    return { ...this.state };
  }

  selectProfile(profileId: string): void {
    if (this.state.selectedProfile !== profileId) {
      this.state.selectedProfile = profileId;
      this.resetAfter(1);
    }
  }

  selectTemplate(templateId: string): void {
    if (this.state.selectedTemplate !== templateId) {
      this.state.selectedTemplate = templateId;
    }
  }

  setCurrentStep(step: number): void {
    this.state.currentStep = Math.max(1, Math.min(5, step));
  }

  nextStep(): void {
    this.setCurrentStep(this.state.currentStep + 1);
  }

  prevStep(): void {
    this.setCurrentStep(this.state.currentStep - 1);
  }

  setContextTouched(touched: boolean): void {
    this.state.contextTouched = touched;
  }

  resetAfter(step: number): void {
    if (step < 2) {
      this.state.selectedTemplate = null;
      this.state.contextTouched = false;
    }
  }

  resetContext(): void {
    this.state.contextTouched = false;
  }

  reset(): void {
    this.state = {
      currentStep: 1,
      selectedProfile: null,
      selectedTemplate: null,
      contextTouched: false
    };
  }

  getQualityChecks(data: {
    role: string;
    stack: string;
    objective: string;
    why: string;
    inputData: string;
    constraints: string[];
    outputs: string[];
  }): Array<[string, boolean]> {
    const state = this.getState();
    return [
      ['Perfil seleccionado', Boolean(state.selectedProfile)],
      ['Plantilla seleccionada', Boolean(state.selectedTemplate)],
      ['Rol técnico', Boolean(data.role && !data.role.includes('['))],
      ['Stack indicado', Boolean(data.stack)],
      ['Objetivo concreto', Boolean(data.objective && !data.objective.includes('['))],
      ['Porqué/contexto de negocio', Boolean(data.why)],
      ['Input mínimo pegado', Boolean(data.inputData)],
      ['Restricciones explícitas', data.constraints.length > 0],
      ['Formato de salida', data.outputs.length > 0]
    ];
  }

  getProfileLabel(): string {
    if (!this.state.selectedProfile) return 'Sin seleccionar';
    return profileCatalog[this.state.selectedProfile as keyof typeof profileCatalog].label;
  }

  getTemplateLabel(): string {
    if (!this.state.selectedTemplate) return 'Sin seleccionar';
    return promptTemplateCatalog[this.state.selectedTemplate].label;
  }

  getAllowedTemplates(profileId?: string): string[] {
    const pid = profileId || this.state.selectedProfile;
    if (!pid) return Object.keys(promptTemplateCatalog);
    return Object.entries(promptTemplateCatalog)
      .filter(([, data]) => data.profileId === pid)
      .map(([key]) => key);
  }

  getPromptTemplateData() {
    if (!this.state.selectedTemplate) return null;
    return promptTemplateCatalog[this.state.selectedTemplate];
  }

  buildPrompt(data: PromptData, compact: boolean): string {
    return compact ? this.buildCompactPrompt(data) : this.buildXmlPrompt(data);
  }

  private buildXmlPrompt(data: PromptData): string {
    const blocks: string[] = [];
    blocks.push(
      `<rol>\nEres ${data.role}${data.stack ? ` especializado en ${data.stack}` : ''}. Prioriza soluciones simples, verificables y mantenibles.\n</rol>`
    );

    blocks.push(
      `<contexto>\nProyecto/módulo: ${data.project || '[indica proyecto o módulo]'}\nObjetivo: ${data.objective}\nMotivo: ${data.why || '[explica por qué importa o qué restricción de negocio existe]'}\n</contexto>`
    );

    blocks.push(
      `<input>\n${data.inputData || '[pega aquí código, traceback, query, criterios de aceptación o datos mínimos relevantes]'}\n</input>`
    );

    if (data.examples) {
      blocks.push(`<ejemplos>\n${data.examples}\n</ejemplos>`);
    }

    blocks.push(
      `<formato-salida>\nDevuelve exactamente:\n${this.numbered(data.outputs.length ? data.outputs : ['[selecciona la salida requerida en el paso 5]'])}\n</formato-salida>`
    );

    blocks.push(
      `<restricciones>\n${this.bullets(data.constraints.length ? data.constraints : ['[selecciona restricciones en el paso 4]', 'No inventes datos que no estén en el contexto.', 'Pregunta solo si falta información crítica.'])}\n</restricciones>`
    );

    blocks.push(`<pregunta>\n${data.question}\n</pregunta>`);
    return blocks.join('\n\n');
  }

  private buildCompactPrompt(data: PromptData): string {
    const parts: string[] = [
      `Eres ${data.role}${data.stack ? ` (${data.stack})` : ''}.`,
      `Objetivo: ${data.objective}.`,
      `Contexto: ${data.project || '[proyecto/módulo]'}${data.why ? `; motivo: ${data.why}` : ''}.`,
      `Input: ${data.inputData || '[código/error/datos mínimos]'}.`,
      `Salida: ${(data.outputs.length ? data.outputs : ['[selecciona salida requerida]']).join('; ')}.`,
      `Restricciones: ${(data.constraints.length ? data.constraints : ['[selecciona restricciones]', 'no inventes datos']).join('; ')}.`
    ];
    if (data.examples) parts.push(`Ejemplo de formato: ${data.examples}.`);
    parts.push(data.question);
    return parts.join('\n');
  }

  private numbered(items: string[]): string {
    return items.map((item, index) => `${index + 1}. ${item}`).join('\n');
  }

  private bullets(items: string[]): string {
    return items.map(item => `- ${item}`).join('\n');
  }

  getConstraintLabel(key: string): string {
    return constraintCatalog[key] || '';
  }

  getOutputLabel(key: string): string {
    return outputCatalog[key] || '';
  }
}
