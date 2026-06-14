import type { PromptData, QualityCheckData } from './types/index';
import { promptTypes, constraintCatalog, outputCatalog } from './data/catalogs';
import { PromptBuilder } from './services/PromptBuilder';
import { Renderer } from './ui/renderer';
import { bindEvents } from './handlers/index';

const builder = new PromptBuilder();
const renderer = new Renderer(builder);

const fields = ['stack', 'role', 'project', 'objective', 'why', 'inputData', 'examples'];

function init(): void {
  renderer.renderFlows();
  renderer.renderTypes();
  renderer.renderChecks('constraints', constraintCatalog);
  renderer.renderChecks('outputs', outputCatalog);
  renderer.renderTips();
  renderer.renderFooter();
  bindEvents(builder, renderer, fields, updatePrompt);
  renderer.goToStep(1);
  updatePrompt();
}

function updatePrompt(): void {
  const state = builder.getState();
  const typeData = builder.getPromptTypeData();
  const compact = renderer.isCompactMode();

  const role = renderer.getFlagValue('role') || typeData?.role || '[rol técnico concreto]';
  const stack = renderer.getFlagValue('stack');
  const project = renderer.getFlagValue('project');
  const objective = renderer.getFlagValue('objective') || typeData?.objective || '[objetivo concreto]';
  const why = renderer.getFlagValue('why');
  const inputData = renderer.getFlagValue('inputData');
  const examples = renderer.getFlagValue('examples');
  const constraints = renderer.getChecked('constraints').map(k => constraintCatalog[k]);
  const outputs = renderer.getChecked('outputs').map(k => outputCatalog[k]);
  const question =
    typeData?.question || '¿Cuál es la respuesta correcta con el mínimo contexto necesario y cómo la verifico?';

  const data: PromptData = {
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

init();
