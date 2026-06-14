export class Prompt {
  constructor(
    readonly role: string,
    readonly stack: string,
    readonly project: string,
    readonly objective: string,
    readonly why: string,
    readonly inputData: string,
    readonly examples: string,
    readonly constraints: string[],
    readonly outputs: string[],
    readonly question: string
  ) {}

  get isMinimallyValid(): boolean {
    return Boolean(this.role && this.objective && this.inputData);
  }

  get isEmpty(): boolean {
    return (
      !this.role &&
      !this.stack &&
      !this.project &&
      !this.objective &&
      !this.why &&
      !this.inputData &&
      !this.examples &&
      this.constraints.length === 0 &&
      this.outputs.length === 0
    );
  }

  static empty(): Prompt {
    return new Prompt('', '', '', '', '', '', '', [], [], '');
  }
}
