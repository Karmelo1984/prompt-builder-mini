import type { CatalogBundle, CatalogIndex } from './catalog-types';

export class CatalogNormalizer {
  static normalize(bundle: CatalogBundle): CatalogIndex {
    return {
      profilesById: new Map(Object.entries(bundle.profiles)),
      templatesById: new Map(Object.entries(bundle.templates)),
      templatesByProfileId: this.buildTemplatesByProfileId(bundle),
      constraintsById: new Map(Object.entries(bundle.constraints)),
      outputsById: new Map(Object.entries(bundle.outputs))
    };
  }

  private static buildTemplatesByProfileId(bundle: CatalogBundle): Map<string, string[]> {
    const map = new Map<string, string[]>();

    for (const profileId of Object.keys(bundle.profiles)) {
      map.set(profileId, []);
    }

    for (const [templateId, template] of Object.entries(bundle.templates)) {
      const profileId = template.profileId;
      if (map.has(profileId)) {
        const templates = map.get(profileId);
        if (templates) {
          templates.push(templateId);
        }
      }
    }

    return map;
  }
}
