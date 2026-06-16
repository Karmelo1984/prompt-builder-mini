import type { PromptData } from './types/index';
import { CatalogRepository } from './domain/catalog/catalog-repository';
import { LocalBuilderOptionsRepository } from './infrastructure/builder-options/local-builder-options-repository';
import { buildBuilderScreenModel } from './application/builder/buildBuilderScreenModel';
import { PromptBuilder } from './services/PromptBuilder';
import { Renderer } from './ui/renderer';
import { bindEvents } from './handlers/index';

const builder = new PromptBuilder();
const renderer = new Renderer(builder);
const bundle = CatalogRepository.getBundle();
const catalogIndex = CatalogRepository.getIndex();
const optionsRepository = new LocalBuilderOptionsRepository(catalogIndex);

const fields = ['stack', 'role', 'project', 'objective', 'why', 'inputData', 'examples'];

function init(): void {
  const catalogValidation = CatalogRepository.getValidation();
  if (catalogValidation.errors.length > 0) {
    console.error('[CatalogValidator]', catalogValidation.errors);
  }
  const screenModel = buildBuilderScreenModel(builder.getState(), catalogIndex, optionsRepository);
  renderer.renderProfiles(screenModel.catalogs.profiles);
  renderer.renderTemplates(screenModel.catalogs.templates);
  renderer.renderChecks('constraints', screenModel.catalogs.constraints);
  renderer.renderChecks('outputs', screenModel.catalogs.outputFormats);
  renderer.renderTips(bundle.tips);
  renderer.renderFooter();
  bindEvents(builder, renderer, fields, updatePrompt);
  renderer.goToStep(1);
  updatePrompt();
}

function updatePrompt(): void {
  const state = builder.getState();
  const templateData = builder.getPromptTemplateData();
  const compact = renderer.isCompactMode();

  const profile = builder.getProfileLabel();
  const template = builder.getTemplateLabel();
  const role = renderer.getFlagValue('role') || templateData?.role || '[rol técnico concreto]';
  const stack = renderer.getFlagValue('stack');
  const project = renderer.getFlagValue('project');
  const objective = renderer.getFlagValue('objective') || templateData?.objective || '[objetivo concreto]';
  const why = renderer.getFlagValue('why');
  const inputData = renderer.getFlagValue('inputData');
  const examples = renderer.getFlagValue('examples');
  const screenModel = buildBuilderScreenModel(state, catalogIndex, optionsRepository);
  const constraints = renderer.getChecked('constraints').map(k => screenModel.catalogs.constraints[k]);
  const outputs = renderer.getChecked('outputs').map(k => screenModel.catalogs.outputFormats[k]);
  const question =
    templateData?.question || '¿Cuál es la respuesta correcta con el mínimo contexto necesario y cómo la verifico?';

  const data: PromptData = {
    profile,
    template,
    role,
    stack,
    project,
    objective,
    why,
    inputData,
    examples,
    constraints,
    outputs,
    question
  };

  const prompt = builder.buildPrompt(data, compact);

  renderer.updatePromptText(prompt);
  renderer.updateQualityChecks({
    role,
    stack,
    project,
    objective,
    why,
    inputData,
    constraints,
    outputs,
    examples
  });
  renderer.goToStep(state.currentStep);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
