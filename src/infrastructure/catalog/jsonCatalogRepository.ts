import type { CatalogBundle, ProfileItem, PromptTemplateItem } from '../../domain/catalog/catalog-types';
import profilesData from '../../data/catalog/profiles.json';
import templatesData from '../../data/catalog/templates/prompt-templates.json';
import constraintsData from '../../data/catalog/definitions/constraints.json';
import outputsData from '../../data/catalog/definitions/output-formats.json';
import contextsData from '../../data/catalog/definitions/context-fields.json';

interface JsonProfile {
  id: string;
  label: string;
  description: string;
}

interface JsonTemplate {
  id: string;
  label: string;
  description: string;
  profileId: string;
  role: string;
  objective: string;
  recommendedRestrictions?: string[];
  recommendedOutputs?: string[];
  question: string;
}

interface JsonConstraint {
  id: string;
  label?: string;
  description: string;
}

interface JsonOutput {
  id: string;
  label?: string;
  description: string;
}

export class JsonCatalogRepository {
  static loadBundle(): CatalogBundle {
    const profilesMap: Record<string, ProfileItem> = {};
    const templatesMap: Record<string, PromptTemplateItem> = {};
    const constraintsMap: Record<string, string> = {};
    const outputsMap: Record<string, string> = {};
    const tipsArray: string[] = [];

    // Cargar perfiles desde JSON
    (profilesData as { schemaVersion: number; items: JsonProfile[] }).items.forEach((profile) => {
      profilesMap[profile.id] = {
        label: profile.label,
        description: profile.description
      };
    });

    // Cargar plantillas desde JSON
    (templatesData as { schemaVersion: number; items: JsonTemplate[] }).items.forEach((template) => {
      templatesMap[template.id] = {
        label: template.label,
        description: template.description,
        profileId: template.profileId,
        role: template.role,
        objective: template.objective,
        recommendedRestrictions: template.recommendedRestrictions,
        recommendedOutputs: template.recommendedOutputs,
        question: template.question
      };
    });

    // Cargar restricciones desde JSON
    (constraintsData as { schemaVersion: number; items: JsonConstraint[] }).items.forEach((constraint) => {
      constraintsMap[constraint.id] = constraint.description;
    });

    // Cargar outputs desde JSON
    (outputsData as { schemaVersion: number; items: JsonOutput[] }).items.forEach((output) => {
      outputsMap[output.id] = output.description;
    });

    // Cargar tips desde JSON
    (contextsData as { schemaVersion: number; items: Array<{ id: string; type: string; content: string }> }).items.forEach((item) => {
      if (item.type === 'tip') {
        tipsArray.push(item.content);
      }
    });

    return {
      profiles: profilesMap,
      templates: templatesMap,
      constraints: constraintsMap,
      outputs: outputsMap,
      tips: tipsArray
    };
  }
}
