import type { ProfileItem, PromptTemplateItem } from '../domain/catalog/catalog-types';

export type { ProfileItem, PromptTemplateItem };

export type BuilderMode = 'quick' | 'advanced';

export interface AppState {
  currentStep: number;
  selectedArtifact: string | null;
  selectedProvider: string | null;
  selectedProfile: string | null;
  selectedTemplate: string | null;
  contextTouched: boolean;
  mode: BuilderMode;
  reviewRequired: {
    constraints?: boolean;
    outputs?: boolean;
  };
}

export interface PromptData {
  artifact: string;
  provider: string;
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
  contextFields?: Record<string, string>;
}

export type ProfileCatalog = Record<string, ProfileItem>;
export type PromptTemplateCatalog = Record<string, PromptTemplateItem>;
