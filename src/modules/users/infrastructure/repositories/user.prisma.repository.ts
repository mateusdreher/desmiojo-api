import { IUserRepository } from "../../application/interfaces/user.repository.interface";
import { User } from "../../domain/user";
import { PrismaClient } from "@prisma/client";
import { UserMapper } from "../mapper";

export class UserPrismaRepository implements IUserRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async save(user: User): Promise<void> {
    const persistenceData = UserMapper.toSchema(user);
    await this.prisma.user.upsert({
      where: { id: user.id.value },
      create: persistenceData,
      update: {
        ...persistenceData,
        createdAt: undefined,
      },
    });
  }

  async getByLogin(login: string): Promise<User | null> {
    const rawUser = await this.prisma.user.findFirst({ where: { login } });

    if (!rawUser) return null;

    return UserMapper.toDomain(rawUser);
  }
}
