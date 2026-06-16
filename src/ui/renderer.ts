import type { PromptBuilder } from '../services/PromptBuilder';
import { appInfo } from '../config/app-info';

const $ = (id: string): HTMLElement => {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`DOM element with id="${id}" not found`);
  }
  return element;
};

type FlowState = 'pending' | 'current' | 'completed' | 'locked';

interface FlowSection {
  id: number;
  title: string;
  state: FlowState;
  isAccessible: boolean;
}

export class Renderer {
  private resetNoticeTimer: number | null = null;
  private compatibility: Record<string, string[]> = {};
  private providers: Record<string, { id: string; label: string; description?: string }> = {};
  private artifactKinds: Record<string, { id: string; label: string; description: string }> = {};
  private templates: Record<string, { label: string; description: string; profileId: string }> = {};

  constructor(private builder: PromptBuilder) {}

  setCompatibility(compatibility: Record<string, string[]>): void {
    this.compatibility = compatibility;
  }

  setProviders(providers: Record<string, { id: string; label: string; description?: string }>): void {
    this.providers = providers;
  }

  setArtifactKinds(artifactKinds: Record<string, { id: string; label: string; description: string }>): void {
    this.artifactKinds = artifactKinds;
  }

  setTemplates(templates: Record<string, { label: string; description: string; profileId: string }>): void {
    this.templates = templates;
  }

  private getFlowSectionState(sectionId: number): FlowState {
    const state = this.builder.getState();
    const currentStep = state.currentStep;

    if (sectionId === currentStep) return 'current';
    if (sectionId < currentStep) {
      if (this.isStepCompleteForRender(sectionId)) return 'completed';
      return 'pending';
    }
    if (sectionId > currentStep) {
      if (this.isStepAccessible(sectionId)) return 'pending';
      return 'locked';
    }
    return 'pending';
  }

  private isStepAccessible(step: number): boolean {
    const state = this.builder.getState();
    if (step <= state.currentStep) return true;

    // Un paso es accesible si todos los anteriores están completos
    for (let i = 1; i < step; i++) {
      if (!this.isStepCompleteForRender(i)) return false;
    }
    return true;
  }

  updateFlowState(): void {
    const state = this.builder.getState();
    document.querySelectorAll('[data-section]').forEach(section => {
      const sectionId = Number((section as HTMLElement).dataset.section);
      const flowState = this.getFlowSectionState(sectionId);

      section.classList.remove('pending', 'current', 'completed', 'locked');
      section.classList.add(flowState);

      if (flowState === 'current') {
        section.setAttribute('aria-current', 'step');
      } else {
        section.removeAttribute('aria-current');
      }

      if (flowState === 'locked') {
        (section as HTMLButtonElement).disabled = true;
      } else {
        (section as HTMLButtonElement).disabled = false;
      }
    });
  }

  canNavigateTo(step: number): boolean {
    if (step < 1 || step > 7) return false;
    return this.isStepAccessible(step);
  }

  renderArtifacts(artifacts?: Record<string, { id: string; label: string; description: string }>): void {
    const artifactGrid = $('artifactGrid');
    if (!artifacts) return;
    const selected = this.builder.getState().selectedArtifact;
    artifactGrid.innerHTML = Object.entries(artifacts)
      .map(
        ([key, item]) => {
          const isDisabled = key !== 'prompt';
          const isSelected = key === selected;
          return `
    <button class="flow-card selection-card ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''}" type="button" data-artifact="${key}" ${isDisabled ? 'disabled' : ''} role="option" aria-selected="${isSelected}">
      <strong>${item.label}</strong>
      <small>${item.description}</small>
      ${isSelected ? '<span class="selection-indicator">✓</span>' : ''}
    </button>
  `;
        }
      )
      .join('');
  }

