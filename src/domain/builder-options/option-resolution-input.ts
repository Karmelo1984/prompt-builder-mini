import type { ArtifactKindId, ProviderId, ProfileId, TemplateId } from '../catalog/catalog-types';

export interface OptionResolutionInput {
  artifactKind?: ArtifactKindId;
  provider?: ProviderId;
  profileId?: ProfileId;
  templateId?: TemplateId;
  mode?: string;
}
