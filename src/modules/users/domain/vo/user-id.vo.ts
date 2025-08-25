import { v4 as uuidv4 } from "uuid";

export class UserID {
  private value: string;

  constructor(id?: string) {
    this.value = id || uuidv4();
  }

  public get value(): string {
    return this.value;
  }

  public equals(id?: UserID): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.toString() === this.value;
  }
}
