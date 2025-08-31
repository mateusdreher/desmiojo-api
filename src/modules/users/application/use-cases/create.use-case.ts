import { IUseCase } from "../../../__shared__/application/interfaces/use-case.interface";
import { User } from "../../domain/user";
import { CreateUserInputDTO } from "../dtos/create-user.input.dto";
import { UserOutputDTO } from "../dtos/user.output.dto";
import { IUserRepository } from "../interfaces/user.repository.interface";

export class AlreadyExistsUserWithLoginError extends Error {
  constructor() {
    super("Already exists an user with this login");
    this.name = "AlreadyExistsUserWithLoginError";
  }
}

export class CreateUserUseCase
  implements IUseCase<CreateUserInputDTO, UserOutputDTO>
{
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(input: CreateUserInputDTO): Promise<UserOutputDTO> {
    const newUser = await User.create(input);
    const alreadyExistsUserWithLogin = await this.userRepository.getByLogin(
      input.login,
    );

    if (alreadyExistsUserWithLogin) {
      throw new AlreadyExistsUserWithLoginError();
    }
    await this.userRepository.save(newUser);

    return {
      id: newUser.id.value,
      name: newUser.name,
      login: newUser.login,
    };
  }
}
