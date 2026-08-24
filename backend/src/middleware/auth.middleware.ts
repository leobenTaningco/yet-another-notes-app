import { Request, Response, NextFunction } from "express";
import { supabase } from "../../lib/supabase";
import { ensureUserService } from "../services/auth.service";

export interface AuthenticatedRequest extends Request{
    user?:{
        id: string;
    }
}

export async function requireAuth(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader?.startsWith("Bearer ")){
            return res.status(401).json({
                message: "Missing authorization token"
            })
        }

        const token = authHeader.substring(7) // Extract after "Bearer"

        const { data, error } = await supabase.auth.getUser(token)

        if (error || !data.user){
            return res.status(401).json({
                message: "Invalid or expired token"
            })
        }

        req.user={
            id: data.user.id
        };

        await ensureUserService(req.user.id);

        next();

    } catch (error) {
        console.error("AUTH ERROR: ", error);

        return res.status(401).json({
            message: "Authentication Failed"
        });
    }
}