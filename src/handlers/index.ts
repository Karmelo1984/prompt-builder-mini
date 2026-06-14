import type { PromptBuilder } from '../services/PromptBuilder';
import type { Renderer } from '../ui/renderer';

const $ = (id: string): HTMLElement => document.getElementById(id)!;

export function bindEvents(builder: PromptBuilder, renderer: Renderer, fields: string[], updatePrompt: () => void): void {
  // Flujo y tipo
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const flowButton = target.closest('[data-flow]') as HTMLElement | null;
    if (flowButton) {
      const flow = flowButton.dataset.flow!;
      builder.selectFlow(flow);
      renderer.renderTypes();
      renderer.updateFlowBadge();
      renderer.markRecommended();
      builder.setCurrentStep(2);
      renderer.goToStep(2);
      updatePrompt();
      return;
    }

    const typeButton = target.closest('[data-type]') as HTMLElement | null;
    if (typeButton) {
      const type = typeButton.dataset.type!;
      builder.selectType(type);
      const typeData = builder.getPromptTypeData();
      if (typeData) {
        renderer.setFlagValue('role', typeData.role);
        renderer.setFlagValue('objective', typeData.objective);
      }
      renderer.updateTypeBadge();
      renderer.markRecommended();
      builder.setCurrentStep(3);
      renderer.goToStep(3);
      updatePrompt();
      return;
    }
  });

  // Campos de contexto
  fields.forEach(id => {
    const field = $(id) as HTMLInputElement;
    field.addEventListener('input', () => {
      builder.setContextTouched(true);
      updatePrompt();
    });
    field.addEventListener('change', () => {
      renderer.clearChecks('constraints');
      renderer.clearChecks('outputs');
      renderer.showResetNotice(3);
      updatePrompt();
    });
  });

  // Modo compacto
  const compactModeElement = $('compactMode') as HTMLInputElement;
  compactModeElement.addEventListener('change', () => {
    updatePrompt();
  });

  // Restricciones
  const constraintsElement = $('constraints');
  constraintsElement.addEventListener('change', (event) => {
    const label = (event.target as HTMLElement).closest('label');
    if (label) renderer.setCheckboxLabel(label, (event.target as HTMLInputElement).checked);
    renderer.clearChecks('outputs');
    renderer.showResetNotice(4);
    updatePrompt();
  });

  // Salida
  const outputsElement = $('outputs');
  outputsElement.addEventListener('change', (event) => {
    const label = (event.target as HTMLElement).closest('label');
    if (label) renderer.setCheckboxLabel(label, (event.target as HTMLInputElement).checked);
    updatePrompt();
  });

  // Botones de recomendación
  ($('applyRecommendedConstraints') as HTMLElement).addEventListener('click', () => {
    const typeData = builder.getPromptTypeData();
    if (!typeData) return;
    renderer.clearChecks('constraints');
    renderer.setChecked('constraints', typeData.constraints);
    renderer.clearChecks('outputs');
    renderer.showResetNotice(4);
    updatePrompt();
  });

  ($('applyRecommendedOutputs') as HTMLElement).addEventListener('click', () => {
    const typeData = builder.getPromptTypeData();
    if (!typeData) return;
    renderer.clearChecks('outputs');
    renderer.setChecked('outputs', typeData.output);
    updatePrompt();
  });

  // Navegación de pasos
  ($('prevStep') as HTMLElement).addEventListener('click', () => {
    builder.prevStep();
    renderer.goToStep(builder.getState().currentStep);
  });

  ($('nextStep') as HTMLElement).addEventListener('click', () => {
    builder.nextStep();
    renderer.goToStep(builder.getState().currentStep);
  });

  // Acciones del prompt
  ($('copyPrompt') as HTMLElement).addEventListener('click', () => {
    const text = ($('generatedPrompt') as HTMLTextAreaElement).value;
    renderer.copyText(text, 'Prompt copiado');
  });

  ($('copyHandoff') as HTMLElement).addEventListener('click', () => {
    const handoff = `Resume esta conversación para abrir un chat nuevo y ahorrar contexto.\n\nDevuelve máximo 12 bullets técnicos:\n- objetivo\n- stack\n- archivos tocados\n- decisiones tomadas\n- errores pendientes\n- comandos útiles\n- siguiente paso recomendado\n\nNo expliques. Solo handoff reutilizable.`;
    renderer.copyText(handoff, 'Handoff copiado');
  });

  ($('downloadPrompt') as HTMLElement).addEventListener('click', () => {
    const blob = new Blob([($('generatedPrompt') as HTMLTextAreaElement).value], {
      type: 'text/plain;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const filename = builder.getState().selectedType
      ? `prompt-${builder.getState().selectedType}.txt`
      : 'prompt-generado.txt';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  ($('resetAll') as HTMLElement).addEventListener('click', () => {
    // Reset builder state
    builder.reset();

    // Reset UI
    renderer.clearFlagValues(fields);
    ($('compactMode') as HTMLInputElement).checked = false;
    renderer.clearChecks('constraints');
    renderer.clearChecks('outputs');
    renderer.updateFlowBadge();
    renderer.updateTypeBadge();
    document.querySelectorAll('[data-flow], [data-type]').forEach(el => {
      el.classList.remove('active');
    });
    renderer.renderTypes();
    renderer.markRecommended();
    renderer.goToStep(1);
    updatePrompt();
  });

  ($('themeToggle') as HTMLElement).addEventListener('click', () => {
    renderer.toggleTheme();
  });
}
