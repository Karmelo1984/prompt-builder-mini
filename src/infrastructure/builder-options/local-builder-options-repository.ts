import type {
  OptionResolutionInput,
  ResolvedBuilderOptions
} from '../../domain/builder-options';
import { resolveBuilderOptions } from '../../domain/builder-options';
import type { CatalogIndex } from '../../domain/catalog/catalog-types';
import type { BuilderOptionsRepository } from './builder-options-repository';

export class LocalBuilderOptionsRepository implements BuilderOptionsRepository {
  constructor(private catalogIndex: CatalogIndex) {}

  resolve(input: OptionResolutionInput): ResolvedBuilderOptions {
    return resolveBuilderOptions(input, this.catalogIndex);
  }
}
