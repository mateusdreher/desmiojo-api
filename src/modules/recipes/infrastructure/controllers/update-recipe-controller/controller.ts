import { Request, Response, NextFunction } from "express";
import { IUseCase } from "../../../../__shared__/application/interfaces/use-case.interface";
import { RecipeOutputDTO } from "../../../application/dtos/recipe.output.dto";
import { UpdateRecipeInputDTO } from "../../../application/dtos/update.input.dto";

export class UpdateRecipeController {
  constructor(
    private readonly useCase: IUseCase<UpdateRecipeInputDTO, RecipeOutputDTO>,
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        id,
        categoryId,
        title,
        preparation_time_minutes,
        servings,
        preparation_method,
        ingredients,
      } = request.body;

      if (!id || !request.user?.userId) {
        return response.status(400).send("Review your payload");
      }

      const recipe = await this.useCase.execute({
        id,
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
