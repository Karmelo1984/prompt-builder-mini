import type { PromptTemplateCatalog } from '../../../types/index';
import { productOwnerTemplates } from './product-owner';
import { qaManualTemplates } from './qa-manual';
import { qaAutomationTemplates } from './qa-automation';
import { developerTemplates } from './developer';
import { techLeadTemplates } from './tech-lead';
import { productDesignerTemplates } from './product-designer';
import { dataAnalystTemplates } from './data-analyst';
import { devopsSreTemplates } from './devops-sre';

export const promptTemplateCatalog: PromptTemplateCatalog = {
  ...productOwnerTemplates,
  ...qaManualTemplates,
  ...qaAutomationTemplates,
  ...developerTemplates,
  ...techLeadTemplates,
  ...productDesignerTemplates,
  ...dataAnalystTemplates,
  ...devopsSreTemplates,
};
