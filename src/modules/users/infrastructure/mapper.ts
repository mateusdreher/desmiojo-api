import { User as PrismaUser } from "@prisma/client";
import { User } from "../domain/user";
import { UserID } from "../domain/vo/user-id.vo";

export class UserMapper {
  public static toDomain(raw: PrismaUser): User {
    return User.load({
      id: new UserID(raw.id),
      name: raw.name,
      login: raw.login,
      passwordHashed: raw.password,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
