import express, {Request, Response} from "express";
import todoRoutes from "./routes/todo.routes"
import userRoutes from "./routes/user.routes"
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);
app.use("/api/user/", userRoutes)

app.get("/api/test", (_req: Request, res: Response) => {
    res.json({ message: "Backend works!" });
});

app.listen(3001, () => {
    console.log("API running on http://localhost:3001");
});