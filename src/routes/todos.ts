import { Router } from "express";
import {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo
} from '../controllers/todoController.js';
import { todoValidation } from "../utils/validation.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();
//All todo routes require authentication
router.use(authenticateToken);

router.get('/', getTodos);
router.get('/:id', getTodo);
router.post('/', todoValidation, createTodo);
router.put('/:id', todoValidation, updateTodo);
router.patch('/:id/toggle', toggleTodo);
router.delete('/:id', deleteTodo);

export default router;