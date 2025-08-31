import { IUseCase } from "../../../__shared__/application/interfaces/use-case.interface";
import { UserID as AuthorID } from "../../../users";
import { AuthorRecipeInputDTO } from "../dtos/author-recipe.input.dto";
import {
  ForbiddenAccessError,
  RecipeNotFoundError,
} from "../errors/recipe.errors";
import { IRecipeRepository } from "../interfaces/recipe.repository.interface";

export class DeleteUseCase implements IUseCase<AuthorRecipeInputDTO, void> {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute(input: AuthorRecipeInputDTO) {
    const recipe = await this.recipeRepository.getById(input.recipeId);

    if (!recipe) {
      throw new RecipeNotFoundError(input.recipeId);
    }

    const authorId = new AuthorID(input.authorId);
    if (!recipe.authorId.equals(authorId)) {
      throw new ForbiddenAccessError("Only author can delete this recipe");
    }

    await this.recipeRepository.delete(input.recipeId);
  }
}
