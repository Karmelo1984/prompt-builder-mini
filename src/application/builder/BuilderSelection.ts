import type { ProfileId, TemplateId } from '../../domain/catalog/catalog-types';

export interface BuilderSelection {
  artifactKind?: string;
  provider?: string;
  profileId: ProfileId | null;
  templateId: TemplateId | null;
  mode?: string;
}
