import type { CatalogBundle } from './catalog-types';
import { CatalogRepositoryFactory } from '../../infrastructure/catalog/catalogRepositoryFactory';

export class CatalogLoader {
  static loadStaticCatalog(): CatalogBundle {
    return CatalogRepositoryFactory.loadBundle();
  }
}
