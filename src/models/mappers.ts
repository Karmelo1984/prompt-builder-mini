import { Flow, PromptType, Prompt } from './index';
import { flowCatalog, promptTypes, constraintCatalog, outputCatalog } from '../data/catalogs';

export class Mappers {
  static toFlow(key: string): Flow | null {
    const data = flowCatalog[key as keyof typeof flowCatalog];
    return data ? Flow.from(key, data) : null;
  }

  static toPromptType(key: string): PromptType | null {
    const data = promptTypes[key];
    return data ? PromptType.from(key, data) : null;
  }

  static toPrompt(data: {
    role: string;
    stack: string;
    project: string;
    objective: string;
    why: string;
    inputData: string;
    examples: string;
    constraintKeys: string[];
    outputKeys: string[];
    question: string;
  }): Prompt {
    return new Prompt(
      data.role,
      data.stack,
      data.project,
      data.objective,
      data.why,
      data.inputData,
      data.examples,
      data.constraintKeys.map(k => constraintCatalog[k]).filter(Boolean),
      data.outputKeys.map(k => outputCatalog[k]).filter(Boolean),
      data.question
    );
  }

  static toFlowList(): Flow[] {
    return Object.entries(flowCatalog).map(([key, data]) => Flow.from(key, data));
  }

  static toPromptTypeList(flowKey?: string): PromptType[] {
    let keys: string[] = Object.keys(promptTypes);
    if (flowKey) {
      const flow = flowCatalog[flowKey as keyof typeof flowCatalog];
      if (flow) keys = flow.types;
    }
    return keys.map(key => {
      const data = promptTypes[key];
      return PromptType.from(key, data);
    });
  }
}
