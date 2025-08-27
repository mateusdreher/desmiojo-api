import { IRecipeRepository } from "../../../application/interfaces/recipe.repository.interface";
import { CreateUseCase } from "../../../application/use-cases/create.use-case";
import { PrismaRecipeRepository } from "../../repositories/recipe.repository";
import { CreateRecipeController } from "./controller";

const recipeRepository: IRecipeRepository = new PrismaRecipeRepository();
const createRecipeUseCase = new CreateUseCase(recipeRepository);
const createRecipeController = new CreateRecipeController(createRecipeUseCase);

export { createRecipeController };
