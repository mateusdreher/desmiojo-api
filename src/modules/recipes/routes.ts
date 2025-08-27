import { Router, Request, Response, NextFunction } from "express";
import { createRecipeController } from "./infrastructure/controllers/create-recipe.controller";
import { listByAuthorRecipeController } from "./infrastructure/controllers/list-by-author.controller";
import { deleteRecipeController } from "./infrastructure/controllers/delete-recipe.controller";
import { publishRecipeController } from "./infrastructure/controllers/publish-recipe.controller";

const router = Router();

router.post("/", (request: Request, response: Response, next: NextFunction) => {
  return createRecipeController.handle(request, response, next);
});

router.get(
  "/author",
  (request: Request, response: Response, next: NextFunction) => {
    return listByAuthorRecipeController.handle(request, response, next);
  },
);

router.delete(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    return deleteRecipeController.handle(request, response, next);
  },
);

router.post(
  "/publish",
  (request: Request, response: Response, next: NextFunction) => {
    return publishRecipeController.handle(request, response, next);
  },
);

export { router as recipeRouter };
