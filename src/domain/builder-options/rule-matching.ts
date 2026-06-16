import type { ApplicabilityRule, OptionResolutionInput } from './index';

export function matchesScope(rule: ApplicabilityRule, input: OptionResolutionInput): boolean {
  if (rule.status !== 'active') {
    return false;
  }

  if (input.artifactKind && rule.artifactKinds && rule.artifactKinds.length > 0) {
    if (!rule.artifactKinds.includes(input.artifactKind)) {
      return false;
    }
  }

  if (input.provider && rule.providers && rule.providers.length > 0) {
    if (!rule.providers.includes(input.provider)) {
      return false;
    }
  }

  if (input.profileId && rule.profileIds && rule.profileIds.length > 0) {
    if (!rule.profileIds.includes(input.profileId)) {
      return false;
    }
  }

  if (input.templateId && rule.templateIds && rule.templateIds.length > 0) {
    if (!rule.templateIds.includes(input.templateId)) {
      return false;
    }
  }

  if (input.mode && rule.modes && rule.modes.length > 0) {
    if (!rule.modes.includes(input.mode)) {
      return false;
    }
  }

  return true;
}
