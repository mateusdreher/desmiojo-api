import { Recipe } from "../../domain/recipe";

export interface IRecipeRepository {
  save(props: Recipe): Promise<void>;
  getByAuthor(userId: string): Promise<Recipe[]>;
  getByAuthorAndId(authorId: string, id: string): Promise<Recipe | null>;
  getById(id: string): Promise<Recipe | null>;
  delete(id: string): Promise<void>;
}
