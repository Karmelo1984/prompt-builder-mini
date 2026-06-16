export enum AiProvider {
  Generic = 'generic',
  ChatGPT = 'chatgpt',
  Claude = 'claude',
  ClaudeCode = 'claude_code',
  GitHubCopilot = 'github_copilot',
}

export const ProviderLabels: Record<AiProvider, string> = {
  [AiProvider.Generic]: 'Generic LLM',
  [AiProvider.ChatGPT]: 'ChatGPT',
  [AiProvider.Claude]: 'Claude',
  [AiProvider.ClaudeCode]: 'Claude Code',
  [AiProvider.GitHubCopilot]: 'GitHub Copilot',
};
