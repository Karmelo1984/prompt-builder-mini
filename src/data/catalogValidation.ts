import { profileCatalog, promptTemplateCatalog } from './catalogs';

export interface CatalogValidationError {
  type: 'duplicate-profile-id' | 'duplicate-template-id' | 'invalid-profile-ref' | 'uncovered-profile';
  message: string;
  details?: string[];
}

export class CatalogValidator {
  static validate(): CatalogValidationError[] {
    const errors: CatalogValidationError[] = [];

    errors.push(...this.checkDuplicateProfileIds());
    errors.push(...this.checkDuplicateTemplateIds());
    errors.push(...this.checkTemplateProfileReferences());
    errors.push(...this.checkProfileCoverage());

    return errors;
  }

  private static checkDuplicateProfileIds(): CatalogValidationError[] {
    const errors: CatalogValidationError[] = [];
    const ids = Object.keys(profileCatalog);
    const duplicates = ids.filter((id, idx) => ids.indexOf(id) !== idx);

    if (duplicates.length > 0) {
      errors.push({
        type: 'duplicate-profile-id',
        message: `Duplicate profile IDs detected: ${duplicates.join(', ')}`
      });
    }

    return errors;
  }

  private static checkDuplicateTemplateIds(): CatalogValidationError[] {
    const errors: CatalogValidationError[] = [];
    const ids = Object.keys(promptTemplateCatalog);
    const duplicates = ids.filter((id, idx) => ids.indexOf(id) !== idx);

    if (duplicates.length > 0) {
      errors.push({
        type: 'duplicate-template-id',
        message: `Duplicate template IDs detected: ${duplicates.join(', ')}`
      });
    }

    return errors;
  }

  private static checkTemplateProfileReferences(): CatalogValidationError[] {
    const errors: CatalogValidationError[] = [];
    const profileIds = Object.keys(profileCatalog);
    const invalidRefs: string[] = [];

    for (const [templateId, template] of Object.entries(promptTemplateCatalog)) {
      if (!profileIds.includes(template.profileId)) {
        invalidRefs.push(`${templateId} → ${template.profileId}`);
      }
    }

    if (invalidRefs.length > 0) {
      errors.push({
        type: 'invalid-profile-ref',
        message: `Templates reference non-existent profiles`,
        details: invalidRefs
      });
    }

    return errors;
  }

  private static checkProfileCoverage(): CatalogValidationError[] {
    const errors: CatalogValidationError[] = [];
    const uncoveredProfiles: string[] = [];

    for (const profileId of Object.keys(profileCatalog)) {
      const templatesForProfile = Object.values(promptTemplateCatalog).filter(
        t => t.profileId === profileId
      );

      if (templatesForProfile.length === 0) {
        uncoveredProfiles.push(profileId);
      }
    }

    if (uncoveredProfiles.length > 0) {
      errors.push({
        type: 'uncovered-profile',
        message: `Profiles without templates`,
        details: uncoveredProfiles
      });
    }

    return errors;
  }
}
