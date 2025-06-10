// src/common/interfaces/jwt-payload.interface.ts
export interface JwtPayload {
  sub: number;
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}
