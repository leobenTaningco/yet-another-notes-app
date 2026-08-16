// TEMPORARY, NO DB YET
import { Todo } from "../types/todo.types.ts";

export const todos: Todo[] = [
    {
        id: 1,
        title: "Learn Express",
        bodyNote: "Learn controllers",
        completed: true
    },
    {
        id: 2,
        title: "Build Todo API",
        bodyNote: "Finish CRUD",
        completed: false
    }
];