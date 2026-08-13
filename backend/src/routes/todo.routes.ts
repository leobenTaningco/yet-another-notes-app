import { Router } from "express";
import { createTodoController } from "../controllers/todo.controller.ts"

const router = Router();

router.post("/", createTodoController);

export default router;
