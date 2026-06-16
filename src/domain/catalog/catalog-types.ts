// ID type aliases - dinámicos, abertos a cualquier string
export type ArtifactKindId = string;
export type ProviderId = string;
export type ProfileId = string;
export type TemplateId = string;
export type ContextFieldId = string;
export type ConstraintId = string;
export type OutputFormatId = string;
export type ApplicabilityRuleId = string;

// Tipos base del catálogo
export interface ProfileItem {
  label: string;
  description: string;
  recommendedTemplates?: string[];
  recommendedRestrictions?: string[];
  recommendedOutputs?: string[];
}

export interface PromptTemplateItem {
  label: string;
  description: string;
  profileId: string;
  role: string;
  objective: string;
  recommendedRestrictions?: string[];
  recommendedOutputs?: string[];
  question: string;
}

export interface ArtifactKindItem {
  id: ArtifactKindId;
  label: string;
  description: string;
}

export interface ProviderItem {
  id: ProviderId;
  label: string;
  description?: string;
}

export interface ProviderCapabilityItem {
  id: string;
  label: string;
  description?: string;
}

export interface ContextFieldItem {
  id: ContextFieldId;
  label: string;
  description?: string;
  type?: string;
}

export interface ConstraintItem {
  id: ConstraintId;
  label?: string;
  description: string;
}

export interface OutputFormatItem {
  id: OutputFormatId;
  label?: string;
  description: string;
}

// Catálogo completo (bundle)
export interface CatalogBundle {
  artifactKinds?: Record<ArtifactKindId, ArtifactKindItem>;
  providers?: Record<ProviderId, ProviderItem>;
  providerCapabilities?: Record<string, ProviderCapabilityItem>;
  providerEquivalents?: Record<string, unknown>;
  compatibility?: Record<string, unknown>;
  profiles: Record<ProfileId, ProfileItem>;
  templates: Record<TemplateId, PromptTemplateItem>;
  constraints: Record<ConstraintId, string>;
  outputs: Record<OutputFormatId, string>;
  contextFields?: Record<ContextFieldId, ContextFieldItem>;
  contextFieldRules?: Record<string, unknown>;
  constraintRules?: Record<string, unknown>;
  outputFormatRules?: Record<string, unknown>;
  tips?: string[];
}

// Catálogo normalizado (índices para acceso rápido)
export interface CatalogIndex {
  artifactKindsById: Map<ArtifactKindId, ArtifactKindItem>;
  providersById: Map<ProviderId, ProviderItem>;
  profilesById: Map<ProfileId, ProfileItem>;
  templatesById: Map<TemplateId, PromptTemplateItem>;
  templatesByProfileId: Map<ProfileId, TemplateId[]>;
  contextFieldsById: Map<ContextFieldId, ContextFieldItem>;
  constraintsById: Map<ConstraintId, string>;
  outputFormatsById: Map<OutputFormatId, string>;
  contextFieldRules?: Record<string, unknown>;
  constraintRules?: Record<string, unknown>;
  outputFormatRules?: Record<string, unknown>;
  providerCompatibility?: Record<string, unknown>;
  providerEquivalents?: Record<string, unknown>;
}

// Read model - vista completa del catálogo
export interface CatalogReadModel extends CatalogIndex {
  // Hereda todos los índices y añade acceso directo a rules
}

export interface CatalogValidationError {
  type:
    | 'duplicate-profile-id'
    | 'duplicate-template-id'
    | 'duplicate-constraint-id'
    | 'duplicate-output-id'
    | 'invalid-profile-ref'
    | 'uncovered-profile'
    | 'missing-required-field'
    | 'invalid-string-field';
  message: string;
  details?: string[];
}

export interface CatalogValidationResult {
  isValid: boolean;
  errors: CatalogValidationError[];
}
