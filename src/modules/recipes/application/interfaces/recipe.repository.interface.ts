import { Recipe } from "../../domain/recipe";

export interface IRecipeRepository {
  create(props: Recipe);
  update(props: Recipe);
  getByUser(userId: string): Promise<Recipe[]>;
  getByAuthorAndId(authorId: string, id: string): Promise<Recipe | null>;
  getById(id: string): Promise<Recipe | null>;
  delete(id: string);
}
