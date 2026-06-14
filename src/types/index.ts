export interface AppState {
  currentStep: number;
  selectedProfile: string | null;
  selectedTemplate: string | null;
  contextTouched: boolean;
}

export interface PromptData {
  role: string;
  stack: string;
  project: string;
  objective: string;
  why: string;
  inputData: string;
  examples: string;
  constraints: string[];
  outputs: string[];
  question: string;
}

export interface QualityCheckData {
  role: string;
  stack: string;
  project: string;
  objective: string;
  why: string;
  inputData: string;
  constraints: string[];
  outputs: string[];
  examples: string;
}

export interface FlowCatalogItem {
  label: string;
  short: string;
  types: string[];
}

export interface PromptTypeItem {
  label: string;
  short: string;
  role: string;
  objective: string;
  output: string[];
  constraints: string[];
  question: string;
}

export type FlowCatalog = Record<string, FlowCatalogItem>;
export type PromptTypes = Record<string, PromptTypeItem>;
export type ConstraintCatalog = Record<string, string>;
export type OutputCatalog = Record<string, string>;

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

export type ProfileCatalog = Record<string, ProfileItem>;
export type PromptTemplateCatalog = Record<string, PromptTemplateItem>;
