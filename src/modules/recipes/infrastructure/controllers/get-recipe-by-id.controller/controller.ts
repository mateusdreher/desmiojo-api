import { Request, Response, NextFunction } from "express";
import { IUseCase } from "../../../../__shared__/application/interfaces/use-case.interface";
import { AuthorRecipeInputDTO } from "../../../application/dtos/author-recipe.input.dto";
import { RecipeOutputDTO } from "../../../application/dtos/recipe.output.dto";

export class GetRecipeByIdController {
  constructor(
    private readonly useCase: IUseCase<AuthorRecipeInputDTO, RecipeOutputDTO>,
  ) {}
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { recipeId } = request.params;
      const authorId = request.user?.userId;

      if (!authorId || !recipeId) {
        return response.status(400).send("Verify your payload");
      }

      const recipe = await this.useCase.execute({ authorId, recipeId });

      response.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
}
