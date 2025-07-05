import { Router } from "express";
import {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo
} from '../controllers/todoController';
import { todoValidation } from "../utils/validation";
import { authenticateToken } from "../middleware/auth";

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