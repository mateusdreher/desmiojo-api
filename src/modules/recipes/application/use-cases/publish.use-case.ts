import { IUseCase } from "../../../__shared__/application/interfaces/use-case.interface";
import { AuthorRecipeInputDTO } from "../dtos/author-recipe.input.dto";
import { IRecipeRepository } from "../interfaces/recipe.repository.interface";

export class PublishrecipeUseCase
  implements IUseCase<AuthorRecipeInputDTO, void>
{
  constructor(private readonly recipeRepository: IRecipeRepository) {}
  async execute(input: AuthorRecipeInputDTO): Promise<void> {
    const isUserAuthor = await this.recipeRepository.getByAuthorAndId(
      input.authorId,
      input.recipeId,
    );

    const recipe = await this.recipeRepository.getById(input.recipeId);

    if (!isUserAuthor || !recipe) {
      throw new Error(
        "User not author of this recipe or Recipe does not exists",
      );
    }

    recipe.publish();

    await this.recipeRepository.save(recipe);
  }
}