  renderProviders(providers?: Record<string, { id: string; label: string; description?: string }>, compatibility?: Record<string, string[]>): void {
    const providerGrid = $('providerGrid');
    const providersToUse = providers || this.providers;
    if (!providersToUse) {
      return;
    }
    const state = this.builder.getState();
    const selectedArtifact = state.selectedArtifact;
    const selectedProvider = state.selectedProvider;
    const compatMap = compatibility || this.compatibility;


    // Mostrar todos los proveedores, pero marcar como disabled solo si hay un artefacto seleccionado
    // y no es compatible. Si no hay artefacto seleccionado, mostrar todo habilitado para seleccionar.
    const allowedProviders = selectedArtifact ? (compatMap[selectedArtifact] || []) : Object.keys(providersToUse);

    const html = Object.entries(providersToUse)
      .map(
        ([key, item]) => {
          const isAllowed = allowedProviders.includes(key);
          const isDisabled = !isAllowed;
          const isSelected = key === selectedProvider;
          return `
    <button class="flow-card selection-card ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''}" type="button" data-provider="${key}" ${isDisabled ? 'disabled' : ''} role="option" aria-selected="${isSelected}">
      <strong>${item.label}</strong>
      <small>${item.description || ''}</small>
      ${isSelected ? '<span class="selection-indicator">✓</span>' : ''}
    </button>
  `;
        }
      )
      .join('');

    providerGrid.innerHTML = html;
  }

  renderProfiles(profiles?: Record<string, { label: string; description: string }>): void {
    const profileGrid = $('profileGrid');
    if (!profiles) return;
    const selected = this.builder.getState().selectedProfile;
    profileGrid.innerHTML = Object.entries(profiles)
      .map(
        ([key, item]) => {
          const isSelected = key === selected;
          return `
    <button class="flow-card selection-card ${isSelected ? 'selected' : ''}" type="button" data-profile="${key}" role="option" aria-selected="${isSelected}">
      <strong>${item.label}</strong>
      <small>${item.description}</small>
      ${isSelected ? '<span class="selection-indicator">✓</span>' : ''}
    </button>
  `;
        }
      )
      .join('');
  }

  renderTemplates(templates?: Record<string, { label: string; description: string; profileId: string }>): void {
    const templateGrid = $('templateGrid');
    const selected = this.builder.getState().selectedTemplate;
    if (!this.builder.getState().selectedProfile) {
      templateGrid.innerHTML = '<p class="muted">Selecciona primero un perfil para ver sus plantillas.</p>';
      return;
    }
    const templatesToUse = templates || this.templates;
    if (!templatesToUse) return;
    const allowed = this.builder.getAllowedTemplates();
    templateGrid.innerHTML = allowed
      .map((key: string) => {
        const item = templatesToUse[key];
        const isSelected = key === selected;
        return `
      <button class="type-card selection-card ${isSelected ? 'selected' : ''}" type="button" data-template="${key}" role="option" aria-selected="${isSelected}">
        <strong>${item.label}</strong>
        <small>${item.description}</small>
        ${isSelected ? '<span class="selection-indicator">✓</span>' : ''}
      </button>
    `;
      })
      .join('');
  }

  renderChecks(containerId: string, catalog: Record<string, string>): void {
    const container = $(containerId);
    container.innerHTML = Object.entries(catalog)
      .map(
        ([key, label]) => `
    <label data-key="${key}"><input type="checkbox" value="${key}"> ${label}</label>
  `
      )
      .join('');
  }

  renderTips(tips?: string[]): void {
    const tipsList = $('tipsList');
    if (!tips) return;
    tipsList.innerHTML = tips.map((t: string) => `<li>${t}</li>`).join('');
  }

  updateArtifactBadge(): void {
    const state = this.builder.getState();
    const label = state.selectedArtifact === 'prompt' ? 'Prompt' :
                  state.selectedArtifact === 'skill' ? 'Skill' :
                  state.selectedArtifact === 'hook' ? 'Hook' : 'Sin seleccionar';
    ($('artifactBadge') as HTMLElement).textContent = label;
  }

