import { Request, Response, NextFunction } from "express";
import { CreateRecipeInputDTO } from "../../../application/dtos/create.input.dto";
import { Recipe } from "../../../domain";
import { IUseCase } from "../../../../__shared__/application/interfaces/use-case.interface";
import { RecipeOutputDTO } from "../../../application/dtos/recipe.output.dto";

export class CreateRecipeController {
  constructor(
    private readonly useCase: IUseCase<CreateRecipeInputDTO, RecipeOutputDTO>,
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

      const recipe = await this.useCase.execute({
        categoryId,
        authorId: request.user.userId,
        title,
        preparation_time_minutes,
        servings,
        preparation_method,
        ingredients,
      });

      console.log("\n\nCONTROLLER", recipe);

      response.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
}
