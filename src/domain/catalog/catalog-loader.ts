import type { CatalogBundle } from './catalog-types';
import { constraintCatalog, outputCatalog, profileCatalog, promptTemplateCatalog, tips } from '../../data/catalogs';

export class CatalogLoader {
  static loadStaticCatalog(): CatalogBundle {
    return {
      profiles: profileCatalog,
      templates: promptTemplateCatalog,
      constraints: constraintCatalog,
      outputs: outputCatalog,
      tips
    };
  }
}
