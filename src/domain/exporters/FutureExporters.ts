import { ArtifactKind } from '../artifacts/ArtifactKind';
import { AiProvider } from '../providers/AiProvider';
import { NotImplementedExporter } from './NotImplementedExporter';

export class ClaudeCodeSkillExporter extends NotImplementedExporter {
  protected readonly supportedKind = ArtifactKind.Skill;
  protected readonly targetProvider = AiProvider.ClaudeCode;
  protected readonly exporterName = 'ClaudeCodeSkillExporter';
}

export class ClaudeCodeHookExporter extends NotImplementedExporter {
  protected readonly supportedKind = ArtifactKind.Hook;
  protected readonly targetProvider = AiProvider.ClaudeCode;
  protected readonly exporterName = 'ClaudeCodeHookExporter';
}

export class CopilotInstructionsExporter extends NotImplementedExporter {
  protected readonly supportedKind = ArtifactKind.ProjectInstructions;
  protected readonly targetProvider = AiProvider.GitHubCopilot;
  protected readonly exporterName = 'CopilotInstructionsExporter';
}

export class CopilotPromptFileExporter extends NotImplementedExporter {
  protected readonly supportedKind = ArtifactKind.PromptFile;
  protected readonly targetProvider = AiProvider.GitHubCopilot;
  protected readonly exporterName = 'CopilotPromptFileExporter';
}

export class ChatGptCustomGptExporter extends NotImplementedExporter {
  protected readonly supportedKind = ArtifactKind.ProjectInstructions;
  protected readonly targetProvider = AiProvider.ChatGPT;
  protected readonly exporterName = 'ChatGptCustomGptExporter';
}

export class AgentsMdExporter extends NotImplementedExporter {
  protected readonly supportedKind = ArtifactKind.AgentInstructions;
  protected readonly targetProvider = AiProvider.ClaudeCode;
  protected readonly exporterName = 'AgentsMdExporter';
}
