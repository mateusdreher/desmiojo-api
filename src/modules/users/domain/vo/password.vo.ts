import * as bcrypt from "bcryptjs";

export class InvalidPasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidPasswordError";
  }
}

export class Password {
  private static readonly SALT_ROUNDS = 12;
  private readonly value: string;
  private readonly isHashed: boolean;

  private constructor({
    value,
    isHashed,
  }: {
    value: string;
    isHashed: boolean;
  }) {
    this.value = value;
    this.isHashed = isHashed;
  }

  public get(): string {
    return this.value;
  }

  public async compare(plainText: string): Promise<boolean> {
    if (!this.isHashed) {
      return false;
    }
    return bcrypt.compare(plainText, this.value);
  }

  public static async create(password: string): Promise<Password> {
    if (password.length < 8) {
      throw new InvalidPasswordError(
        "Password must be at least 8 characters long.",
      );
    }
    const hash = await bcrypt.hash(password, this.SALT_ROUNDS);

    return new Password({ value: hash, isHashed: true });
  }

  public static createFromHash(hashed: string): Password {
    return new Password({ value: hashed, isHashed: true });
  }
}
