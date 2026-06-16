import { AiProvider } from '../providers/AiProvider';
import { ArtifactKind } from './ArtifactKind';

export enum ArtifactExportTarget {
  CopyText = 'copy_text',
  Files = 'files',
  Download = 'download',
}

export interface ArtifactExportFile {
  name: string;
  content: string;
  mimeType?: string;
}

export interface ArtifactExportInput {
  content: string;
  kind: ArtifactKind;
  provider: AiProvider;
  fileName?: string;
}

export interface ArtifactExportResult {
  target: ArtifactExportTarget;
  copyText?: string;
  files?: ArtifactExportFile[];
  warnings?: string[];
  provider: AiProvider;
  artifactKind: ArtifactKind;
}

export interface ArtifactExporter {
  export(input: ArtifactExportInput): Promise<ArtifactExportResult>;
  canExport(kind: ArtifactKind, provider: AiProvider): boolean;
}
