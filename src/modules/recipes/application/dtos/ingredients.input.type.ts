import { UnitTypes } from "../../domain/vo/ingredient.vo";

export type IngredientsInputType = {
  name: string;
  quantity: number;
  unit: UnitTypes;
};
