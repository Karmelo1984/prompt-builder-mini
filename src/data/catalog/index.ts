import { CatalogRepository } from '../../domain/catalog/catalog-repository';

const catalogIndex = CatalogRepository.getIndex();
const bundle = CatalogRepository.getBundle();

export const profileCatalog = bundle.profiles;
export const promptTemplateCatalog = bundle.templates;
export const constraintCatalog = bundle.constraints;
export const outputCatalog = bundle.outputs;
export const tips = bundle.tips || [];
