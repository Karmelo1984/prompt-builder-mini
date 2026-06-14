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
    const contextMinimal = Boolean(data.stack || data.why);
    return [
      ['Perfil seleccionado', Boolean(state.selectedProfile)],
      ['Plantilla seleccionada', Boolean(state.selectedTemplate)],
      ['Rol técnico/de negocio', Boolean(data.role && !data.role.includes('['))],
      ['Objetivo concreto', Boolean(data.objective && !data.objective.includes('['))],
      ['Contexto mínimo', contextMinimal],
      ['Input verificable', Boolean(data.inputData)],
      ['Restricciones', data.constraints.length > 0],
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

  private isMeaningfulText(value: string | undefined | null): boolean {
    if (!value) return false;
    const trimmed = value.trim();
    if (!trimmed) return false;
    return !trimmed.startsWith('[') || !trimmed.endsWith(']');
  }

  private buildXmlPrompt(data: PromptData): string {
    const blocks: string[] = [];

    if (this.isMeaningfulText(data.role)) {
      blocks.push(
        `<rol>\nEres ${data.role}${data.stack ? ` especializado en ${data.stack}` : ''}.\n</rol>`
      );
    }

    const tareaLines: string[] = [];
    if (this.isMeaningfulText(data.profile)) {
      tareaLines.push(`Perfil: ${data.profile}`);
    }
    if (this.isMeaningfulText(data.template)) {
      tareaLines.push(`Plantilla: ${data.template}`);
    }
    if (this.isMeaningfulText(data.objective)) {
      tareaLines.push(`Objetivo: ${data.objective}`);
    }
    if (this.isMeaningfulText(data.why)) {
      tareaLines.push(`Motivo: ${data.why}`);
    }
    if (tareaLines.length > 0) {
      blocks.push(`<tarea>\n${tareaLines.join('\n')}\n</tarea>`);
    }

    const contextLines: string[] = [];
    if (this.isMeaningfulText(data.project)) {
      contextLines.push(`Proyecto/módulo: ${data.project}`);
    }
    if (this.isMeaningfulText(data.stack)) {
      contextLines.push(`Stack/herramientas: ${data.stack}`);
    }
    if (this.isMeaningfulText(data.inputData)) {
      contextLines.push(`Información relevante:\n${data.inputData}`);
    }
    if (contextLines.length > 0) {
      blocks.push(`<contexto>\n${contextLines.join('\n')}\n</contexto>`);
    }

    if (data.constraints.length > 0) {
      blocks.push(`<restricciones>\n${this.bullets(data.constraints)}\n</restricciones>`);
    }

    if (data.outputs.length > 0) {
      blocks.push(
        `<formato-salida>\nDevuelve exactamente:\n${this.numbered(data.outputs)}\n</formato-salida>`
      );
    }

    if (this.isMeaningfulText(data.question)) {
      blocks.push(`<pregunta>\n${data.question}\n</pregunta>`);
    }

    if (data.examples) {
      blocks.push(`<ejemplos>\n${data.examples}\n</ejemplos>`);
    }

    return blocks.join('\n\n');
  }

  private buildCompactPrompt(data: PromptData): string {
    const parts: string[] = [];

    if (this.isMeaningfulText(data.role)) {
      parts.push(`Eres ${data.role}${data.stack ? ` (${data.stack})` : ''}.`);
    }

    const taskParts: string[] = [];
    if (this.isMeaningfulText(data.profile)) {
      taskParts.push(`perfil: ${data.profile}`);
    }
    if (this.isMeaningfulText(data.template)) {
      taskParts.push(`plantilla: ${data.template}`);
    }
    if (this.isMeaningfulText(data.objective)) {
      taskParts.push(`objetivo: ${data.objective}`);
    }
    if (this.isMeaningfulText(data.why)) {
      taskParts.push(`motivo: ${data.why}`);
    }
    if (taskParts.length > 0) {
      parts.push(`Tarea: ${taskParts.join('; ')}.`);
    }

    if (this.isMeaningfulText(data.project)) {
      parts.push(`Proyecto: ${data.project}.`);
    }

    if (this.isMeaningfulText(data.inputData)) {
      parts.push(`Input: ${data.inputData}.`);
    }

    if (data.constraints.length > 0) {
      parts.push(`Restricciones: ${data.constraints.join('; ')}.`);
    }

    if (data.outputs.length > 0) {
      parts.push(`Salida: ${data.outputs.join('; ')}.`);
    }

    if (data.examples) {
      parts.push(`Ejemplo de formato: ${data.examples}.`);
    }

    if (this.isMeaningfulText(data.question)) {
      parts.push(data.question);
    }

    return parts.filter(p => p).join('\n');
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
