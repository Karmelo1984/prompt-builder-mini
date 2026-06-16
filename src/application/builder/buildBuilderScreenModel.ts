import type { AppState } from '../../types/index';
import type { CatalogIndex } from '../../domain/catalog/catalog-types';
import type { BuilderOptionsRepository } from '../../infrastructure/builder-options';
import type { BuilderScreenModel } from './BuilderScreenModel';
import type { BuilderSelection } from './BuilderSelection';
import type { BuilderState } from './BuilderState';

export function buildBuilderScreenModel(
  appState: AppState,
  catalogIndex: CatalogIndex,
  builderOptionsRepository: BuilderOptionsRepository
): BuilderScreenModel {
  const state: BuilderState = {
    currentStep: appState.currentStep,
    contextTouched: appState.contextTouched
  };

  const selection: BuilderSelection = {
    profileId: appState.selectedProfile,
    templateId: appState.selectedTemplate
  };

  const resolvedOptions = builderOptionsRepository.resolve({
    profileId: appState.selectedProfile ?? undefined,
    templateId: appState.selectedTemplate ?? undefined
  });

  const warnings: string[] = [];
  if (appState.selectedProfile && !catalogIndex.profilesById.has(appState.selectedProfile)) {
    warnings.push(`Profile "${appState.selectedProfile}" not found in catalog`);
  }
  if (appState.selectedTemplate && !catalogIndex.templatesById.has(appState.selectedTemplate)) {
    warnings.push(`Template "${appState.selectedTemplate}" not found in catalog`);
  }

  const canGeneratePrompt = Boolean(
    appState.selectedProfile &&
    appState.selectedTemplate &&
    resolvedOptions.constraints.size > 0 &&
    resolvedOptions.outputFormats.size > 0
  );

  return {
    state,
    selection,
    catalogs: {
      profiles: Object.fromEntries(catalogIndex.profilesById),
      templates: Object.fromEntries(catalogIndex.templatesById),
      constraints: Object.fromEntries(catalogIndex.constraintsById),
      outputFormats: Object.fromEntries(catalogIndex.outputFormatsById),
      contextFields: Object.fromEntries(catalogIndex.contextFieldsById)
    },
    resolvedOptions,
    warnings,
    canGeneratePrompt
  };
}
