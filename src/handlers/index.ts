import type { PromptBuilder } from '../services/PromptBuilder';
import type { Renderer } from '../ui/renderer';

const $ = (id: string): HTMLElement => document.getElementById(id)!;

type ResetScope = 'profile' | 'template' | 'context' | 'restrictions';

function resetCascade(
  scope: ResetScope,
  builder: PromptBuilder,
  renderer: Renderer,
  fields: string[]
): void {
  if (scope === 'profile') {
    renderer.clearFlagValues(fields);
    renderer.clearChecks('constraints');
    renderer.clearChecks('outputs');
    renderer.updateTemplateBadge();
    renderer.showResetNotice(1);
  } else if (scope === 'template') {
    builder.resetContext();
    renderer.clearFlagValues(fields);
    renderer.clearChecks('constraints');
    renderer.clearChecks('outputs');
    renderer.showResetNotice(2);
  } else if (scope === 'context') {
    renderer.clearChecks('constraints');
    renderer.clearChecks('outputs');
    renderer.showResetNotice(3);
  } else {
    renderer.clearChecks('outputs');
    renderer.showResetNotice(4);
  }
}

export function bindEvents(builder: PromptBuilder, renderer: Renderer, fields: string[], updatePrompt: () => void): void {
  // Perfil y plantilla
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const profileButton = target.closest('[data-profile]') as HTMLElement | null;
    if (profileButton) {
      const profileId = profileButton.dataset.profile!;
      const profileChanged = builder.getState().selectedProfile !== profileId;
      builder.selectProfile(profileId);
      document.querySelectorAll('[data-profile]').forEach(el => el.classList.remove('active'));
      profileButton.classList.add('active');
      if (profileChanged) {
        resetCascade('profile', builder, renderer, fields);
      }
      renderer.renderTemplates();
      renderer.updateProfileBadge();
      renderer.markRecommended();
      builder.setCurrentStep(2);
      renderer.goToStep(2);
      updatePrompt();
      return;
    }

    const templateButton = target.closest('[data-template]') as HTMLElement | null;
    if (templateButton) {
      const templateId = templateButton.dataset.template!;
      builder.selectTemplate(templateId);
      const templateData = builder.getPromptTemplateData();
      document.querySelectorAll('[data-template]').forEach(el => el.classList.remove('active'));
      templateButton.classList.add('active');
      resetCascade('template', builder, renderer, fields);
      if (templateData) {
        renderer.setFlagValue('role', templateData.role);
        renderer.setFlagValue('objective', templateData.objective);
      }
      renderer.updateTemplateBadge();
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
      resetCascade('context', builder, renderer, fields);
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
    resetCascade('restrictions', builder, renderer, fields);
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
    const templateData = builder.getPromptTemplateData();
    if (!templateData) return;
    renderer.clearChecks('constraints');
    renderer.setChecked('constraints', templateData.recommendedRestrictions ?? []);
    resetCascade('restrictions', builder, renderer, fields);
    updatePrompt();
  });

  ($('applyRecommendedOutputs') as HTMLElement).addEventListener('click', () => {
    const templateData = builder.getPromptTemplateData();
    if (!templateData) return;
    renderer.clearChecks('outputs');
    renderer.setChecked('outputs', templateData.recommendedOutputs ?? []);
    updatePrompt();
  });

  // Navegación de pasos
  ($('prevStep') as HTMLElement).addEventListener('click', () => {
    const fromStep = builder.getState().currentStep;
    if (fromStep === 2) {
      builder.reset();
      document.querySelectorAll('[data-profile]').forEach(el => el.classList.remove('active'));
      renderer.clearFlagValues(fields);
      renderer.clearChecks('constraints');
      renderer.clearChecks('outputs');
      renderer.updateProfileBadge();
      renderer.updateTemplateBadge();
      renderer.renderTemplates();
      renderer.markRecommended();
    } else if (fromStep === 3) {
      resetCascade('template', builder, renderer, fields);
    } else if (fromStep === 4) {
      resetCascade('context', builder, renderer, fields);
    } else if (fromStep === 5) {
      resetCascade('restrictions', builder, renderer, fields);
    }
    builder.prevStep();
    renderer.goToStep(builder.getState().currentStep);
    updatePrompt();
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
    const filename = builder.getState().selectedTemplate
      ? `prompt-${builder.getState().selectedTemplate}.txt`
      : 'prompt-generado.txt';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  ($('resetAll') as HTMLElement).addEventListener('click', () => {
    builder.reset();
    renderer.clearFlagValues(fields);
    ($('compactMode') as HTMLInputElement).checked = false;
    renderer.clearChecks('constraints');
    renderer.clearChecks('outputs');
    renderer.updateProfileBadge();
    renderer.updateTemplateBadge();
    document.querySelectorAll('[data-profile], [data-template]').forEach(el => {
      el.classList.remove('active');
    });
    renderer.renderTemplates();
    renderer.markRecommended();
    renderer.goToStep(1);
    updatePrompt();
  });

  ($('themeToggle') as HTMLElement).addEventListener('click', () => {
    renderer.toggleTheme();
  });
}
