import { IUseCase } from "../../../__shared__/application/interfaces/use-case.interface";
import { UserID as AuthorID } from "../../../users";
import { Recipe } from "../../domain";
import { Ingredient } from "../../domain/vo/ingredient.vo";
import { CreateRecipeInputDTO } from "../dtos/create.input.dto";
import { IRecipeRepository } from "../interfaces/recipe.repository.interface";

export class CreateUseCase implements IUseCase<CreateRecipeInputDTO, Recipe> {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute(input: CreateRecipeInputDTO): Promise<Recipe> {
    const { authorId, ingredients, ...rest } = input;

    const authorID = new AuthorID(input.authorId);
    const newIngredients = ingredients.map((item) => Ingredient.create(item));
    const newRecipe = await Recipe.create({
      authorId: authorID,
      ingredients: newIngredients,
      ...rest,
    });

    await this.recipeRepository.save(newRecipe);

    return newRecipe;
  }
}
