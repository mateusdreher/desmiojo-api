import { AuthorRecipeInputDTO } from "../dtos/author-recipe.input.dto";
import { RecipeOutputDTO } from "../dtos/recipe.output.dto";
import { IRecipeRepository } from "../interfaces/recipe.repository.interface";
import { UserID as AuthorID } from "../../../users";
import {
  ForbiddenAccessError,
  RecipeNotFoundError,
} from "../errors/recipe.errors";
import { RecipeStatusType } from "../../domain";
import { IUseCase } from "../../../__shared__/application/interfaces/use-case.interface";

export class GetRecipeByIdUseCase
  implements IUseCase<AuthorRecipeInputDTO, RecipeOutputDTO>
{
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute(input: AuthorRecipeInputDTO): Promise<RecipeOutputDTO> {
    const recipe = await this.recipeRepository.getById(input.recipeId);

    if (!recipe) {
      throw new RecipeNotFoundError(input.recipeId);
    }

    const authorId = new AuthorID(input.authorId);
    if (!recipe.authorId.equals(authorId)) {
      throw new ForbiddenAccessError("Only author view this recipe");
    }

    return {
      id: recipe.id.value,
      categoryId: recipe.categoryId,
      authorId: recipe.authorId.value,
      title: recipe.title,
      preparation_time_minutes: recipe.preparation_time_minutes,
      servings: recipe.servings,
      preparation_method: recipe.preparation_method,
      ingredients: recipe.ingredients.map((ingredient) => {
        return {
          name: ingredient.name,
          unit: ingredient.unit,
          quantity: ingredient.quantity,
        };
      }),
      status: recipe.status as RecipeStatusType,
    };
  }
}
