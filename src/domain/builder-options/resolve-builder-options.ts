import type {
  ApplicabilityRule,
  OptionResolutionInput,
  ResolvedBuilderOptions,
  ResolvedOption
} from './index';
import type { CatalogIndex } from '../catalog/catalog-types';
import { matchesScope } from './rule-matching';
import { getSpecificity, compareSpecificity } from './rule-specificity';

export function resolveBuilderOptions(
  input: OptionResolutionInput,
  catalogIndex: CatalogIndex
): ResolvedBuilderOptions {
  const contextFields = new Map<string, ResolvedOption<string>>();
  const constraints = new Map<string, ResolvedOption<string>>();
  const outputFormats = new Map<string, ResolvedOption<string>>();

  // Get rules from catalog (placeholder - will be populated in future)
  const allRules: ApplicabilityRule[] = [];

  // Group rules by targetId and select the best one per targetId
  const rulesByTarget = new Map<string, ApplicabilityRule[]>();

  for (const rule of allRules) {
    if (!matchesScope(rule, input)) {
      continue;
    }

    const rules = rulesByTarget.get(rule.targetId) || [];
    rules.push(rule);
    rulesByTarget.set(rule.targetId, rules);
  }

  // Select best rule per target (by specificity, then by sortOrder)
  const selectedRules = new Map<string, ApplicabilityRule>();
  for (const [targetId, rules] of rulesByTarget.entries()) {
    if (rules.length === 0) continue;

    const sorted = rules.sort((a, b) => {
      const specCmp = compareSpecificity(getSpecificity(a), getSpecificity(b));
      if (specCmp !== 0) return specCmp;
      return a.sortOrder - b.sortOrder;
    });

    selectedRules.set(targetId, sorted[0]);
  }

  // Populate resolved options from selected rules and base definitions
  for (const [targetId, rule] of selectedRules.entries()) {
    const targetValue = getTargetValue(rule.targetKind, targetId, catalogIndex);
    if (!targetValue) continue;

    const resolved: ResolvedOption<string> = {
      item: targetValue,
      importance: rule.importance,
      defaultVisible: rule.defaultVisible,
      defaultSelected: rule.defaultSelected,
      sourceRuleIds: [rule.id],
      sortOrder: rule.sortOrder,
      specificity: getSpecificity(rule)
    };

    if (rule.targetKind === 'context-field') {
      contextFields.set(targetId, resolved);
    } else if (rule.targetKind === 'constraint') {
      constraints.set(targetId, resolved);
    } else if (rule.targetKind === 'output-format') {
      outputFormats.set(targetId, resolved);
    }
  }

  // Add non-ruled definitions with defaults
  for (const [id, value] of catalogIndex.contextFieldsById.entries()) {
    if (!contextFields.has(id)) {
      contextFields.set(id, {
        item: value.label || id,
        importance: 'low',
        defaultVisible: true,
        defaultSelected: false,
        sourceRuleIds: [],
        sortOrder: 999,
        specificity: 'generic'
      });
    }
  }

  for (const [id, value] of catalogIndex.constraintsById.entries()) {
    if (!constraints.has(id)) {
      constraints.set(id, {
        item: value,
        importance: 'medium',
        defaultVisible: true,
        defaultSelected: false,
        sourceRuleIds: [],
        sortOrder: 999,
        specificity: 'generic'
      });
    }
  }

  for (const [id, value] of catalogIndex.outputFormatsById.entries()) {
    if (!outputFormats.has(id)) {
      outputFormats.set(id, {
        item: value,
        importance: 'medium',
        defaultVisible: true,
        defaultSelected: false,
        sourceRuleIds: [],
        sortOrder: 999,
        specificity: 'generic'
      });
    }
  }

  return { contextFields, constraints, outputFormats };
}

function getTargetValue(
  kind: 'context-field' | 'constraint' | 'output-format',
  id: string,
  index: CatalogIndex
): string | null {
  if (kind === 'context-field') {
    const item = index.contextFieldsById.get(id);
    return item ? item.label || id : null;
  }
  if (kind === 'constraint') {
    return index.constraintsById.get(id) || null;
  }
  if (kind === 'output-format') {
    return index.outputFormatsById.get(id) || null;
  }
  return null;
}
