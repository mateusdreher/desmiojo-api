import { Request, Response, NextFunction } from "express";
import { IUseCase } from "../../../../__shared__/application/interfaces/use-case.interface";
import { AuthorRecipeInputDTO } from "../../../application/dtos/author-recipe.input.dto";
import { GenerateRecipePdfOutputDTO } from "../../../application/dtos/generate-recipe-pdf.output.dto";

export class DownloadRecipeController {
  constructor(
    private readonly generateRecipePdfUseCase: IUseCase<
      AuthorRecipeInputDTO,
      GenerateRecipePdfOutputDTO
    >,
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { recipeId } = request.params;
      const authorId = request.user!.userId;

      const { pdfBuffer, filename } =
        await this.generateRecipePdfUseCase.execute({
          recipeId,
          authorId,
        });

      response.setHeader("Content-Type", "application/pdf");
      response.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`,
      );
      response.setHeader("Content-Length", pdfBuffer.length);

      response.send(pdfBuffer);
    } catch (error) {
      next(error);
    }
  }
}
