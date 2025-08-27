import { IUseCase } from "../../../../__shared__/application/interfaces/use-case.interface";
import { AuthorRecipeInputDTO } from "../../../application/dtos/author-recipe.input.dto";
import { Request, Response, NextFunction } from "express";

export class DeleteRecipeController {
  constructor(private readonly useCase: IUseCase<AuthorRecipeInputDTO, void>) {}
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { authorId, recipeId } = request.body;

      if (!authorId || !recipeId) {
        response.status(400).send("Verify your payload");
      }

      await this.useCase.execute({ authorId, recipeId });

      response.status(200).json({ message: "Recipe deleted" });
    } catch (error) {
      next(error);
    }
  }
}
