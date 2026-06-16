import type {
  OptionResolutionInput,
  ResolvedBuilderOptions
} from '../../domain/builder-options';

export interface BuilderOptionsRepository {
  resolve(input: OptionResolutionInput): ResolvedBuilderOptions;
}
