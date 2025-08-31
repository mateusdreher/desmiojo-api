import { Router, Request, Response, NextFunction } from "express";
import { createRecipeController } from "./infrastructure/controllers/create-recipe.controller";
import { listByAuthorRecipeController } from "./infrastructure/controllers/list-by-author.controller";
import { deleteRecipeController } from "./infrastructure/controllers/delete-recipe.controller";
import { publishRecipeController } from "./infrastructure/controllers/publish-recipe.controller";
import { authMiddleware } from "../__shared__/infrastructure/http/middlewares/auth.middleware";
import { JwtProvider } from "../users/infrastructure/providers/jwt.provider";
import { updateRecipeController } from "./infrastructure/controllers/update-recipe-controller";
import { downloadRecipeController } from "./infrastructure/controllers/download-recipe.controller";

const router = Router();
const ensureAuthenticated = authMiddleware(new JwtProvider());
router.post(
  "/",
  ensureAuthenticated,
  (request: Request, response: Response, next: NextFunction) => {
    return createRecipeController.handle(request, response, next);
  },
);

router.patch(
  "/",
  ensureAuthenticated,
  (request: Request, response: Response, next: NextFunction) => {
    return updateRecipeController.handle(request, response, next);
  },
);

router.get(
  "/author",
  ensureAuthenticated,
  (request: Request, response: Response, next: NextFunction) => {
    return listByAuthorRecipeController.handle(request, response, next);
  },
);

router.delete(
  "/",
  ensureAuthenticated,
  (request: Request, response: Response, next: NextFunction) => {
    return deleteRecipeController.handle(request, response, next);
  },
);

router.post(
  "/publish",
  ensureAuthenticated,
  (request: Request, response: Response, next: NextFunction) => {
    return publishRecipeController.handle(request, response, next);
  },
);

router.get(
  "/:recipeId/download",
  ensureAuthenticated,
  (request: Request, response: Response, next: NextFunction) => {
    return downloadRecipeController.handle(request, response, next);
  },
);

export { router as recipeRouter };
