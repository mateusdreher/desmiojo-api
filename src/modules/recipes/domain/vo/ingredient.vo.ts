export type UnitTypes = "ml" | "g" | "un";
const UNIT_TYPES_VALIDATE = ["ml", "g", "un"] as const;

export class Ingredient {
  public value: string;
  public quantity: number;
  public unit: UnitTypes;

  constructor(props: { value: string; quantity: number; unit: UnitTypes }) {
    this.value = props.value;
    this.quantity = props.quantity;
    this.unit = props.unit;
  }

  public static create(props: {
    value: string;
    quantity: number;
    unit: UnitTypes;
  }) {
    if (props.value.trim().length < 2) {
      throw new Error("Ingredient name is toot short");
    }
    if (props.quantity === 0) {
      throw new Error("Quantity must be latest 1");
    }
    return new Ingredient(props);
  }

  public toString(): string {
    return `${this.value}-${this.quantity}-${this.unit}`;
  }

  public load(props: string): Ingredient {
    const [value, quantity, unit] = props.split("-");
    if (!value || !quantity || !unit) {
      throw new Error("Ingredient mal formatted");
    }
    if (isNaN(Number(quantity))) {
      throw new Error(`Invalid quantity: ${quantity}`);
    }
    if (!UNIT_TYPES_VALIDATE.includes(unit as UnitTypes)) {
      throw new Error(`Invalid unit: ${unit}`);
    }

    return new Ingredient({
      value,
      quantity: Number(quantity),
      unit: unit as UnitTypes,
    });
  }
}
