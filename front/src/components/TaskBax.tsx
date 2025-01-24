import { ITask } from "@/types/todoTypes";
import React, { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { SlRefresh } from "react-icons/sl";
interface taskprops {
  task: ITask;
  setEditModalOpen: (value: boolean) => void;
  setDeleteModalOpen: (value: boolean) => void;
}
function TaskBax({ task, setEditModalOpen, setDeleteModalOpen }: taskprops) {
  const [status_controller, setStatusController] = useState(task.status);
  return (
    <div className="group relative bg-white border border-gray-300 rounded-lg shadow-md p-4 w-64 ">
      {/* Task Title */}
      <div className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600">
        {task.title}
      </div>

      {/* Priority */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">Priority:</span>
        <span className="text-sm font-semibold text-red-500">
          {task.priority_val}
        </span>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">Status:</span>
        <div className="flex space-x-2">
          {task.status === "pending" ? (
            <label className="flex items-center text-sm text-gray-600 hover-pointer">
              <input type="radio" color="orange" name="status" size={30} />
              Pending...
              <SlRefresh size={20} color="orange" />
            </label>
          ) : (
            <label className="flex items-center text-sm text-gray-600 pointer">
              <input type="radio" color="green" name="status" size={40} />
              Completed
              <IoCheckmarkDoneSharp size={20} color="green" />
            </label>
          )}
        </div>
      </div>

      {/* Due Date */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">Due Date:</span>
        <span className="text-sm text-gray-500">2025-02-01</span>
      </div>

      {/* Dropdown for Description */}
      <details className="mb-2">
        <summary className="cursor-pointer text-gray-600 text-sm group-hover:text-gray-800">
          Description
        </summary>
        <p className="text-gray-500 text-sm mt-1">{task.description}</p>
      </details>

      {/* Additional Actions */}
      <div className="absolute bottom-1 right-2   transition-opacity duration-300 flex gap-5">
        <FaRegEdit
          size={17}
          color="blue"
          cursor="pointer"
          onClick={() => {
            setEditModalOpen(true);
            setDeleteModalOpen(false);
          }}
          title="edit task"
        />
        <FaRegTrashAlt
          size={17}
          color="red"
          cursor="pointer"
          onClick={() => {
            setDeleteModalOpen(true);
            setEditModalOpen(false);
          }}
          title="delete task"
        />
      </div>
    </div>
  );
}

export default TaskBax;
