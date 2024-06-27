import { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt";

interface CustomRequest extends Request {
  user_id?: string;
}

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const token = await createAccesToken({ id: user.id });

    res.cookie("token", token, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: "none",
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = await createAccesToken({ id: user.id });

    res.cookie("token", token, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: "none",
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const profile = async (req: CustomRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user_id,
    },
  });

  res.json(user);
};
