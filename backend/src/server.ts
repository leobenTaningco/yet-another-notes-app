import express, {Request, Response} from "express";
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (_req: Request, res: Response) => {
    res.json({ message: "Backend works!" });
});

app.listen(3001, () => {
    console.log("API running on http://localhost:3001");
});