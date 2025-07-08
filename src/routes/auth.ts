import {Router} from "express";
import {register, login, getProfile} from '../controllers/authController.js'
import { registerValidation, loginValidation } from "../utils/validation.js";
import { validateRequest } from "../middleware/validateResult.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login)
router.get('/profile', authenticateToken, getProfile);

export default router;
