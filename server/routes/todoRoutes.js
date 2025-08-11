import express from 'express';
import { createTodoController, deleteTodoController, getTodoController, todoCont } from '../controllers/todoController.js';
import { authMiddleware } from '../middlewares/authmiddleware.js';

const router=express.Router();

router.post('/create',authMiddleware,createTodoController);

router.post('/getAll/:userId',authMiddleware,getTodoController);

router.post('/delete/:userId',authMiddleware,deleteTodoController);

export default router;