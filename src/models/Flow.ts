export class Flow {
  constructor(
    readonly key: string,
    readonly label: string,
    readonly short: string,
    readonly types: string[]
  ) {}

  static from(key: string, data: { label: string; short: string; types: string[] }): Flow {
    return new Flow(key, data.label, data.short, data.types);
  }
}
