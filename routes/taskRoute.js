 
import express from "express"
const router = express.Router()
import {getTask,setTask,updateTask,deleteTask} from "../controllers/taskController.js"
import protect from "../middleware/authMiddleware.js"

router.get('/',protect,getTask)
router.post('/',protect,setTask)
router.put('/:id',protect,updateTask)
router.delete('/:id',protect,deleteTask)

export default router;