import { GenerateRecipePdfUseCase } from "../../../application/use-cases/generate-recipe-pdf.use-case";
import { PuppeteerPdfProvider } from "../../providers/puppeteer-provider";
import { PrismaRecipeRepository } from "../../repositories/recipe.repository";
import { DownloadRecipeController } from "./controller";

const recipeRepository = new PrismaRecipeRepository();
const pdfProvider = new PuppeteerPdfProvider();
const downloadRecipeUseCase = new GenerateRecipePdfUseCase(
  recipeRepository,
  pdfProvider,
);
const downloadRecipeController = new DownloadRecipeController(
  downloadRecipeUseCase,
);

export { downloadRecipeController };
