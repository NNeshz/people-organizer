import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createAccesToken = ({ id, username, email }: { id: string, username: string, email: string }) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id, username, email },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
