export class PromptType {
  constructor(
    readonly key: string,
    readonly label: string,
    readonly short: string,
    readonly role: string,
    readonly objective: string,
    readonly output: string[],
    readonly constraints: string[],
    readonly question: string
  ) {}

  static from(
    key: string,
    data: {
      label: string;
      short: string;
      role: string;
      objective: string;
      output: string[];
      constraints: string[];
      question: string;
    }
  ): PromptType {
    return new PromptType(key, data.label, data.short, data.role, data.objective, data.output, data.constraints, data.question);
  }
}
