import { User } from "../../domain/user";

export interface IUserRepository {
  getByLogin(login: string): Promise<User | null>;
}
