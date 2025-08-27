import { IUseCase } from "../../../../__shared__/application/interfaces/use-case.interface";
import { Request, Response, NextFunction } from "express";
import { RecipeOutputDTO } from "../../../application/dtos/recipe.output.dto";

export class ListByAuthorController {
  constructor(private readonly useCase: IUseCase<string, RecipeOutputDTO[]>) {}
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const authorId = request.query.q as string;

      if (!authorId) {
        response.status(400).send("You must provde an author");
      }

      return await this.useCase.execute(authorId);
    } catch (error) {
      next(error);
    }
  }
}
