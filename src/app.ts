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

function goToBuilder(): void {
  const landingView = document.getElementById('landingView');
  const builderView = document.getElementById('builderView');
  const appHeader = document.getElementById('appHeader');
  const appTitle = document.getElementById('appTitle');
  const appLead = document.getElementById('appLead');

  if (landingView) landingView.style.display = 'none';
  if (builderView) builderView.style.display = 'flex';
  if (appTitle) appTitle.textContent = 'AI Prompt & Workflow Builder';
  if (appLead) appLead.textContent = 'En V1 se generan prompts optimizados para GPT, Claude y Claude Code sin mezclar decisiones, contexto, restricciones ni formato de salida.';
}

function goToLanding(): void {
  const landingView = document.getElementById('landingView');
  const builderView = document.getElementById('builderView');
  const appTitle = document.getElementById('appTitle');
  const appLead = document.getElementById('appLead');

  if (landingView) landingView.style.display = 'block';
  if (builderView) builderView.style.display = 'none';
  if (appTitle) appTitle.textContent = 'AI Prompt & Workflow Builder';
  if (appLead) appLead.textContent = 'Construye prompts, instrucciones y flujos reutilizables para trabajar mejor con ChatGPT, Claude, Claude Code y GitHub Copilot.';
}

function bindNavigationEvents(): void {
  const ctaBuilder = document.getElementById('ctaBuilder');
  const ctaBuilderBottom = document.getElementById('ctaBuilderBottom');
  const backToLanding = document.getElementById('backToLanding');

  if (ctaBuilder) ctaBuilder.addEventListener('click', goToBuilder);
  if (ctaBuilderBottom) ctaBuilderBottom.addEventListener('click', goToBuilder);
  if (backToLanding) backToLanding.addEventListener('click', goToLanding);
}

function init(): void {
  const catalogValidation = CatalogRepository.getValidation();
  if (catalogValidation.errors.length > 0) {
    console.error('[CatalogValidator]', catalogValidation.errors);
  }

  bindNavigationEvents();

  const screenModel = buildBuilderScreenModel(builder.getState(), catalogIndex, optionsRepository);
  const artifactKinds = bundle.artifactKinds || {};
  const providers = bundle.providers || {};
  const compatibility = (bundle.compatibility as Record<string, string[]>) || {};

  renderer.setCompatibility(compatibility);
  renderer.setProviders(providers);
  renderer.setArtifactKinds(artifactKinds);
  renderer.setTemplates(screenModel.catalogs.templates);
  renderer.renderArtifacts(artifactKinds);
  renderer.renderProviders(providers, compatibility);
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

  const artifact = state.selectedArtifact || 'prompt';
  const provider = state.selectedProvider || 'claude';
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
    artifact,
    provider,
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
