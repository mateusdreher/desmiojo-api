export class RecipeNotFoundError extends Error {
  constructor(id: string) {
    super(`Recipe with id "${id}" was not found.`);
    this.name = "RecipeNotFoundError";
  }
}

export class ForbiddenAccessError extends Error {
  constructor(message: string = "User is not allowed to perform this action.") {
    super(message);
    this.name = "ForbiddenAccessError";
  }
}
