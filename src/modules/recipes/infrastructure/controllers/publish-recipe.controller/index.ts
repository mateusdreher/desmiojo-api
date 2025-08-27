import { IRecipeRepository } from "../../../application/interfaces/recipe.repository.interface";
import { DeleteUseCase } from "../../../application/use-cases/delete.use-case";
import { PrismaRecipeRepository } from "../../repositories/recipe.repository";
import { PublishRecipeController } from "./controller";

const recipeRepository: IRecipeRepository = new PrismaRecipeRepository();
const publishRecipeUseCase = new DeleteUseCase(recipeRepository);
const publishRecipeController = new PublishRecipeController(
  publishRecipeUseCase,
);

export { publishRecipeController };
