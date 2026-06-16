import type { ApplicabilityRule } from './index';
import type { Specificity } from './resolved-builder-options';

const SPECIFICITY_WEIGHTS: Record<Specificity, number> = {
  artifact: 4,
  provider: 3,
  profile: 2,
  template: 1,
  generic: 0
};

export function getSpecificity(rule: ApplicabilityRule): Specificity {
  let score = 0;

  if (rule.artifactKinds && rule.artifactKinds.length > 0) {
    score += SPECIFICITY_WEIGHTS.artifact;
  }
  if (rule.providers && rule.providers.length > 0) {
    score += SPECIFICITY_WEIGHTS.provider;
  }
  if (rule.profileIds && rule.profileIds.length > 0) {
    score += SPECIFICITY_WEIGHTS.profile;
  }
  if (rule.templateIds && rule.templateIds.length > 0) {
    score += SPECIFICITY_WEIGHTS.template;
  }

  if (score >= 4) return 'artifact';
  if (score >= 3) return 'provider';
  if (score >= 2) return 'profile';
  if (score >= 1) return 'template';
  return 'generic';
}

export function compareSpecificity(a: Specificity, b: Specificity): number {
  return SPECIFICITY_WEIGHTS[b] - SPECIFICITY_WEIGHTS[a];
}
