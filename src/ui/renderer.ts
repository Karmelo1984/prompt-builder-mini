import type { PromptBuilder } from '../services/PromptBuilder';
import { flowCatalog, promptTypes, constraintCatalog, outputCatalog, tips } from '../data/catalogs';
import { appInfo } from '../config/app-info';

const $ = (id: string): HTMLElement => document.getElementById(id)!;

export class Renderer {
  constructor(private builder: PromptBuilder) {}

  renderFlows(): void {
    const flowGrid = $('flowGrid');
    flowGrid.innerHTML = Object.entries(flowCatalog)
      .map(
        ([key, item]) => `
    <button class="flow-card" type="button" data-flow="${key}">
      <strong>${item.label}</strong>
      <small>${item.short}</small>
    </button>
  `
      )
      .join('');
  }

  renderTypes(): void {
    const allowed = this.builder.getAllowedTypes();
    const typeGrid = $('typeGrid');
    typeGrid.innerHTML = allowed
      .map(key => {
        const item = promptTypes[key];
        return `
      <button class="type-card" type="button" data-type="${key}">
        <strong>${item.label}</strong>
        <small>${item.short}</small>
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

  renderTips(): void {
    const tipsList = $('tipsList');
    tipsList.innerHTML = tips.map(t => `<li>${t}</li>`).join('');
  }

  updateFlowBadge(): void {
    ($('flowBadge') as HTMLElement).textContent = this.builder.getFlowLabel();
  }

  updateTypeBadge(): void {
    ($('typeBadge') as HTMLElement).textContent = this.builder.getTypeLabel();
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
    ($('nextStep') as HTMLButtonElement).disabled = step === 5;
  }

  private isStepCompleteForRender(step: number): boolean {
    const val = (id: string): string => ($(id) as HTMLInputElement).value.trim();
    const getChecked = (containerId: string): string[] =>
      [...document.querySelectorAll(`#${containerId} input:checked`)].map(i => (i as HTMLInputElement).value);

    if (step === 1) return Boolean(this.builder.getState().selectedFlow);
    if (step === 2) return Boolean(this.builder.getState().selectedType);
    if (step === 3) return Boolean(val('role') && val('objective'));
    if (step === 4) return getChecked('constraints').length > 0;
    if (step === 5) return getChecked('outputs').length > 0;
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
    const typeData = this.builder.getPromptTypeData();
    if (!typeData) return;
    typeData.constraints.forEach(key => {
      const elem = document.querySelector(`#constraints label[data-key="${key}"]`);
      if (elem) elem.classList.add('recommended');
    });
    typeData.output.forEach(key => {
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
    window.clearTimeout((notice as any).timer);
    (notice as any).timer = window.setTimeout(() => (notice.textContent = ''), 1600);
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
