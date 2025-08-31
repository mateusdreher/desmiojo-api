import { IUseCase } from "../../../../__shared__/application/interfaces/use-case.interface";
import { LoginInputDTO } from "../../../application/dtos/login.input.dto";
import { LoginOutputDTO } from "../../../application/dtos/login.output.dto";
import { Request, Response, NextFunction } from "express";

export class LoginController {
  constructor(
    private readonly useCase: IUseCase<LoginInputDTO, LoginOutputDTO>,
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { login, password } = request.body;

      if (!login || !password) {
        response.status(400).send("Review your payload");
      }

      const token = await this.useCase.execute({ login, password });

      response.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
}
