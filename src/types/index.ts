import { Types } from "mongoose";
import { Request } from "express";

export interface IUser {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITodo {
  title: string;
  description?: string;
  completed: boolean;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    email: string;
  };
}