import * as jwt from "jsonwebtoken";

import {
  AuthTokenPayload,
  IAuthProvider,
} from "../../application/interfaces/auth.provider.interface";

export class InvalidTokenError extends Error {
  constructor(message: string = "JWT token is invalid or expired.") {
    super(message);
    this.name = "InvalidTokenError";
  }
}

export class AuthProvider implements IAuthProvider {
  private readonly JWT_SECRET =
    process.env.JWT_SECRET || "your-super-secret-key";
  private readonly JWT_EXPIRES_IN = "1h";

  generateToken(payload: AuthTokenPayload): string {
    return jwt.sign(payload, this.JWT_SECRET, {
      subject: payload.userId,
      expiresIn: this.JWT_EXPIRES_IN,
    });
  }

  verifyToken(token: string): AuthTokenPayload {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);

      if (typeof decoded === "string" || !decoded.userId) {
        throw new Error();
      }

      return {
        userId: decoded.userId,
      };
    } catch (error) {
      throw new InvalidTokenError();
    }
  }
}
