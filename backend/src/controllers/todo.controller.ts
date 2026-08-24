import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware"
import * as todoService from "../services/todo.service";

export async function createTodoController(req: AuthenticatedRequest, res: Response) {
    try {
        const userId = req.user!.id

        const { title, bodyNote } = req.body;

        if(!title || !bodyNote){
            return res.status(400).json({
                message: "Server could not understand the request"
            })
        }

        const todo = await todoService.createTodoService(
            title,
            bodyNote,
            userId,
        );

        res.status(201).json(todo);
    } catch (error) {
        console.error("tite todo error", error)
        res.status(500).json({
            message: "Failed to create todo"
        });
    }
}

export async function getAllTodoController(req: AuthenticatedRequest, res: Response) {
    try {
        const userId = req.user!.id
        const todos = await todoService.getAllTodoService(userId)
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get todos"
        })
    }
}

export async function getTodoByIdController(req: AuthenticatedRequest, res: Response){
    try {
        const todoId = Number(req.params.todoId);
        const userId = req.user!.id
        const todos = await todoService.getTodoByIdService(userId,todoId);
        
        if(!todos){
            return res.status(404).json({
                message: "Todo not found"
            })
        }
        
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({
            message: "Failed to get todo"
        })
    }
}

export async function deleteTodoByIdController(req: AuthenticatedRequest, res: Response) {
    try {
        const userId = req.user!.id;
        const todoId = Number(req.params.todoId);
        const todos = await todoService.deleteTodoByIdService(userId,todoId);

        if(!todos){
            return res.status(404).json({
                message: "Todo not found"
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete todo"
        })
    }
}

export async function updateTodoController(req: AuthenticatedRequest, res: Response) {
    try {
        const userId = req.user!.id;
        const todoId = Number(req.params.todoId)

        if(!todoId){
            return res.status(400).json({
                message: "Invalid todo ID"
            })
        }

        const data = req.body 

        if(!data){
            return res.status(400).json({
                message: "Todo data not valid"
            })
        }
        const update = await todoService.updateTodoService(userId, todoId, data)

        if(!update){
            return res.status(500).json({
                message: "Updates not saved"
            })
        }

        res.status(200).json({
            message: "Updated Todo"
        })
    } catch (error) {
        res.status(500).json({
            message: "Could not update todo"
        })
    }
}
