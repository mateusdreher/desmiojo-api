export type UnitTypes = "ml" | "g" | "un";
type IngredientType = { name: string; quantity: number; unit: UnitTypes };
export class Ingredient {
  public name: string;
  public quantity: number;
  public unit: UnitTypes;

  private constructor(props: IngredientType) {
    this.name = props.name;
    this.quantity = props.quantity;
    this.unit = props.unit;
  }

  public toString(): string {
    return JSON.stringify({
      name: this.name,
      quantity: this.quantity,
      unit: this.unit,
    });
  }

  public static create(props: IngredientType) {
    console.log("\n\nINGREDIENT");
    console.log(props);
    console.log("\n\n");

    return new Ingredient(props);
  }

  public static load(props: string): Ingredient {
    //console.log("ARRUMAR");
    //console.log(props.split("},"));
    const { name, quantity, unit } = JSON.parse(props);
    return new Ingredient({
      name,
      quantity: Number(quantity),
      unit: unit as UnitTypes,
    });
  }
}
