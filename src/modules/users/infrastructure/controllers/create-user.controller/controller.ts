import { IUseCase } from "../../../../__shared__/application/interfaces/use-case.interface";
import { CreateUserInputDTO } from "../../../application/dtos/create-user.input.dto";
import { LoginInputDTO } from "../../../application/dtos/login.input.dto";
import { LoginOutputDTO } from "../../../application/dtos/login.output.dto";
import { Request, Response, NextFunction } from "express";
import { UserOutputDTO } from "../../../application/dtos/user.output.dto";

export class CreateUserController {
  constructor(
    private readonly useCase: IUseCase<CreateUserInputDTO, UserOutputDTO>,
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, login, textPassword } = request.body;

      if (!name || !login || !textPassword) {
        response.status(400).send("Review your payload");
      }

      const token = await this.useCase.execute({ name, login, textPassword });

      response.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
