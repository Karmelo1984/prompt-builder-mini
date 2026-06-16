export interface CatalogBundle {
  artifactKinds?: Record<string, unknown>;
  providers?: Record<string, unknown>;
  providerCapabilities?: Record<string, unknown>;
  providerEquivalents?: Record<string, unknown>;
  compatibility?: Record<string, unknown>;
  profiles: Record<string, ProfileItem>;
  templates: Record<string, PromptTemplateItem>;
  constraints: Record<string, string>;
  outputs: Record<string, string>;
  contextFields?: Record<string, unknown>;
  tips?: string[];
}

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

export interface CatalogIndex {
  artifactKindsById?: Map<string, unknown>;
  providersById?: Map<string, unknown>;
  profilesById: Map<string, ProfileItem>;
  templatesById: Map<string, PromptTemplateItem>;
  templatesByProfileId: Map<string, string[]>;
  constraintsById: Map<string, string>;
  outputsById: Map<string, string>;
  contextFieldsById?: Map<string, unknown>;
  compatibilityByProviderAndArtifact?: Map<string, unknown>;
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
