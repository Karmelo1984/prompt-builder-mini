export enum ArtifactKind {
  Prompt = 'prompt',
  Skill = 'skill',
  Hook = 'hook',
  ProjectInstructions = 'project_instructions',
  ScopedInstructions = 'scoped_instructions',
  PromptFile = 'prompt_file',
  AgentInstructions = 'agent_instructions',
  Workflow = 'workflow',
  Checklist = 'checklist',
}

export interface ArtifactDefinition {
  kind: ArtifactKind;
  label: string;
  description: string;
}

export interface ArtifactTemplateBase {
  kind: ArtifactKind;
  id: string;
  label: string;
  description: string;
}
