import { IUseCase } from "../../../../__shared__/application/interfaces/use-case.interface";
import { IUserRepository } from "../../../application/interfaces/user.repository.interface";
import { LoginUseCase } from "../../../application/use-cases/login.use-case";
import { AuthProvider } from "../../providers/auth.provider";
import { UserPrismaRepository } from "../../repositories/user.prisma.repository";
import { LoginController } from "./controller";

const userRepository: IUserRepository = new UserPrismaRepository();
const authProvider = new AuthProvider();
const userUseCase = new LoginUseCase(userRepository, authProvider);
const loginController = new LoginController(userUseCase);

export { loginController };
