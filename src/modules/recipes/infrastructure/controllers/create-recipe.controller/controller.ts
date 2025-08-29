import { Request, Response, NextFunction } from "express";
import { CreateRecipeInputDTO } from "../../../application/dtos/create.input.dto";
import { Recipe } from "../../../domain";
import { IUseCase } from "../../../../__shared__/application/interfaces/use-case.interface";

export class CreateRecipeController {
  constructor(
    private readonly useCase: IUseCase<CreateRecipeInputDTO, Recipe>,
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        categoryId,
        title,
        preparation_time_minutes,
        servings,
        preparation_method,
        ingredients,
      } = request.body;

      if (
        !categoryId ||
        !title ||
        !preparation_time_minutes ||
        !servings ||
        !preparation_method ||
        !ingredients ||
        !request.user?.userId
      ) {
        return response.status(400).send("Review your payload");
      }

      await this.useCase.execute({
        categoryId,
        authorId: request.user?.userId,
        title,
        preparation_time_minutes,
        servings,
        preparation_method,
        ingredients,
      });

      response.status(200).json({ message: "Recipe created as draft" });
    } catch (error) {
      next(error);
    }
  }
}
