import { IUseCase } from "../../../__shared__/application/interfaces/use-case.interface";
import { UserID as AuthorID } from "../../../users";
import { Recipe, RecipeStatusType } from "../../domain";
import { RecipeOutputDTO } from "../dtos/recipe.output.dto";
import { IRecipeRepository } from "../interfaces/recipe.repository.interface";

export class ListByUserUseCase implements IUseCase<string, RecipeOutputDTO[]> {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute(input: string): Promise<RecipeOutputDTO[]> {
    const authorID = new AuthorID(input);

    const recipes = await this.recipeRepository.getByAuthor(authorID.value);

    if (recipes.length === 0) return [];

    return recipes.map((item: Recipe) => {
      return {
        category: item.category,
        author: item.author.value,
        title: item.title,
        preparation_time_minutes: item.preparation_time_minutes,
        servings: item.servings,
        preparation_method: item.preparation_method,
        ingredients: item.ingredients.map((ingredient) => {
          return {
            value: ingredient.value,
            unit: ingredient.unit,
            quantity: ingredient.quantity,
          };
        }),
        status: item.status as RecipeStatusType,
      };
    });
  }
}
