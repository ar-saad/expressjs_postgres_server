import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authToken = req.headers.authorization;
      if (!authToken) {
        return res.status(500).json({
          success: false,
          message: "You are not allowed to perform this action",
        });
      }

      const decoded = jwt.verify(
        authToken,
        config.jwtSecret as string
      ) as JwtPayload;
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(500).json({
          success: false,
          message: "You are not allowed to perform this action",
        });
      }

      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "There is an error",
      });
    }
  };
};

export default auth;
