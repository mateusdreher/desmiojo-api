import { Request, Response, NextFunction } from "express";
import { IAuthProvider } from "../../../../users/application/interfaces/auth.provider.interface";
import { InvalidTokenError } from "../../../../users/infrastructure/providers/auth.provider";

export const authMiddleware =
  (authProvider: IAuthProvider) =>
  async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.replace("Bearer", "").trim();

    try {
      const payload = authProvider.verifyToken(token);

      request.user = { userId: payload.userId };

      return next();
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        return response.status(401).json({ message: "Token invalid" });
      }
      return response.status(500).json({ message: "Internal Server Error" });
    }
  };
