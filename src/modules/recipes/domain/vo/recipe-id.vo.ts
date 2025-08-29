import { v4 as uuidv4 } from "uuid";
export class RecipeID {
  public readonly value: string;

  constructor(id?: string) {
    this.value = id || uuidv4();
  }
}
