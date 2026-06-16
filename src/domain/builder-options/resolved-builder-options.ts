import type {
  ContextFieldId,
  ConstraintId,
  OutputFormatId,
  ApplicabilityRuleId
} from '../catalog/catalog-types';

export type Specificity = 'artifact' | 'provider' | 'profile' | 'template' | 'generic';

export interface ResolvedOption<T> {
  item: T;
  importance: 'critical' | 'high' | 'medium' | 'low';
  defaultVisible: boolean;
  defaultSelected: boolean;
  sourceRuleIds: ApplicabilityRuleId[];
  sortOrder: number;
  specificity: Specificity;
}

export interface ResolvedBuilderOptions {
  contextFields: Map<ContextFieldId, ResolvedOption<string>>;
  constraints: Map<ConstraintId, ResolvedOption<string>>;
  outputFormats: Map<OutputFormatId, ResolvedOption<string>>;
}