  updateProviderBadge(): void {
    const state = this.builder.getState();
    const providers: Record<string, string> = {
      chatgpt: 'ChatGPT',
      claude: 'Claude',
      claude_code: 'Claude Code',
      github_copilot: 'GitHub Copilot'
    };
    const label = state.selectedProvider ? providers[state.selectedProvider] || 'Sin seleccionar' : 'Sin seleccionar';
    ($('providerBadge') as HTMLElement).textContent = label;
  }

  updateProfileBadge(): void {
    ($('profileBadge') as HTMLElement).textContent = this.builder.getProfileLabel();
  }

  updateTemplateBadge(): void {
    ($('templateBadge') as HTMLElement).textContent = this.builder.getTemplateLabel();
  }

  goToStep(step: number): void {
    const state = this.builder.getState();
    document.querySelectorAll('.step-screen').forEach(screen => {
      screen.classList.toggle('active', Number((screen as HTMLElement).dataset.screen) === step);
    });
    document.querySelectorAll('.step-pill').forEach(pill => {
      const value = Number((pill as HTMLElement).dataset.step);
      pill.classList.toggle('active', value === step);
      pill.classList.toggle('completed', value < step && this.isStepCompleteForRender(value));
    });
    ($('prevStep') as HTMLButtonElement).disabled = step === 1;
    ($('nextStep') as HTMLButtonElement).disabled = step === 7;
    this.updateFlowState();
  }

  private isStepCompleteForRender(step: number): boolean {
    const val = (id: string): string => ($(id) as HTMLInputElement).value.trim();
    const getChecked = (containerId: string): string[] =>
      [...document.querySelectorAll(`#${containerId} input:checked`)].map(i => (i as HTMLInputElement).value);

    const state = this.builder.getState();
    if (step === 1) return Boolean(state.selectedArtifact);
    if (step === 2) return Boolean(state.selectedProvider);
    if (step === 3) return Boolean(state.selectedProfile);
    if (step === 4) return Boolean(state.selectedTemplate);
    if (step === 5) return Boolean(val('role') && val('objective'));
    if (step === 6) return getChecked('constraints').length > 0;
    if (step === 7) return getChecked('outputs').length > 0;
    return false;
  }

  updatePromptText(text: string): void {
    ($('generatedPrompt') as HTMLTextAreaElement).value = text;
    this.updateStats(text);
  }

  private updateStats(text: string): void {
    const chars = text.length;
    const approxTokens = Math.ceil(chars / 4);
    ($('charCount') as HTMLElement).textContent = `${chars.toLocaleString('es-ES')} chars`;
    ($('tokenEstimate') as HTMLElement).textContent = `~${approxTokens.toLocaleString('es-ES')} tokens`;
  }

  updateQualityChecks(data: {
    role: string;
    stack: string;
    project: string;
    objective: string;
    why: string;
    inputData: string;
    constraints: string[];
    outputs: string[];
    examples: string;
  }): void {
    const checks = this.builder.getQualityChecks({
      role: data.role,
      stack: data.stack,
      objective: data.objective,
      why: data.why,
      inputData: data.inputData,
      constraints: data.constraints,
      outputs: data.outputs
    });

    ($('qualityChecks') as HTMLElement).innerHTML = checks
      .map(
        ([label, ok]) => `
    <div class="quality-item ${ok ? 'ok' : 'warn'}">
      <span>${ok ? '✓' : '!'}</span>
      <span>${label}</span>
    </div>
  `
      )
      .join('');
  }

