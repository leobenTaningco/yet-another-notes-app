import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware"
import { createTodoController, 
    getAllTodoController, 
    getTodoByIdController,
    deleteTodoByIdController,
    updateTodoController,
} from "../controllers/todo.controller"

const router = Router();

router.use(requireAuth);

router.post("/", createTodoController);
router.get("/", getAllTodoController);
router.get("/:todoId", getTodoByIdController)
router.delete("/:todoId", deleteTodoByIdController)
router.patch("/:todoId", updateTodoController)

export default router;
