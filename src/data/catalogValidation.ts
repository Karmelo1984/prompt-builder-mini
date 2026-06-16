import { CatalogRepository } from '../domain/catalog/catalog-repository';
import type { CatalogValidationError } from '../domain/catalog/catalog-types';

export type { CatalogValidationError };

export class CatalogValidator {
  static validate(): CatalogValidationError[] {
    const result = CatalogRepository.getValidation();
    return result.errors;
  }
}
