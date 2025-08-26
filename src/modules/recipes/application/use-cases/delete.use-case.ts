import { IUseCase } from "../../../__shared__/application/interfaces/use-case.interface";
import { DeleteInputDTO } from "../dtos/delete.input.dto";
import { IRecipeRepository } from "../interfaces/recipe.repository.interface";

export class DeleteUseCase implements IUseCase<DeleteInputDTO, void> {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute(input: DeleteInputDTO) {
    const isUserAuthor = await this.recipeRepository.getByAuthorAndId(
      input.authorId,
      input.recipeId,
    );

    if (!isUserAuthor) {
      throw new Error("User not author of this recipe");
    }

    const isRecipeExists = await this.recipeRepository.getById(input.recipeId);

    if (!isRecipeExists) {
      throw new Error("Recipe does not exists");
    }

    await this.recipeRepository.delete(input.recipeId);
  }
}
