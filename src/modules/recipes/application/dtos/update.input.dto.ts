import { IngredientsInputType } from "./ingredients.input.type";

export type UpdateRecipeInputDTO = {
  id: string;
  category?: number;
  title?: string;
  preparation_time_minutes?: number;
  servings?: number;
  preparation_method?: string;
  ingredients: IngredientsInputType[];
};
