import {Router} from "express";
import {register, login, getProfile} from '../controllers/authController'
import { registerValidation, loginValidation } from "../utils/validation";
import { validateRequest } from "../middleware/validateResult";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login)
router.get('/profile', authenticateToken, getProfile);

export default router;
