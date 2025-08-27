export interface IAuthProvider {
  generateToken(payload: AuthTokenPayload): string;
  verifyToken(token: string): AuthTokenPayload;
}

export type AuthTokenPayload = {
  userId: string;
};
