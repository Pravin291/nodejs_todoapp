import express from 'express';
import { deleteTask, mytask, newTask, updateTask } from '../controlers/task.js';
import { isAuthenticated } from '../middlewares/authentication.js';

const  router  = express.Router()

router.post('/task/new',isAuthenticated,newTask)

router.get('/task/my',isAuthenticated,mytask)

router.route('/task/:id')
.put(isAuthenticated,updateTask)
.delete(isAuthenticated,deleteTask)

export default router;

