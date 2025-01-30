

// Interface for a single task
export interface ITask {
  id: string; // Unique identifier for the task
  title: string; // Title of the task
  description: string; // Description of the task
  priority_val: "high" | "medium" | "low"; // Priority of the task
  status: "pending" | "completed"|"expired"; // Status of the task
  due_date: string; // Due date in ISO format// Optional timestamp for the last update
}



// Interface for the API response
export interface TaskResponse {
  tasks: ITask[]; // Array of tasks returned by the backend
}

// Account Interface
export interface IUserDto {
  name: string;
  id: Buffer; // Assuming the backend returns a Buffer for byte_array
  account: {
    id: Buffer; // Assuming the backend returns a Buffer for byte_array
    type: string;
  };
}