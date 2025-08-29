import { PrismaClient, Recipe as PrismaRecipe } from "@prisma/client";
import { IRecipeRepository } from "../../application/interfaces/recipe.repository.interface";
import { Recipe } from "../../domain";
import { RecipeMapper } from "../mapper";

export class PrismaRecipeRepository implements IRecipeRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async save(recipe: Recipe) {
    const persistenceData = RecipeMapper.toSchema(recipe);
    console.log("\n\n");
    console.log(persistenceData);
    console.log("\n\n");
    await this.prisma.recipe.upsert({
      where: { id: recipe.id.value },
      create: persistenceData,
      update: {
        ...persistenceData,
        authorId: undefined,
        createdAt: undefined,
      },
    });
  }
  async getByAuthor(authorId: string): Promise<Recipe[]> {
    const rawRecipes = await this.prisma.recipe.findMany({
      where: { authorId: authorId.toString() },
      orderBy: { createdAt: "desc" },
    });

    return !rawRecipes
      ? []
      : rawRecipes.map((item: PrismaRecipe) => RecipeMapper.toDomain(item));
  }
  async getByAuthorAndId(authorId: string, id: string): Promise<Recipe | null> {
    const rawRecipe = await this.prisma.recipe.findFirst({
      where: { id, authorId },
    });

    if (!rawRecipe) return null;

    return RecipeMapper.toDomain(rawRecipe);
  }
  async getById(id: string): Promise<Recipe | null> {
    const rawRecipe = await this.prisma.recipe.findFirst({
      where: { id },
    });

    if (!rawRecipe) return null;

    return RecipeMapper.toDomain(rawRecipe);
  }
  async delete(id: string) {
    await this.prisma.recipe.delete({ where: { id } });
  }
}
