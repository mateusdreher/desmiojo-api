import { IRecipeRepository } from "../../../application/interfaces/recipe.repository.interface";
import { PublishrecipeUseCase } from "../../../application/use-cases/publish.use-case";
import { PrismaRecipeRepository } from "../../repositories/recipe.repository";
import { PublishRecipeController } from "./controller";

const recipeRepository: IRecipeRepository = new PrismaRecipeRepository();
const publishRecipeUseCase = new PublishrecipeUseCase(recipeRepository);
const publishRecipeController = new PublishRecipeController(
  publishRecipeUseCase,
);

export { publishRecipeController };