  markRecommended(): void {
    document.querySelectorAll('#constraints label, #outputs label').forEach(label => {
      label.classList.remove('recommended');
    });
    const templateData = this.builder.getPromptTemplateData();
    if (!templateData) return;
    (templateData.recommendedRestrictions ?? []).forEach((key: string) => {
      const elem = document.querySelector(`#constraints label[data-key="${key}"]`);
      if (elem) elem.classList.add('recommended');
    });
    (templateData.recommendedOutputs ?? []).forEach((key: string) => {
      const elem = document.querySelector(`#outputs label[data-key="${key}"]`);
      if (elem) elem.classList.add('recommended');
    });
  }

  clearChecks(containerId: string): void {
    document.querySelectorAll(`#${containerId} input`).forEach(input => {
      (input as HTMLInputElement).checked = false;
    });
    document.querySelectorAll(`#${containerId} label`).forEach(label => {
      label.classList.remove('active');
    });
  }

  setChecked(containerId: string, selected: string[]): void {
    document.querySelectorAll(`#${containerId} input`).forEach(input => {
      const checked = selected.includes((input as HTMLInputElement).value);
      (input as HTMLInputElement).checked = checked;
      input.closest('label')?.classList.toggle('active', checked);
    });
  }

  getChecked(containerId: string): string[] {
    return [...document.querySelectorAll(`#${containerId} input:checked`)].map(i => (i as HTMLInputElement).value);
  }

  showResetNotice(step: number): void {
    if (step >= 5) return;
    const notice = $('resetNotice') as HTMLElement;
    const messages: Record<number, string> = {
      1: 'Pasos posteriores limpiados.',
      2: 'Contexto, restricciones y salida limpiados.',
      3: 'Restricciones y salida limpiadas.',
      4: 'Salida requerida limpiada.'
    };
    notice.textContent = messages[step] || '';
    if (this.resetNoticeTimer !== null) window.clearTimeout(this.resetNoticeTimer);
    this.resetNoticeTimer = window.setTimeout(() => {
      notice.textContent = '';
      this.resetNoticeTimer = null;
    }, 1600);
  }

  setCheckboxLabel(label: HTMLElement, checked: boolean): void {
    label.classList.toggle('active', checked);
  }

  toggleTheme(): void {
    document.body.classList.toggle('light');
    ($('themeToggle') as HTMLElement).textContent = document.body.classList.contains('light')
      ? 'Modo oscuro'
      : 'Modo claro';
  }

  async copyText(text: string, okLabel: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.flash($('copyPrompt') as HTMLElement, okLabel);
    } catch {
      const generatedPrompt = $('generatedPrompt') as HTMLTextAreaElement;
      generatedPrompt.removeAttribute('readonly');
      generatedPrompt.select();
      document.execCommand('copy');
      generatedPrompt.setAttribute('readonly', 'readonly');
      this.flash($('copyPrompt') as HTMLElement, okLabel);
    }
  }

  private flash(element: HTMLElement, message: string): void {
    const old = element.textContent || '';
    element.textContent = message;
    setTimeout(() => (element.textContent = old), 1200);
  }

  getFlagValue(fieldId: string): string {
    return ($(fieldId) as HTMLInputElement).value.trim();
  }

  setFlagValue(fieldId: string, value: string): void {
    ($(fieldId) as HTMLInputElement).value = value;
  }

  clearFlagValues(fieldIds: string[]): void {
    fieldIds.forEach(id => {
      ($(id) as HTMLInputElement).value = '';
    });
  }

  isCompactMode(): boolean {
    return ($('compactMode') as HTMLInputElement).checked;
  }

  renderFooter(): void {
    const footerAuthor = $('footerAuthor') as HTMLElement;
    const footerVersion = $('footerVersion') as HTMLElement;
    const footerRepo = $('footerRepo') as HTMLAnchorElement;

    const formattedDate = new Date(appInfo.versionDate).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    footerAuthor.textContent = `© ${new Date().getFullYear()} ${appInfo.author}`;
    footerVersion.textContent = `v${appInfo.version} (${formattedDate})`;
    footerRepo.textContent = 'GitHub';
    footerRepo.href = appInfo.repository;
  }
}
