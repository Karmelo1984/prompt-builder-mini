import type { ArtifactExporter, ArtifactExportInput, ArtifactExportResult } from '../artifacts';
import { ArtifactExportTarget } from '../artifacts';
import { ArtifactKind } from '../artifacts/ArtifactKind';
import { AiProvider } from '../providers/AiProvider';
import type { PromptData } from '../../types';

export class PromptExporter implements ArtifactExporter {
  async export(input: ArtifactExportInput): Promise<ArtifactExportResult> {
    if (input.kind !== ArtifactKind.Prompt) {
      return {
        target: ArtifactExportTarget.CopyText,
        warnings: ['PromptExporter solo soporta ArtifactKind.Prompt'],
        provider: input.provider,
        artifactKind: input.kind,
      };
    }

    const promptData = this.parsePromptData(input.content);
    const isCompact = input.content.includes('\n') && !input.content.includes('<');
    const prompt = this.buildPrompt(promptData, isCompact);

    return {
      target: ArtifactExportTarget.CopyText,
      copyText: prompt,
      provider: input.provider,
      artifactKind: ArtifactKind.Prompt,
    };
  }

  canExport(kind: ArtifactKind, provider: AiProvider): boolean {
    return kind === ArtifactKind.Prompt;
  }

  buildPrompt(data: PromptData, compact: boolean): string {
    return compact ? this.buildCompactPrompt(data) : this.buildXmlPrompt(data);
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

  private isMeaningfulText(value: string | undefined | null): boolean {
    if (!value) return false;
    const trimmed = value.trim();
    if (!trimmed) return false;
    return !trimmed.startsWith('[') || !trimmed.endsWith(']');
  }

  private numbered(items: string[]): string {
    return items.map((item, index) => `${index + 1}. ${item}`).join('\n');
  }

  private bullets(items: string[]): string {
    return items.map(item => `- ${item}`).join('\n');
  }

  private parsePromptData(content: string): PromptData {
    return {
      artifact: '',
      provider: '',
      profile: '',
      template: '',
      role: '',
      stack: '',
      project: '',
      objective: '',
      why: '',
      inputData: '',
      examples: '',
      constraints: [],
      outputs: [],
      question: '',
    };
  }
}
