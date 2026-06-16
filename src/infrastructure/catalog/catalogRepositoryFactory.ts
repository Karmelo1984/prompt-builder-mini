import type { CatalogBundle } from '../../domain/catalog/catalog-types';
import { JsonCatalogRepository } from './jsonCatalogRepository';
import { DatabaseCatalogRepository } from './databaseCatalogRepository';

export type CatalogRepositoryType = 'json' | 'database';

/**
 * Factory para crear instancias de CatalogRepository según la configuración.
 *
 * Por defecto: json (carga desde archivos estáticos)
 * Futuro: database (carga desde backend)
 */
export class CatalogRepositoryFactory {
  private static type: CatalogRepositoryType = 'json';

  /**
   * Configura qué implementación usar.
   * Nota: Solo 'json' está soportado actualmente.
   */
  static setType(type: CatalogRepositoryType): void {
    if (type !== 'json' && type !== 'database') {
      throw new Error(`Invalid catalog repository type: ${type}`);
    }
    this.type = type;
  }

  /**
   * Carga el catálogo según la implementación configurada.
   */
  static loadBundle(): CatalogBundle {
    switch (this.type) {
      case 'json':
        return JsonCatalogRepository.loadBundle();
      case 'database':
        return DatabaseCatalogRepository.loadBundle();
      default:
        const exhaustive: never = this.type;
        return exhaustive;
    }
  }

  /**
   * Retorna el tipo actual configurado.
   */
  static getType(): CatalogRepositoryType {
    return this.type;
  }
}
