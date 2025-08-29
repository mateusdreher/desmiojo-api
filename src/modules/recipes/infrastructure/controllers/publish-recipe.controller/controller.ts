import { IUseCase } from "../../../../__shared__/application/interfaces/use-case.interface";
import { Request, Response, NextFunction } from "express";
import { AuthorRecipeInputDTO } from "../../../application/dtos/author-recipe.input.dto";

export class PublishRecipeController {
  constructor(private readonly useCase: IUseCase<AuthorRecipeInputDTO, void>) {}
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { recipeId } = request.body;
      const authorId = request.user?.userId;

      if (!authorId || !recipeId) {
        return response.status(400).send("Verify your payload");
      }

      await this.useCase.execute({ authorId, recipeId });

      response.status(200).json({ message: "Recipe published" });
    } catch (error) {
      next(error);
    }
  }
}
