import express from 'express';
import { createTodoController, deleteTodoController, getTodoController, updateTodoController } from '../controllers/todoController.js';
import { authMiddleware } from '../middlewares/authmiddleware.js';

const router = express.Router();

//create todo
router.post("/create", authMiddleware, createTodoController);

//GET TODO
router.post("/getAll/:userId", authMiddleware, getTodoController);

//DELEET TODO
router.delete("/delete/:id", authMiddleware, deleteTodoController);

//UPDATE TODO
router.patch("/update/:id", authMiddleware, updateTodoController);


export default router;