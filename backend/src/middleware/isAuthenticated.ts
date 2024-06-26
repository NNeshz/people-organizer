import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";

// Extend the Request type to include the id property
interface RequestWithId extends Request {
  id?: string;
}

export const isAuthenticated = (
  req: RequestWithId,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!,
    (err: jwt.VerifyErrors | null, decoded: object | undefined) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      const decodedPayload = decoded as JwtPayload; // Cast decoded to JwtPayload
      if (decodedPayload && decodedPayload.id) {
        req.id = decodedPayload.id;
        next();
      } else {
        return res.status(403).json({ message: "Invalid token payload" });
      }
    }
  );
};
