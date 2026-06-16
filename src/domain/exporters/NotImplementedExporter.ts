import type { ArtifactExporter, ArtifactExportInput, ArtifactExportResult } from '../artifacts';
import { ArtifactExportTarget } from '../artifacts';
import { ArtifactKind } from '../artifacts/ArtifactKind';
import { AiProvider } from '../providers/AiProvider';

export abstract class NotImplementedExporter implements ArtifactExporter {
  protected abstract readonly supportedKind: ArtifactKind;
  protected abstract readonly targetProvider: AiProvider;
  protected abstract readonly exporterName: string;

  async export(input: ArtifactExportInput): Promise<ArtifactExportResult> {
    return {
      target: ArtifactExportTarget.CopyText,
      warnings: [
        `${this.exporterName} aún no está implementado.`,
        `Se espera soporte para ${this.targetProvider} + ${this.supportedKind} en futuras versiones.`,
      ],
      provider: input.provider,
      artifactKind: input.kind,
    };
  }

  canExport(kind: ArtifactKind, provider: AiProvider): boolean {
    return false;
  }
}
