import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createAccesToken = ({ id }: { id: string }) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
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
