export class RecipeID {
  public readonly value: string;

  constructor(slug: string) {
    this.value = slug;
  }

  public static createFromTitle(title: string): RecipeID {
    const slug = title.toLocaleLowerCase().replace(/\s+/g, "-");
    return new RecipeID(slug);
  }
}
