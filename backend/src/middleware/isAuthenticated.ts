import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface AuthRequest extends Request {
  user_id?: string;
}

export const isAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized token" });
      return;
    }

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
      (err: any, decoded: any) => {
        if (err || typeof decoded === "string") {
          res.status(401).json({ message: "Unauthorized denied" });
          return;
        }
        req.user_id = (decoded as JwtPayload).id;
        next();
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: (error as Error).message });
  }
};
