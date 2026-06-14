export class PromptTemplate {
  constructor(
    readonly key: string,
    readonly label: string,
    readonly description: string,
    readonly profileId: string,
    readonly role: string,
    readonly objective: string,
    readonly recommendedRestrictions: string[],
    readonly recommendedOutputs: string[],
    readonly question: string
  ) {}

  static from(
    key: string,
    data: {
      label: string;
      description: string;
      profileId: string;
      role: string;
      objective: string;
      recommendedRestrictions?: string[];
      recommendedOutputs?: string[];
      question: string;
    }
  ): PromptTemplate {
    return new PromptTemplate(
      key,
      data.label,
      data.description,
      data.profileId,
      data.role,
      data.objective,
      data.recommendedRestrictions ?? [],
      data.recommendedOutputs ?? [],
      data.question
    );
  }
}
