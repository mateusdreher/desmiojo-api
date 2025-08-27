import { Request, Response, NextFunction } from "express";
import { InvalidPasswordError } from "../../../../users/domain/vo/password.vo";
import { InvalidCredentialsError } from "../../../../users/application/use-cases/login.use-case";

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction, // O 'next' é necessário, mesmo que não seja usado, para a assinatura correta.
) {
  console.error(`[ErrorHandler] ${error.name}: ${error.message}`);
  console.error(error.stack);

  if (error instanceof InvalidPasswordError) {
    return response.status(400).json({
      name: error.name,
      message: error.message,
    });
  }

  if (error instanceof InvalidCredentialsError) {
    return response.status(401).json({
      name: error.name,
      message: error.message,
    });
  }

  if (process.env.NODE_ENV === "production") {
    return response.status(500).json({
      name: "InternalServerError",
      message: "An unexpected error occurred. Please try again later.",
    });
  }

  return response.status(500).json({
    name: error.name,
    message: error.message,
    stack: error.stack,
  });
}
