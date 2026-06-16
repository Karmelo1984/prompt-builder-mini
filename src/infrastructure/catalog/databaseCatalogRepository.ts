import type { CatalogBundle } from '../../domain/catalog/catalog-types';

/**
 * DatabaseCatalogRepository es un placeholder para futuras integraciones con backend.
 *
 * Contrato esperado:
 * - Cargar CatalogBundle desde una API REST o base de datos
 * - Aplicar mismo esquema versionado que JSON
 * - Mantener compatibilidad con tipos CatalogBundle
 *
 * Implementación futura:
 * 1. fetch('/api/catalogs') → respuesta versionada
 * 2. Validar respuesta con CatalogValidator
 * 3. Retornar CatalogBundle validado
 *
 * Ejemplo de contrato esperado (POST /api/catalogs):
 * {
 *   "schemaVersion": 1,
 *   "catalogs": {
 *     "profiles": { ... },
 *     "templates": { ... },
 *     "constraints": { ... },
 *     "outputs": { ... },
 *     "tips": [ ... ]
 *   }
 * }
 */
export class DatabaseCatalogRepository {
  /**
   * Placeholder: Lanza error para indicar que el backend no está implementado.
   * No se utiliza en runtime actual; existe solo para documentar el contrato futuro.
   */
  static loadBundle(): CatalogBundle {
    throw new Error(
      'DatabaseCatalogRepository is a placeholder for future backend integration. ' +
      'Use JsonCatalogRepository or configure the factory to point to a real implementation.'
    );
  }
}
