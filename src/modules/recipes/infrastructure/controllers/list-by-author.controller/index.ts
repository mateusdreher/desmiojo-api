import { IRecipeRepository } from "../../../application/interfaces/recipe.repository.interface";
import { ListByAuthorUseCase } from "../../../application/use-cases/list-by-author.use-case";
import { PrismaRecipeRepository } from "../../repositories/recipe.repository";
import { ListByAuthorController } from "./controller";

const recipeRepository: IRecipeRepository = new PrismaRecipeRepository();
const listByAuthorRecipeUseCase = new ListByAuthorUseCase(recipeRepository);
const listByAuthorRecipeController = new ListByAuthorController(
  listByAuthorRecipeUseCase,
);

export { listByAuthorRecipeController };
