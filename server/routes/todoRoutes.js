import express from 'express';
import { todoCont } from '../controllers/todoController.js';

const router=express.Router();

router.get('/',todoCont);


export default router;