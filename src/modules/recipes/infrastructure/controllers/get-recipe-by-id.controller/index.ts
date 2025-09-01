import { GetRecipeByIdUseCase } from "../../../application/use-cases/get-by-id.use-case";
import { PrismaRecipeRepository } from "../../repositories/recipe.repository";
import { GetRecipeByIdController } from "./controller";

const recipeRepository = new PrismaRecipeRepository();
const getRecipeByIdUseCase = new GetRecipeByIdUseCase(recipeRepository);
const getRecipeByIdController = new GetRecipeByIdController(
  getRecipeByIdUseCase,
);

export { getRecipeByIdController };
