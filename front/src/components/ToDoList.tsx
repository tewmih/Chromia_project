import React from "react";
import { ITask } from "@/types/todoTypes";
import TaskBax from "./TaskBox";

interface TaskInterface {
  tasks: ITask[];
}

const ToDoList: React.FC<TaskInterface> = ({ tasks }) => {
  return (
    <div className="pt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tasks.map((task) => (
          <TaskBax key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
