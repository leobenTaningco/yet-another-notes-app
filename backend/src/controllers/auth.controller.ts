import { Request, Response } from "express";
import * as authService from '../services/auth.service'

export async function loginController(req: Request, res: Response){
    try {
        const { username } = req.body;

        if (!username){
            return res.status(400).json({
                message: "Username is required"
            })
        }

        const login = await authService.loginService(username);

        res.status(200).json(login)
    } catch (error) {
        res.status(500).json({
            message: "Can't find user"
        })
    }
}