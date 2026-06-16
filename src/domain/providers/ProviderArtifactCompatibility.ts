import { AiProvider } from './AiProvider';
import { ArtifactKind } from '../artifacts/ArtifactKind';
import { SupportLevel } from './SupportLevel';

export interface ProviderEquivalent {
  supportLevel: SupportLevel;
  equivalentArtifact?: string;
  notes?: string;
}

export interface ProviderArtifactCompatibility {
  provider: AiProvider;
  artifact: ArtifactKind;
  supportLevel: SupportLevel;
  equivalent?: ProviderEquivalent;
  notes?: string;
}

// Matriz temporal en TypeScript (futuro JSON)
export const compatibilityMatrix: ProviderArtifactCompatibility[] = [
  // ChatGPT - Prompts
  {
    provider: AiProvider.ChatGPT,
    artifact: ArtifactKind.Prompt,
    supportLevel: SupportLevel.Native,
  },
  // ChatGPT - Skills (sin soporte nativo, usar custom instructions)
  {
    provider: AiProvider.ChatGPT,
    artifact: ArtifactKind.Skill,
    supportLevel: SupportLevel.Equivalent,
    equivalent: {
      supportLevel: SupportLevel.Equivalent,
      equivalentArtifact: 'custom_instructions',
      notes: 'Usar Custom Instructions como alternativa',
    },
  },
  // ChatGPT - Hooks (no soportado en web)
  {
    provider: AiProvider.ChatGPT,
    artifact: ArtifactKind.Hook,
    supportLevel: SupportLevel.Unsupported,
    notes: 'ChatGPT no soporta hooks de Claude Code',
  },
  // ChatGPT - Project Instructions (similar a Custom Instructions)
  {
    provider: AiProvider.ChatGPT,
    artifact: ArtifactKind.ProjectInstructions,
    supportLevel: SupportLevel.Partial,
    notes: 'Usar Custom Instructions o conversation setup',
  },
  // ChatGPT - Scoped Instructions
  {
    provider: AiProvider.ChatGPT,
    artifact: ArtifactKind.ScopedInstructions,
    supportLevel: SupportLevel.Partial,
    notes: 'Incluir en contexto de la conversación',
  },
  // ChatGPT - Prompt Files
  {
    provider: AiProvider.ChatGPT,
    artifact: ArtifactKind.PromptFile,
    supportLevel: SupportLevel.Unsupported,
    notes: 'ChatGPT no soporta archivos de prompt',
  },
  // ChatGPT - Agent Instructions
  {
    provider: AiProvider.ChatGPT,
    artifact: ArtifactKind.AgentInstructions,
    supportLevel: SupportLevel.Unsupported,
    notes: 'ChatGPT no soporta agentes como Claude',
  },
  // ChatGPT - Workflows
  {
    provider: AiProvider.ChatGPT,
    artifact: ArtifactKind.Workflow,
    supportLevel: SupportLevel.Unsupported,
    notes: 'Requerirá workflow externo (Zapier, etc)',
  },
  // ChatGPT - Checklist
  {
    provider: AiProvider.ChatGPT,
    artifact: ArtifactKind.Checklist,
    supportLevel: SupportLevel.Native,
  },

  // Claude - Prompts
  {
    provider: AiProvider.Claude,
    artifact: ArtifactKind.Prompt,
    supportLevel: SupportLevel.Native,
  },
  // Claude - Skills
  {
    provider: AiProvider.Claude,
    artifact: ArtifactKind.Skill,
    supportLevel: SupportLevel.Unsupported,
    notes: 'Skills son específicas de Claude Code',
  },
  // Claude - Hooks
  {
    provider: AiProvider.Claude,
    artifact: ArtifactKind.Hook,
    supportLevel: SupportLevel.Unsupported,
    notes: 'Hooks son específicas de Claude Code',
  },
  // Claude - Project Instructions
  {
    provider: AiProvider.Claude,
    artifact: ArtifactKind.ProjectInstructions,
    supportLevel: SupportLevel.Native,
  },
  // Claude - Scoped Instructions
  {
    provider: AiProvider.Claude,
    artifact: ArtifactKind.ScopedInstructions,
    supportLevel: SupportLevel.Native,
  },
  // Claude - Prompt Files
  {
    provider: AiProvider.Claude,
    artifact: ArtifactKind.PromptFile,
    supportLevel: SupportLevel.Unsupported,
    notes: 'Futuro soporte en Claude Code',
  },
  // Claude - Agent Instructions
  {
    provider: AiProvider.Claude,
    artifact: ArtifactKind.AgentInstructions,
    supportLevel: SupportLevel.Unsupported,
    notes: 'Futuro soporte en Claude Code',
  },
  // Claude - Workflows
  {
    provider: AiProvider.Claude,
    artifact: ArtifactKind.Workflow,
    supportLevel: SupportLevel.Unsupported,
    notes: 'Futuro soporte en roadmap',
  },
  // Claude - Checklist
  {
    provider: AiProvider.Claude,
    artifact: ArtifactKind.Checklist,
    supportLevel: SupportLevel.Native,
  },

  // Claude Code - Prompts
  {
    provider: AiProvider.ClaudeCode,
    artifact: ArtifactKind.Prompt,
    supportLevel: SupportLevel.Native,
  },
  // Claude Code - Skills
  {
    provider: AiProvider.ClaudeCode,
    artifact: ArtifactKind.Skill,
    supportLevel: SupportLevel.Native,
  },
  // Claude Code - Hooks
  {
    provider: AiProvider.ClaudeCode,
    artifact: ArtifactKind.Hook,
    supportLevel: SupportLevel.Native,
  },
  // Claude Code - Project Instructions
  {
    provider: AiProvider.ClaudeCode,
    artifact: ArtifactKind.ProjectInstructions,
    supportLevel: SupportLevel.Native,
  },
  // Claude Code - Scoped Instructions
  {
    provider: AiProvider.ClaudeCode,
    artifact: ArtifactKind.ScopedInstructions,
    supportLevel: SupportLevel.Native,
  },
  // Claude Code - Prompt Files
  {
    provider: AiProvider.ClaudeCode,
    artifact: ArtifactKind.PromptFile,
    supportLevel: SupportLevel.Native,
  },
  // Claude Code - Agent Instructions
  {
    provider: AiProvider.ClaudeCode,
    artifact: ArtifactKind.AgentInstructions,
    supportLevel: SupportLevel.Native,
  },
  // Claude Code - Workflows
  {
    provider: AiProvider.ClaudeCode,
    artifact: ArtifactKind.Workflow,
    supportLevel: SupportLevel.Partial,
    notes: 'Soporte parcial via extensiones/MCP',
  },
  // Claude Code - Checklist
  {
    provider: AiProvider.ClaudeCode,
    artifact: ArtifactKind.Checklist,
    supportLevel: SupportLevel.Native,
  },

  // GitHub Copilot - Prompts
  {
    provider: AiProvider.GitHubCopilot,
    artifact: ArtifactKind.Prompt,
    supportLevel: SupportLevel.Native,
  },
  // GitHub Copilot - Skills
  {
    provider: AiProvider.GitHubCopilot,
    artifact: ArtifactKind.Skill,
    supportLevel: SupportLevel.Partial,
    notes: 'Copilot Workspace soporta algunos patrones',
  },
  // GitHub Copilot - Hooks
  {
    provider: AiProvider.GitHubCopilot,
    artifact: ArtifactKind.Hook,
    supportLevel: SupportLevel.Unsupported,
  },
  // GitHub Copilot - Project Instructions
  {
    provider: AiProvider.GitHubCopilot,
    artifact: ArtifactKind.ProjectInstructions,
    supportLevel: SupportLevel.Equivalent,
    equivalent: {
      supportLevel: SupportLevel.Equivalent,
      equivalentArtifact: 'instructions_file',
      notes: 'Usar .copilot/instructions.txt',
    },
  },
  // GitHub Copilot - Scoped Instructions
  {
    provider: AiProvider.GitHubCopilot,
    artifact: ArtifactKind.ScopedInstructions,
    supportLevel: SupportLevel.Equivalent,
    equivalent: {
      supportLevel: SupportLevel.Equivalent,
      equivalentArtifact: 'inline_comment',
      notes: 'Incluir en comentarios de código',
    },
  },
  // GitHub Copilot - Prompt Files
  {
    provider: AiProvider.GitHubCopilot,
    artifact: ArtifactKind.PromptFile,
    supportLevel: SupportLevel.Unsupported,
  },
  // GitHub Copilot - Agent Instructions
  {
    provider: AiProvider.GitHubCopilot,
    artifact: ArtifactKind.AgentInstructions,
    supportLevel: SupportLevel.Unsupported,
  },
  // GitHub Copilot - Workflows
  {
    provider: AiProvider.GitHubCopilot,
    artifact: ArtifactKind.Workflow,
    supportLevel: SupportLevel.Partial,
    notes: 'Copilot Workspace beta',
  },
  // GitHub Copilot - Checklist
  {
    provider: AiProvider.GitHubCopilot,
    artifact: ArtifactKind.Checklist,
    supportLevel: SupportLevel.Partial,
    notes: 'Soporte limitado en comments',
  },

  // Generic - Prompts
  {
    provider: AiProvider.Generic,
    artifact: ArtifactKind.Prompt,
    supportLevel: SupportLevel.Native,
  },
  // Generic - Skills (puede variar)
  {
    provider: AiProvider.Generic,
    artifact: ArtifactKind.Skill,
    supportLevel: SupportLevel.Partial,
    notes: 'Depende de la implementación específica',
  },
  // Generic - Hooks
  {
    provider: AiProvider.Generic,
    artifact: ArtifactKind.Hook,
    supportLevel: SupportLevel.Unsupported,
    notes: 'No es estándar en LLMs genéricos',
  },
  // Generic - Project Instructions
  {
    provider: AiProvider.Generic,
    artifact: ArtifactKind.ProjectInstructions,
    supportLevel: SupportLevel.Native,
  },
  // Generic - Scoped Instructions
  {
    provider: AiProvider.Generic,
    artifact: ArtifactKind.ScopedInstructions,
    supportLevel: SupportLevel.Native,
  },
  // Generic - Prompt Files
  {
    provider: AiProvider.Generic,
    artifact: ArtifactKind.PromptFile,
    supportLevel: SupportLevel.Unsupported,
  },
  // Generic - Agent Instructions
  {
    provider: AiProvider.Generic,
    artifact: ArtifactKind.AgentInstructions,
    supportLevel: SupportLevel.Partial,
    notes: 'Depende del LLM específico',
  },
  // Generic - Workflows
  {
    provider: AiProvider.Generic,
    artifact: ArtifactKind.Workflow,
    supportLevel: SupportLevel.Unsupported,
  },
  // Generic - Checklist
  {
    provider: AiProvider.Generic,
    artifact: ArtifactKind.Checklist,
    supportLevel: SupportLevel.Native,
  },
];

export function getProviderArtifactSupport(
  provider: AiProvider,
  artifact: ArtifactKind
): ProviderArtifactCompatibility | undefined {
  return compatibilityMatrix.find(
    (compat) => compat.provider === provider && compat.artifact === artifact
  );
}
