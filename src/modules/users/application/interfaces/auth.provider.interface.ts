export interface IAuthProvider {
  generateToken(id: string): Promise<string>;
}
