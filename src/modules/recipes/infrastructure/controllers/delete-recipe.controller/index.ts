import { IRecipeRepository } from "../../../application/interfaces/recipe.repository.interface";
import { DeleteUseCase } from "../../../application/use-cases/delete.use-case";
import { PrismaRecipeRepository } from "../../repositories/recipe.repository";
import { DeleteRecipeController } from "./controller";

const recipeRepository: IRecipeRepository = new PrismaRecipeRepository();
const deleteRecipeUseCase = new DeleteUseCase(recipeRepository);
const deleteRecipeController = new DeleteRecipeController(deleteRecipeUseCase);

export { deleteRecipeController };
