export class RecipeID {
  private value: string;

  constructor(slug: string) {
    this.value = slug;
  }

  public createFromTitle(title: string): RecipeID {
    const slug = title.toLocaleLowerCase().replace(/\s+/g, "-");
    return new RecipeID(slug);
  }

  public get() {
    return this.value;
  }
}
