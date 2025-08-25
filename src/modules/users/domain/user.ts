import { Password } from "./vo/password.vo";
import { UserID } from "./vo/user-id.vo";

export class User {
  public readonly id: UserID;
  private _name: string;
  private _login: string;
  private _password: Password;
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(init: {
    id: UserID;
    name: string;
    login: string;
    password: Password;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = init.id;
    this._name = init.name;
    this._login = init.login;
    this._password = init.password;
    this._createdAt = init.createdAt;
    this._updatedAt = init.updatedAt;
  }

  public get name(): string {
    return this._name;
  }
  public get login(): string {
    return this._login;
  }
  public get createdAt(): Date {
    return this._createdAt;
  }
  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public static async create(props: {
    name: string;
    login: string;
    textPassword: string;
  }): Promise<User> {
    const password = await Password.create(props.textPassword);

    return new User({
      id: new UserID(),
      name: props.name,
      login: props.login,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static load(props: {
    id: UserID;
    name: string;
    login: string;
    passwordHashed: string;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    const password = Password.createFromHash(props.passwordHashed);

    return new User({ ...props, password });
  }

  public changeName(newName: string) {
    this.name = newName;
    this.updatedAt = new Date();
  }

  public changeLogin(newLogin: string) {
    this.login = newLogin;
    this.updatedAt = new Date();
  }
  public async changePassword(newPlainTextPassword: string): Promise<void> {
    this.password = await Password.create(newPlainTextPassword);
    this.updatedAt = new Date();
  }
  public async isPasswordCorrect(plainTextPassword: string): Promise<boolean> {
    return this.password.compare(plainTextPassword);
  }
}
