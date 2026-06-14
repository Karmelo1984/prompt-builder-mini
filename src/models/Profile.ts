export class Profile {
  constructor(
    readonly key: string,
    readonly label: string,
    readonly description: string,
    readonly recommendedTemplates: string[] = [],
    readonly recommendedRestrictions: string[] = [],
    readonly recommendedOutputs: string[] = []
  ) {}

  static from(
    key: string,
    data: {
      label: string;
      description: string;
      recommendedTemplates?: string[];
      recommendedRestrictions?: string[];
      recommendedOutputs?: string[];
    }
  ): Profile {
    return new Profile(
      key,
      data.label,
      data.description,
      data.recommendedTemplates ?? [],
      data.recommendedRestrictions ?? [],
      data.recommendedOutputs ?? []
    );
  }
}
