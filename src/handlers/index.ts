import type { PromptBuilder } from '../services/PromptBuilder';
import type { Renderer } from '../ui/renderer';
import type { BuilderMode } from '../types/index';

const $ = (id: string): HTMLElement => document.getElementById(id)!;

type ResetScope = 'profile' | 'template' | 'context' | 'restrictions';

function resetCascade(
  scope: ResetScope,
  builder: PromptBuilder,
  renderer: Renderer,
  fields: string[]
): void {
  const state = builder.getState();

  if (scope === 'profile') {
    state.reviewRequired.constraints = true;
    state.reviewRequired.outputs = true;
    renderer.markReviewRequired('constraints', true);
    renderer.markReviewRequired('outputs', true);
    renderer.updateTemplateBadge();
    renderer.showResetNotice(1);
  } else if (scope === 'template') {
    state.reviewRequired.constraints = true;
    state.reviewRequired.outputs = true;
    renderer.markReviewRequired('constraints', true);
    renderer.markReviewRequired('outputs', true);
    renderer.showResetNotice(2);
  } else if (scope === 'context') {
    state.reviewRequired.outputs = true;
    renderer.markReviewRequired('outputs', true);
    renderer.showResetNotice(3);
  } else {
    state.reviewRequired.outputs = true;
    renderer.markReviewRequired('outputs', true);
    renderer.showResetNotice(4);
  }
}

export function bindEvents(builder: PromptBuilder, renderer: Renderer, fields: string[], updatePrompt: () => void, mode: BuilderMode): void {
  // Artefacto y proveedor
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const artifactButton = target.closest('[data-artifact]') as HTMLElement | null;
    if (artifactButton) {
      const artifactId = artifactButton.dataset.artifact!;
      builder.selectArtifact(artifactId);
      document.querySelectorAll('[data-artifact]').forEach(el => el.classList.remove('active'));
      artifactButton.classList.add('active');
      renderer.renderProviders();
      renderer.updateArtifactBadge();
      builder.setCurrentStep(2);
      renderer.goToStep(2);
      updatePrompt();
      return;
    }

    const providerButton = target.closest('[data-provider]') as HTMLElement | null;
    if (providerButton) {
      const providerId = providerButton.dataset.provider!;
      builder.selectProvider(providerId);
      document.querySelectorAll('[data-provider]').forEach(el => el.classList.remove('active'));
      providerButton.classList.add('active');
      renderer.updateProviderBadge();
      builder.setCurrentStep(3);
      renderer.goToStep(3);
      updatePrompt();
      return;
    }
  });

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
      builder.setCurrentStep(4);
      renderer.goToStep(4);
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
        renderer.setChecked('constraints', templateData.recommendedRestrictions ?? []);
        renderer.setChecked('outputs', templateData.recommendedOutputs ?? []);
        renderer.renderContextFields(templateData.requiredContextFields);
      }
      renderer.updateTemplateBadge();
      renderer.markRecommended();
      builder.setCurrentStep(5);
      renderer.goToStep(5);
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

  // Navegación a través de step-pills
  document.querySelectorAll('.step-pill').forEach(pill => {
    (pill as HTMLElement).addEventListener('click', (event) => {
      const target = event.currentTarget as HTMLElement;
      const stepStr = target.getAttribute('data-step');
      if (!stepStr) return;
      const step = parseInt(stepStr, 10);

      if (renderer.canNavigateTo(step)) {
        builder.setCurrentStep(step);
        renderer.goToStep(step);
        updatePrompt();
      }
    });
  });

  // Navegación de pasos
  ($('prevStep') as HTMLElement).addEventListener('click', () => {
    const fromStep = builder.getState().currentStep;
    if (fromStep === 2) {
      document.querySelectorAll('[data-artifact]').forEach(el => el.classList.remove('active'));
      renderer.updateArtifactBadge();
      renderer.renderProviders();
    } else if (fromStep === 3) {
      document.querySelectorAll('[data-provider]').forEach(el => el.classList.remove('active'));
      renderer.updateProviderBadge();
      document.querySelectorAll('[data-profile]').forEach(el => el.classList.remove('active'));
      renderer.renderTemplates();
      renderer.clearChecks('constraints');
      renderer.clearChecks('outputs');
    } else if (fromStep === 4) {
      resetCascade('template', builder, renderer, fields);
    } else if (fromStep === 5) {
      resetCascade('context', builder, renderer, fields);
    } else if (fromStep === 6) {
      resetCascade('restrictions', builder, renderer, fields);
    }
    builder.prevStep();
    renderer.goToStep(builder.getState().currentStep);
    updatePrompt();
  });

  ($('nextStep') as HTMLElement).addEventListener('click', () => {
    const currentStep = builder.getState().currentStep;
    if (mode === 'quick' && currentStep === 5) {
      const templateData = builder.getPromptTemplateData();
      if (templateData) {
        renderer.clearChecks('constraints');
        renderer.setChecked('constraints', templateData.recommendedRestrictions ?? []);
        renderer.clearChecks('outputs');
        renderer.setChecked('outputs', templateData.recommendedOutputs ?? []);
        updatePrompt();
      }
      return;
    }
    const nextStep = currentStep + 1;
    if (renderer.canNavigateTo(nextStep)) {
      builder.nextStep();
      renderer.goToStep(builder.getState().currentStep);
    }
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
    renderer.markReviewRequired('constraints', false);
    renderer.markReviewRequired('outputs', false);
    renderer.updateArtifactBadge();
    renderer.updateProviderBadge();
    renderer.updateProfileBadge();
    renderer.updateTemplateBadge();
    document.querySelectorAll('[data-artifact], [data-provider], [data-profile], [data-template]').forEach(el => {
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
