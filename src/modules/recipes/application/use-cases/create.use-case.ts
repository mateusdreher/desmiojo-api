import { IUseCase } from "../../../__shared__/application/interfaces/use-case.interface";
import { UserID as AuthorID } from "../../../users";
import { Recipe } from "../../domain";
import { Ingredient } from "../../domain/vo/ingredient.vo";
import { RecipeID } from "../../domain/vo/recipe-id.vo";
import { CreateRecipeInputDTO } from "../dtos/create.input.dto";
import { IRecipeRepository } from "../interfaces/recipe.repository.interface";

export class CreateUseCase implements IUseCase<CreateRecipeInputDTO, Recipe> {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute(input: CreateRecipeInputDTO): Promise<Recipe> {
    const { author, ingredients, ...rest } = input;

    const recipeId = RecipeID.createFromTitle(input.title);

    const existentRecipe = await this.recipeRepository.getById(recipeId.value);

    if (existentRecipe) {
      throw new Error(`Recipe already registred with title ${input.title}`);
    }

    const authorID = new AuthorID(input.author);
    const newIngredients = ingredients.map((item) => Ingredient.create(item));

    const newRecipe = await Recipe.create({
      author: authorID,
      ingredients: newIngredients,
      ...rest,
    });

    await this.recipeRepository.save(newRecipe);

    return newRecipe;
  }
}
