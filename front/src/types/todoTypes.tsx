// export interface Itask {
//   id: string;
//   name: string;
//   description: string;
//   priority: string;
// }

// Interface for a single task
export interface ITask {
  id: string; // Unique identifier for the task
  title: string; // Title of the task
  description: string; // Description of the task
  priority_val: "high" | "medium" | "low"; // Priority of the task
  status: "pending" | "completed"; // Status of the task
  due_date: string; // Due date in ISO format
  created_at: string; // Timestamp when the task was created
  updated_at?: string; // Optional timestamp for the last update
}


// Interface for the filter criteria
export interface FilterMethod {
  name?: string; // Optional filter by task name
  status?: "pending" | "completed" | ""; // Filter by task status
  dueDate?: string; // Filter by due date (ISO format)
  priority?: "high" | "medium" | "low" | ""; // Filter by priority
}

// Interface for the API response
export interface TaskResponse {
  tasks: ITask[]; // Array of tasks returned by the backend
}