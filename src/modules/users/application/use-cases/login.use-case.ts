import { IUseCase } from "../../../__shared__/application/interfaces/use-case.interface";
import { LoginOutputDTO } from "../dtos/login.output.dto";
import { LoginInputDTO } from "../dtos/login.input.dto";
import { IUserRepository } from "../interfaces/user.repository.interface";
import { IAuthProvider } from "../interfaces/auth.provider.interface";

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid login or password.");
    this.name = "InvalidCredentialsError";
  }
}

export class LoginUseCase implements IUseCase<LoginInputDTO, LoginOutputDTO> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authProvider: IAuthProvider,
  ) {}

  async execute(input: LoginInputDTO): Promise<LoginOutputDTO> {
    const user = await this.userRepository.getByLogin(input.login);

    const isPasswordCorrect = user
      ? await user.isPasswordCorrect(input.password)
      : false;

    if (!user || !isPasswordCorrect) {
      throw new InvalidCredentialsError();
    }

    const token = await this.authProvider.generateToken({
      userId: user.id.value,
    });

    return {
      token,
    };
  }
}
