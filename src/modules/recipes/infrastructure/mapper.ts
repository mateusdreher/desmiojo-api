import { Recipe as PrismaRecipe, Prisma, RecipeStatus } from "@prisma/client";
import { Recipe, RecipeStatusType } from "../domain/recipe";
import { UserID as AuthorID } from "../../users";
import { Ingredient, UnitTypes } from "../domain/vo/ingredient.vo";
import { RecipeID } from "../domain/vo/recipe-id.vo";

export class RecipeMapper {
  public static toDomain(raw: PrismaRecipe): Recipe {
    const id = new RecipeID(raw.id);
    const author = new AuthorID(raw.authorId);
    const ingredientsSplited = raw.ingredients.split(",");
    const ingredients = ingredientsSplited.map((item: string) => {
      const [value, quantity, unit] = item.split("-");
      return Ingredient.create({
        value,
        quantity: Number(quantity),
        unit: unit as UnitTypes,
      });
    });

    return Recipe.load({
      id,
      author,
      ingredients,
      category: raw.categoryId,
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
    const ingredientsToInsert = entity.ingredients.map((ingredient) => {
      const ingredientVO = Ingredient.create(ingredient);
      return ingredientVO.toString();
    });

    return {
      id: entity.id.value,
      authorId: entity.author.value,
      ingredients: ingredientsToInsert.join(","),
      categoryId: entity.category,
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
