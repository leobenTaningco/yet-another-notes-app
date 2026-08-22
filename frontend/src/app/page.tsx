// import { redirect } from "next/navigation";

// export default function Home() {
//   redirect("/dashboard");
// }

"use client";

import { useState } from "react";
import Login from "./components/Login";
import Todo from "./components/Todo";
import type { User } from "./types/user.types"

export default function Home() {
    const [user, setUser] = useState<User | null>(null);

    if (!user) {
        return <Login onLogin={setUser} />;
    }

    return <Todo user={user} />;
}