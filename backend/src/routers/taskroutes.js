import express from "express";
import { createTask, getTasks, updateTask } from "../controllers/taskController.js";
import { verifytoken } from "../middleware/authmiddleware.js";
const router = express.Router();
router.use(verifytoken);
router.post("/createtask", createTask);
router.put('/updatetask',updateTask)

router.get('/getTasks',getTasks)
export default router;
