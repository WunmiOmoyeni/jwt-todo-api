import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import User from "../models/User";

// const generateToken = (userId: string): string => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
//     expiresIn: process.env.JWT_EXPIRES_IN || '7d'
//   });
// };