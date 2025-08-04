import jwt from "jsonwebtoken";

export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN ?? "15m";

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ id: userId }, secret, {
    expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
  });
};

export const generateRefreshToken = (userId: string): string => {
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
  const refreshExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN ?? "7d";

  if (!refreshSecret) {
    throw new Error("REFRESH_TOKEN_SECRET is not defined");
  }

  return jwt.sign({ id: userId }, refreshSecret, {
    expiresIn: refreshExpiresIn as jwt.SignOptions["expiresIn"],
  });
};
