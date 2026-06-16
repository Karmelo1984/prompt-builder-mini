import type { BuilderState } from './BuilderState';
import type { BuilderSelection } from './BuilderSelection';
import type { ProfileItem, PromptTemplateItem, ContextFieldItem, ConstraintId, OutputFormatId, ContextFieldId } from '../../domain/catalog/catalog-types';
import type { ResolvedBuilderOptions } from '../../domain/builder-options';

export interface BuilderScreenModel {
  state: BuilderState;
  selection: BuilderSelection;

  catalogs: {
    profiles: Record<string, ProfileItem>;
    templates: Record<string, PromptTemplateItem>;
    constraints: Record<ConstraintId, string>;
    outputFormats: Record<OutputFormatId, string>;
    contextFields: Record<ContextFieldId, ContextFieldItem>;
  };

  resolvedOptions: ResolvedBuilderOptions;

  warnings: string[];
  canGeneratePrompt: boolean;
}
