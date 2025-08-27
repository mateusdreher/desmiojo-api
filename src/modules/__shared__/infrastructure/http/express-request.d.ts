import { AuthTokenPayload } from "../../../users/application/interfaces/auth.provider.interface";

declare global {
  namespace Express {
    interface Request {
      user?: AuthTokenPayload;
    }
  }
}
