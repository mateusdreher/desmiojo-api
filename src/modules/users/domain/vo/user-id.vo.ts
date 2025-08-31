import { v4 as uuidv4 } from "uuid";

export class UserID {
  public readonly value: string;

  constructor(id?: string) {
    this.value = id || uuidv4();
  }

  public equals(id?: UserID): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.value === this.value;
  }
}
