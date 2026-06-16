import type { ProfileItem, PromptTemplateItem } from '../domain/catalog/catalog-types';

export type { ProfileItem, PromptTemplateItem };

export interface AppState {
  currentStep: number;
  selectedProfile: string | null;
  selectedTemplate: string | null;
  contextTouched: boolean;
}

export interface PromptData {
  profile: string;
  template: string;
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

export type ConstraintCatalog = Record<string, string>;
export type OutputCatalog = Record<string, string>;

export type ProfileCatalog = Record<string, ProfileItem>;
export type PromptTemplateCatalog = Record<string, PromptTemplateItem>;
