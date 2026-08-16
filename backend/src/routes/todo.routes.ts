import { Router } from "express";
import { createTodoController, 
    getAllTodoController, 
    getTodoByIdController,
    deleteTodoByIdController,
} from "../controllers/todo.controller"

const router = Router();

router.post("/", createTodoController);
router.get("/", getAllTodoController);
router.get("/:id", getTodoByIdController)
router.delete("/:id", deleteTodoByIdController)


export default router;
