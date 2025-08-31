import { IUseCase } from "../../../__shared__/application/interfaces/use-case.interface";
import { RecipeStatusType } from "../../domain";
import { Ingredient } from "../../domain/vo/ingredient.vo";
import { RecipeOutputDTO } from "../dtos/recipe.output.dto";
import { UpdateRecipeInputDTO } from "../dtos/update.input.dto";
import {
  ForbiddenAccessError,
  RecipeNotFoundError,
} from "../errors/recipe.errors";
import { IRecipeRepository } from "../interfaces/recipe.repository.interface";
import { UserID as AuthorID } from "../../../users";

export class UptadeRecipeUseCase
  implements IUseCase<UpdateRecipeInputDTO, RecipeOutputDTO>
{
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute(input: UpdateRecipeInputDTO): Promise<RecipeOutputDTO> {
    const recipe = await this.recipeRepository.getById(input.id);

    if (!recipe) {
      throw new RecipeNotFoundError(input.id);
    }
    const authorId = new AuthorID(input.authorId);
    if (!recipe.authorId.equals(authorId)) {
      throw new ForbiddenAccessError("Only author can publish this recipe");
    }

    if (input.preparation_method) {
      recipe.changePreparationMethod(input.preparation_method);
    }
    if (input.preparation_time_minutes) {
      recipe.changePreparationtime(input.preparation_time_minutes);
    }
    if (input.categoryId) {
      recipe.changeCategory(input.categoryId);
    }
    if (input.servings) {
      recipe.changeServings(input.servings);
    }
    if (input.title) {
      recipe.changeTitle(input.title);
    }
    if (input.ingredients.length) {
      const newIngredients = input.ingredients.map((item) =>
        Ingredient.create(item),
      );
      recipe.changeIngredients(newIngredients);
    }

    await this.recipeRepository.save(recipe);

    return {
      id: recipe.id.value,
      authorId: recipe.authorId.value,
      categoryId: recipe.categoryId,
      ingredients: recipe.ingredients,
      preparation_method: recipe.preparation_method,
      preparation_time_minutes: recipe.preparation_time_minutes,
      servings: recipe.servings,
      title: recipe.title,
      status: recipe.status as RecipeStatusType,
    };
  }
}
