import { IUseCase } from "../../../../__shared__/application/interfaces/use-case.interface";
import { Request, Response, NextFunction } from "express";
import { RecipeOutputDTO } from "../../../application/dtos/recipe.output.dto";

export class ListByAuthorController {
  constructor(private readonly useCase: IUseCase<string, RecipeOutputDTO[]>) {}
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const authorId = request.user?.userId;

      if (!authorId) {
        return response.status(400).send("You must provde an author");
      }

      const recipes = await this.useCase.execute(authorId);

      return response.status(200).send(recipes);
    } catch (error) {
      next(error);
    }
  }
}
