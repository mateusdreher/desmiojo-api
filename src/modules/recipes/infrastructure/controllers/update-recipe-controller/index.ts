import { UptadeRecipeUseCase } from "../../../application/use-cases/update.use-case";
import { PrismaRecipeRepository } from "../../repositories/recipe.repository";
import { UpdateRecipeController } from "./controller";

const recipeRepository = new PrismaRecipeRepository();
const updateRecipeUseCase = new UptadeRecipeUseCase(recipeRepository);
const updateRecipeController = new UpdateRecipeController(updateRecipeUseCase);

export { updateRecipeController };
