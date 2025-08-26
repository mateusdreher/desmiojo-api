import { UnitTypes } from "../../domain/vo/ingredient.vo";

export type IngredientsInputType = {
  value: string;
  quantity: number;
  unit: UnitTypes;
};
