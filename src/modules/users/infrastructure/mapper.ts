import { Prisma, User as PrismaUser } from "@prisma/client";
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

  public static toSchema(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.value,
      name: user.name,
      login: user.login,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
