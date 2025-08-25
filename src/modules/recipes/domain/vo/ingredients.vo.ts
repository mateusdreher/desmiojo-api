export class Ingredients {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  public format(value: string[]): Ingredients {
    return new Ingredients(value.join(","));
  }

  public get(): string {
    return this.value;
  }
}
