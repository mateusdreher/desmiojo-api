import { Request, Response, NextFunction } from "express";
import { InvalidPasswordError } from "../../../../users/domain/vo/password.vo";
import { InvalidCredentialsError } from "../../../../users/application/use-cases/login.use-case";
import {
  ForbiddenAccessError,
  RecipeNotFoundError,
} from "../../../../recipes/application/errors/recipe.errors";
import { AlreadyExistsUserWithLoginError } from "../../../../users/application/use-cases/create.use-case";
import {
  CannotPublishWithNoIngredientsError,
  RecipeAlreadyPublishedError,
} from "../../../../recipes/domain";

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction, // O 'next' é necessário, mesmo que não seja usado, para a assinatura correta.
) {
  console.error(`[ErrorHandler] ${error.name}: ${error.message}`);
  console.error(error.stack);

  if (
    error instanceof InvalidPasswordError ||
    error instanceof CannotPublishWithNoIngredientsError
  ) {
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

  if (error instanceof RecipeNotFoundError) {
    return response.status(404).json({
      name: error.name,
      message: error.message,
    });
  }

  if (error instanceof ForbiddenAccessError) {
    return response.status(403).json({
      name: error.name,
      message: error.message,
    });
  }

  if (
    error instanceof AlreadyExistsUserWithLoginError ||
    error instanceof RecipeAlreadyPublishedError
  ) {
    return response.status(409).json({
      name: error.name,
      message: error.message,
    });
  }

  return response.status(500).json({
    name: error.name,
    message: error.message,
    stack: error.stack,
  });
}
