import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { AuthRequest } from "../types";


export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success : false,
            message: 'Access token is required'
        });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
        return res.status(401).json({
            success : false,
            message : 'Invalid token - user not found'
        });
    }

    req.user = {
        id : user.id,
        username: user.username,
        email: user.email
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError){
        return res.status(401).json({
            success : false,
            message : 'Invalid token'
        });
    }

    res.status(500).json({
        success : false,
        message : 'Server error during authentication'
    });
  }
};
