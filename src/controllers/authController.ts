import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import User from "../models/User";
import { AuthRequest } from "../types";
import mongoose from "mongoose";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {

    const { username, email, password } = req.body;

    //Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const field = existingUser.email === email ? "email" : "username";
      res.status(400).json({
        success: false,
        message: `User with this ${field} already exists`,
      });
    }

    //Create new user
    const user = new User({ username, email, password });
    await user.save();

    // Generate token
    const token = generateToken(
      (user._id as mongoose.Types.ObjectId).toString()
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // Generate token
    const token = generateToken(
      (user._id as mongoose.Types.ObjectId).toString()
    );

    res.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};


export const getProfile = async(req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user?.id).select('-password');

        res.json({
            success: true,
            data: {
                user: {
                    id: user!._id,
                    username: user!.username,
                    email: user!.email,
                    createdAt: user!.createdAt,
                    updatedAt: user!.updatedAt
                }
            }
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}
