import { IPdfProvider } from "../interfaces/pdf-provider.interface";
import { IRecipeRepository } from "../interfaces/recipe.repository.interface";
import { IUseCase } from "../../../__shared__/application/interfaces/use-case.interface";
import { AuthorRecipeInputDTO } from "../dtos/author-recipe.input.dto";
import { GenerateRecipePdfOutputDTO } from "../dtos/generate-recipe-pdf.output.dto";
import { RecipeID } from "../../domain/vo/recipe-id.vo";
import { UserID as AuthorID } from "../../../users";
import { getRecipeHtmlTemplate } from "../templates/recipe-tempalte";

export class GenerateRecipePdfUseCase
  implements IUseCase<AuthorRecipeInputDTO, GenerateRecipePdfOutputDTO>
{
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly pdfProvider: IPdfProvider,
  ) {}

  async execute(
    input: AuthorRecipeInputDTO,
  ): Promise<GenerateRecipePdfOutputDTO> {
    const recipeId = new RecipeID(input.recipeId);
    const authorId = new AuthorID(input.authorId);

    const recipe = await this.recipeRepository.getByAuthorAndId(
      input.authorId,
      input.recipeId,
    );
    if (!recipe) {
      throw new Error(
        "User not author of this recipe or Recipe does not exists",
      );
    }

    if (!recipe.isPublished()) {
      throw new Error("Only can download a published recipe");
    }

    const html = getRecipeHtmlTemplate(recipe);

    const pdfBuffer = await this.pdfProvider.generateFromHtml(html);

    const filename = `${recipe.title.replace(/\s+/g, "-")}.pdf`;

    return { pdfBuffer, filename };
  }
}
