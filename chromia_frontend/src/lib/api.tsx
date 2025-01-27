import { ITask } from "../types/todoTypes";

const url = "http://localhost:3001/tasks";

// Fetch all todos
export const GetAlltodos = async (): Promise<ITask[]> => {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Error fetching todos: ${res.statusText}`);
    }
    const data: ITask[] = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    throw error; // Re-throw to handle it in the calling code
  }
};

// Add a new todo
export const addTodo = async (todo: ITask): Promise<ITask> => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!res.ok) {
      throw new Error(`Error adding todo: ${res.statusText}`);
    }

    const data: ITask = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to add todo:", error);
    throw error;
  }
};
