import { IUseCase } from "../../../../__shared__/application/interfaces/use-case.interface";
import { IUserRepository } from "../../../application/interfaces/user.repository.interface";
import { LoginUseCase } from "../../../application/use-cases/login.use-case";
import { JwtProvider } from "../../providers/jwt.provider";
import { UserPrismaRepository } from "../../repositories/user.prisma.repository";
import { LoginController } from "./controller";

const userRepository: IUserRepository = new UserPrismaRepository();
const authProvider = new JwtProvider();
const userUseCase = new LoginUseCase(userRepository, authProvider);
const loginController = new LoginController(userUseCase);

export { loginController };
