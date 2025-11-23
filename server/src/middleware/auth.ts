import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthedRequest extends Request {
  userId?: string;
}

export const requireAuth = (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const token = (req as any).cookies?.token as string | undefined;
    if (!token) return res.status(401).json({ message: "Unauthenticated" });
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.userId = payload.sub as string;
    next();
  } catch {
    return res.status(401).json({ message: "Unauthenticated" });
  }
};

