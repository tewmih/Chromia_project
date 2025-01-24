import React from "react";
import { ITask } from "../types/todoTypes";
import { Task } from "./Tasks";

interface taskInterface {
  tasks: ITask[];
}
const ToDoList: React.FC<taskInterface> = ({ tasks }) => {
  return (
    <div>
      <div className="overflow-x-auto m-8 w-full">
        <table className="table ">
        {/* <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 bg-gray-950 text-lg font-bold">
              Heading 1
            </th>
            <th className="border border-gray-300 px-4 py-2  bg-gray-950 text-lg font-bold">
              Heading 2
            </th>
          </tr>
        </thead> */}
          <tbody>
            
            {/* row 1 */}
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
              
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToDoList;
