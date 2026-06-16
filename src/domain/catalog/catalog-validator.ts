import type { CatalogBundle, CatalogValidationError, CatalogValidationResult } from './catalog-types';

export class CatalogValidator {
  static validate(bundle: CatalogBundle): CatalogValidationResult {
    const errors: CatalogValidationError[] = [];

    errors.push(...this.validateProfiles(bundle));
    errors.push(...this.validateTemplates(bundle));
    errors.push(...this.validateConstraints(bundle));
    errors.push(...this.validateOutputs(bundle));
    errors.push(...this.validateReferences(bundle));

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private static validateProfiles(bundle: CatalogBundle): CatalogValidationError[] {
    const errors: CatalogValidationError[] = [];
    const profileIds = Object.keys(bundle.profiles);

    for (const id of profileIds) {
      const profile = bundle.profiles[id];
      if (!profile.label || typeof profile.label !== 'string' || !profile.label.trim()) {
        errors.push({
          type: 'missing-required-field',
          message: `Profile ${id} has missing or invalid label`,
          details: [id]
        });
      }
      if (!profile.description || typeof profile.description !== 'string' || !profile.description.trim()) {
        errors.push({
          type: 'missing-required-field',
          message: `Profile ${id} has missing or invalid description`,
          details: [id]
        });
      }
    }

    return errors;
  }

  private static validateTemplates(bundle: CatalogBundle): CatalogValidationError[] {
    const errors: CatalogValidationError[] = [];
    const templateIds = Object.keys(bundle.templates);

    for (const id of templateIds) {
      const template = bundle.templates[id];
      if (!template.label || typeof template.label !== 'string' || !template.label.trim()) {
        errors.push({
          type: 'missing-required-field',
          message: `Template ${id} has missing or invalid label`,
          details: [id]
        });
      }
      if (!template.profileId || typeof template.profileId !== 'string' || !template.profileId.trim()) {
        errors.push({
          type: 'missing-required-field',
          message: `Template ${id} has missing or invalid profileId`,
          details: [id]
        });
      }
      if (!template.role || typeof template.role !== 'string' || !template.role.trim()) {
        errors.push({
          type: 'missing-required-field',
          message: `Template ${id} has missing or invalid role`,
          details: [id]
        });
      }
      if (!template.objective || typeof template.objective !== 'string' || !template.objective.trim()) {
        errors.push({
          type: 'missing-required-field',
          message: `Template ${id} has missing or invalid objective`,
          details: [id]
        });
      }
      if (!template.question || typeof template.question !== 'string' || !template.question.trim()) {
        errors.push({
          type: 'missing-required-field',
          message: `Template ${id} has missing or invalid question`,
          details: [id]
        });
      }
    }

    return errors;
  }

  private static validateConstraints(bundle: CatalogBundle): CatalogValidationError[] {
    const errors: CatalogValidationError[] = [];

    for (const [id, value] of Object.entries(bundle.constraints)) {
      if (!value || typeof value !== 'string' || !value.trim()) {
        errors.push({
          type: 'invalid-string-field',
          message: `Constraint ${id} has empty or non-string value`,
          details: [id]
        });
      }
    }

    return errors;
  }

  private static validateOutputs(bundle: CatalogBundle): CatalogValidationError[] {
    const errors: CatalogValidationError[] = [];

    for (const [id, value] of Object.entries(bundle.outputs)) {
      if (!value || typeof value !== 'string' || !value.trim()) {
        errors.push({
          type: 'invalid-string-field',
          message: `Output ${id} has empty or non-string value`,
          details: [id]
        });
      }
    }

    return errors;
  }

  private static validateReferences(bundle: CatalogBundle): CatalogValidationError[] {
    const errors: CatalogValidationError[] = [];
    const profileIds = new Set(Object.keys(bundle.profiles));
    const invalidRefs: string[] = [];

    for (const [templateId, template] of Object.entries(bundle.templates)) {
      if (!profileIds.has(template.profileId)) {
        invalidRefs.push(`${templateId} → ${template.profileId}`);
      }
    }

    if (invalidRefs.length > 0) {
      errors.push({
        type: 'invalid-profile-ref',
        message: 'Templates reference non-existent profiles',
        details: invalidRefs
      });
    }

    const uncoveredProfiles: string[] = [];
    for (const profileId of Array.from(profileIds)) {
      const templatesForProfile = Object.values(bundle.templates).filter(t => t.profileId === profileId);
      if (templatesForProfile.length === 0) {
        uncoveredProfiles.push(profileId);
      }
    }

    if (uncoveredProfiles.length > 0) {
      errors.push({
        type: 'uncovered-profile',
        message: 'Profiles without templates',
        details: uncoveredProfiles
      });
    }

    return errors;
  }
}
