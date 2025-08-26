import { IRecipeRepository } from "../../application/interfaces/recipe.repository.interface";
import { Recipe } from "../../domain";
import { Ingredient } from "../../domain/vo/ingredient.vo";

export class RecipeRepository implements IRecipeRepository {
  create(props: Recipe) {
    const { ingredients, ...rest } = props;

    const ingredientsToInsert = ingredients.map((ingredient) => {
      const ingredientVO = Ingredient.create(ingredient);
      return ingredientVO.toString();
    });

    //salvar no bacno com join dos ingredientes
    throw new Error("Method not implemented.");
  }
  getByUser(userId: string): Promise<Recipe[]> {
    throw new Error("Method not implemented.");
  }
  getByAuthorAndId(authorId: string, id: string): Promise<Recipe | null> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<Recipe | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string) {
    throw new Error("Method not implemented.");
  }
}
