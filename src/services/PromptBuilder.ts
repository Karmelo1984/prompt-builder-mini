import type { AppState, PromptData } from '../types/index';
import { flowCatalog, promptTypes, constraintCatalog, outputCatalog } from '../data/catalogs';
import { Mappers } from '../models/mappers';
import type { Flow, PromptType } from '../models/index';

export class PromptBuilder {
  private state: AppState;

  constructor() {
    this.state = {
      currentStep: 1,
      selectedFlow: null,
      selectedType: null,
      contextTouched: false
    };
  }

  getState(): Readonly<AppState> {
    return { ...this.state };
  }

  selectFlow(flow: string): void {
    if (this.state.selectedFlow !== flow) {
      this.state.selectedFlow = flow;
      this.resetAfter(1);
    }
  }

  selectType(type: string): void {
    if (this.state.selectedType !== type) {
      this.state.selectedType = type;
      this.resetAfter(2);
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
      this.state.selectedType = null;
    }
  }

  reset(): void {
    this.state = {
      currentStep: 1,
      selectedFlow: null,
      selectedType: null,
      contextTouched: false
    };
  }

  getFlowLabel(): string {
    if (!this.state.selectedFlow) return 'Sin seleccionar';
    return flowCatalog[this.state.selectedFlow as keyof typeof flowCatalog].label;
  }

  getTypeLabel(): string {
    if (!this.state.selectedType) return 'Sin seleccionar';
    return promptTypes[this.state.selectedType].label;
  }

  getAllowedTypes(): string[] {
    if (!this.state.selectedFlow) return Object.keys(promptTypes);
    return flowCatalog[this.state.selectedFlow as keyof typeof flowCatalog].types;
  }

  getPromptTypeData() {
    if (!this.state.selectedType) return null;
    return promptTypes[this.state.selectedType];
  }

  isStepComplete(step: number): boolean {
    // Nota: isStepComplete requiere acceso a valores de input del DOM
    // Se validará desde el renderizador/handlers
    return false;
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

  getSelectedFlow(): Flow | null {
    if (!this.state.selectedFlow) return null;
    return Mappers.toFlow(this.state.selectedFlow);
  }

  getSelectedType(): PromptType | null {
    if (!this.state.selectedType) return null;
    return Mappers.toPromptType(this.state.selectedType);
  }

  getFlowList(): Flow[] {
    return Mappers.toFlowList();
  }

  getPromptTypeList(): PromptType[] {
    return Mappers.toPromptTypeList(this.state.selectedFlow || undefined);
  }
}
