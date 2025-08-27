import { Router, Request, Response, NextFunction } from "express";
import { loginController } from "./infrastructure/controllers/login.controller";

const router = Router();

router.post(
  "/login",
  (request: Request, response: Response, next: NextFunction) => {
    return loginController.handle(request, response, next);
  },
);

export { router as userRouter };
