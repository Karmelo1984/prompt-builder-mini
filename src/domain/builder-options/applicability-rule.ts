import type {
  ArtifactKindId,
  ProviderId,
  ProfileId,
  TemplateId,
  ApplicabilityRuleId,
  ConstraintId,
  OutputFormatId,
  ContextFieldId
} from '../catalog/catalog-types';

export type ApplicabilityRuleStatus = 'active' | 'inactive' | 'deprecated';
export type ApplicabilityRuleImportance = 'critical' | 'high' | 'medium' | 'low';

export interface ApplicabilityRule {
  id: ApplicabilityRuleId;
  targetId: ConstraintId | OutputFormatId | ContextFieldId;
  targetKind: 'constraint' | 'output-format' | 'context-field';

  artifactKinds?: ArtifactKindId[];
  providers?: ProviderId[];
  profileIds?: ProfileId[];
  templateIds?: TemplateId[];
  modes?: string[];

  importance: ApplicabilityRuleImportance;
  defaultVisible: boolean;
  defaultSelected: boolean;
  sortOrder: number;
  status: ApplicabilityRuleStatus;

  label?: string;
  description?: string;
}
