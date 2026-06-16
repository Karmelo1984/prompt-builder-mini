import type { AppState, PromptData } from '../types/index';
import { PromptExporter } from '../domain/exporters/PromptExporter';
// TEMPORARY: para métodos legacy que deben venir de BuilderScreenModel (próximas issues)
import { promptTemplateCatalog } from '../data/catalogs';

export class PromptBuilder {
  private state: AppState;
  private promptExporter: PromptExporter;

  constructor() {
    this.state = {
      currentStep: 1,
      selectedArtifact: null,
      selectedProvider: null,
      selectedProfile: null,
      selectedTemplate: null,
      contextTouched: false
    };
    this.promptExporter = new PromptExporter();
  }

  getState(): Readonly<AppState> {
    return { ...this.state };
  }

  selectArtifact(artifactId: string): void {
    if (this.state.selectedArtifact !== artifactId) {
      this.state.selectedArtifact = artifactId;
      this.resetAfter(1);
    }
  }

  selectProvider(providerId: string): void {
    if (this.state.selectedProvider !== providerId) {
      this.state.selectedProvider = providerId;
      this.resetAfter(2);
    }
  }

  selectProfile(profileId: string): void {
    if (this.state.selectedProfile !== profileId) {
      this.state.selectedProfile = profileId;
      this.resetAfter(3);
    }
  }

  selectTemplate(templateId: string): void {
    if (this.state.selectedTemplate !== templateId) {
      this.state.selectedTemplate = templateId;
    }
  }

  setCurrentStep(step: number): void {
    this.state.currentStep = Math.max(1, Math.min(8, step));
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
      this.state.selectedProvider = null;
      this.state.selectedProfile = null;
      this.state.selectedTemplate = null;
      this.state.contextTouched = false;
    } else if (step < 3) {
      this.state.selectedProfile = null;
      this.state.selectedTemplate = null;
      this.state.contextTouched = false;
    } else if (step < 4) {
      this.state.selectedTemplate = null;
      this.state.contextTouched = false;
    } else if (step < 5) {
      this.state.contextTouched = false;
    }
  }

  resetContext(): void {
    this.state.contextTouched = false;
  }

  reset(): void {
    this.state = {
      currentStep: 1,
      selectedArtifact: null,
      selectedProvider: null,
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
      ['Artefacto seleccionado', Boolean(state.selectedArtifact)],
      ['Proveedor seleccionado', Boolean(state.selectedProvider)],
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

  buildPrompt(data: PromptData, compact: boolean): string {
    return this.promptExporter.buildPrompt(data, compact);
  }

  // TRANSICIONAL: estos métodos deberían venir de BuilderScreenModel (issue 1.8.9)
  // Se mantienen aquí solo para compatibilidad temporal
  getProfileLabel(): string {
    if (!this.state.selectedProfile) return 'Sin seleccionar';
    return this.state.selectedProfile;
  }

  getTemplateLabel(): string {
    if (!this.state.selectedTemplate) return 'Sin seleccionar';
    return promptTemplateCatalog[this.state.selectedTemplate]?.label || 'Sin seleccionar';
  }

  getPromptTemplateData() {
    if (!this.state.selectedTemplate) return null;
    return promptTemplateCatalog[this.state.selectedTemplate];
  }

  getAllowedTemplates(profileId?: string): string[] {
    const pid = profileId || this.state.selectedProfile;
    if (!pid) return Object.keys(promptTemplateCatalog);
    return Object.entries(promptTemplateCatalog)
      .filter(([, data]) => data.profileId === pid)
      .map(([key]) => key);
  }
}
