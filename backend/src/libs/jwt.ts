import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createAccesToken = (payload: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "30m",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
