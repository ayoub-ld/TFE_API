import jwt from "jsonwebtoken";

export type TokenData = {
  id_user: string;
  google_id: string;
  email: string;
  username: string;
};

export function generateToken({
  id_user,
  google_id,
  email,
  username,
}: TokenData): Promise<string> {
  return new Promise((resolve, reject) => {
    // token data
    const data = { id_user, google_id, email, username };

    // secret key
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
      reject(
        new Error("JWT_SECRET_KEY is not defined in environment variables")
      );
      return;
    }

    // token options
    const options: jwt.SignOptions = {
      algorithm: "HS512",
      expiresIn: "10h",
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    };

    // sign the token
    jwt.sign(data, secret, options, (err, token) => {
      if (err || !token) {
        reject(err ?? new Error("Token generation failed"));
        return;
      }
      resolve(token);
    });
  });
}

export function decodeJWT(token: string): Promise<TokenData> {
  return new Promise((resolve, reject) => {
    // secret key
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
      reject(
        new Error("JWT_SECRET_KEY is not defined in environment variables")
      );
      return;
    }

    // token options
    const options = {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    };

    // verify the token
    jwt.verify(token, secret, options, (err, data) => {
      if (err || !data) {
        reject(err ?? new Error("Token verification failed"));
        return;
      }
      resolve(data as TokenData);
    });
  });
}
