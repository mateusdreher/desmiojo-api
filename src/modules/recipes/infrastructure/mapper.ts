import { Recipe as PrismaRecipe, Prisma, RecipeStatus } from "@prisma/client";
import { Recipe, RecipeStatusType } from "../domain/recipe";
import { UserID as AuthorID } from "../../users";
import { RecipeID } from "../domain/vo/recipe-id.vo";
import { Ingredient, UnitTypes } from "../domain/vo/ingredient.vo";

export class RecipeMapper {
  public static toDomain(raw: PrismaRecipe): Recipe {
    const id = new RecipeID(raw.id);
    const authorId = new AuthorID(raw.authorId);
    const ingredientsSplited = raw.ingredients.replace("},", "},@").split(",@");
    const ingredients = ingredientsSplited.map((item: string) =>
      Ingredient.load(item),
    );

    return Recipe.load({
      id,
      authorId,
      ingredients,
      categoryId: raw.categoryId,
      title: raw.title,
      servings: raw.servings,
      preparation_method: raw.preparation_method,
      preparation_time_minutes: raw.preparation_time_minutes,
      status: raw.status as RecipeStatusType,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  public static toSchema(entity: Recipe): Prisma.RecipeUncheckedCreateInput {
    return {
      id: entity.id.value,
      authorId: entity.authorId.value,
      ingredients: entity.ingredients.toString(),
      categoryId: entity.categoryId,
      title: entity.title,
      servings: entity.servings,
      preparation_method: entity.preparation_method,
      preparation_time_minutes: entity.preparation_time_minutes,
      status: entity.status as RecipeStatus,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
