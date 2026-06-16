import type { CatalogBundle, CatalogIndex, CatalogValidationResult } from './catalog-types';
import { CatalogValidator } from './catalog-validator';
import { CatalogNormalizer } from './catalog-normalizer';
import { CatalogLoader } from './catalog-loader';

let cachedBundle: CatalogBundle | null = null;
let cachedIndex: CatalogIndex | null = null;
let cachedValidation: CatalogValidationResult | null = null;

export class CatalogRepository {
  static getBundle(): CatalogBundle {
    if (!cachedBundle) {
      cachedBundle = CatalogLoader.loadStaticCatalog();
    }
    return cachedBundle;
  }

  static getIndex(): CatalogIndex {
    if (!cachedIndex) {
      const bundle = this.getBundle();
      cachedIndex = CatalogNormalizer.normalize(bundle);
    }
    return cachedIndex;
  }

  static getValidation(): CatalogValidationResult {
    if (!cachedValidation) {
      const bundle = this.getBundle();
      cachedValidation = CatalogValidator.validate(bundle);
    }
    return cachedValidation;
  }

  static isValid(): boolean {
    return this.getValidation().isValid;
  }

  static getErrors() {
    return this.getValidation().errors;
  }
}
