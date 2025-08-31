import { CreateUserUseCase } from "../../../application/use-cases/create.use-case";
import { UserPrismaRepository } from "../../repositories/user.prisma.repository";
import { CreateUserController } from "./controller";

const userRepository = new UserPrismaRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
