import { RecipeStatusType } from "../../domain";
import { IngredientsInputType } from "./ingredients.input.type";

export type RecipeOutputDTO = {
  category: number;
  author: string;
  title: string;
  preparation_time_minutes: number;
  servings: number;
  preparation_method: string;
  ingredients: IngredientsInputType[];
  status?: RecipeStatusType;
};
