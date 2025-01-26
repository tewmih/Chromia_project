"use client";

import { ITask } from "@/types/todoTypes";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { SlRefresh } from "react-icons/sl";
import { Modal } from "./Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface TaskProps {
  task: ITask;
}

function TaskBox({ task }: TaskProps) {
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(
    task.due_date ? new Date(task.due_date) : null
  );
  const [editPriority, setEditPriority] = useState(task.priority_val);

  const [status, setStatus] = useState(task.status);

  const toggleStatus = () => {
    setStatus((prevStatus) =>
      prevStatus === "pending" ? "completed" : "pending"
    );
  };

  const handleEditSubmit = () => {
    setEditModalOpen(false);
    console.log(editDescription + editPriority + editTitle + dueDate);
    setDueDate(null);
    setEditPriority("low");
    setEditDescription("");
    setEditTitle("");
    router.refresh();
  };

  return (
    <div className="group relative bg-white border border-gray-300 rounded-lg shadow-md p-4 w-64">
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
      <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-600 mr-24">status:</span>
        
        <input
          type="checkbox"
          checked={status === "completed"}
          onChange={toggleStatus}
          className="h-4 w-4 cursor-pointer"
        />
        {status === "completed" ? (
          <>
            <IoCheckmarkDoneSharp size={20} className="text-green-600" />
            <span className="text-xs font-semibold text-green-600">
              Completed
            </span>
          </>
        ) : (
          <>
            <SlRefresh size={20} className="text-red-600" />
            <span className="text-xs font-semibold text-red-600">Pending...</span>
          </>
        )}
      </div>

      {/* Due Date */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">Due Date:</span>
        <span className="text-sm text-gray-500">
          {dueDate ? dueDate.toISOString().split("T")[0] : "No due date"}
        </span>
      </div>

      {/* Dropdown for Description */}
      <details className="mb-2">
        <summary className="cursor-pointer text-gray-600 text-sm group-hover:text-gray-800">
          Description
        </summary>
        <p className="text-gray-500 text-sm mt-1">{task.description}</p>
      </details>

      {/* Additional Actions */}
      <div className="absolute bottom-1 right-2 transition-opacity duration-300 flex gap-5">
        <FaRegEdit
          size={17}
          color="blue"
          cursor="pointer"
          onClick={() => setEditModalOpen(true)}
          title="edit task"
        />

        <Modal modalOpen={editModalOpen} setModalOpen={setEditModalOpen}>
          <form
            onSubmit={handleEditSubmit}
            method="dialog"
            className="flex flex-col gap-3 bg-gray-800 p-4 rounded-xl shadow-lg"
          >
            <h3 className="font-bold text-lg text-white text-center mb-2">
              Edit Task
            </h3>
            {/* Title Input */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm text-white mb-1">
                Title
              </label>
              <input
                className="h-9 bg-gray-700 text-white px-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>

            {/* Description Input */}
            <div className="flex flex-col">
              <label htmlFor="description" className="text-sm text-white mb-1">
                Description
              </label>
              <textarea
                className="h-20 bg-gray-700 text-white px-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Priority Dropdown */}
            <div className="flex flex-col">
              <label htmlFor="priority" className="text-sm text-white mb-1">
                Priority
              </label>
              <select
                className="h-9 bg-gray-700 text-white px-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                value={editPriority}
                onChange={(e) =>
                  setEditPriority(e.target.value as "high" | "medium" | "low")
                }
              >
                <option value="" disabled>
                  Select priority
                </option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Due Date Input */}
            <div className="flex flex-col">
              <label htmlFor="due_date" className="text-sm text-white mb-1">
                Due Date
              </label>
              <input
                type="date"
                className="h-9 bg-gray-700 text-white px-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
                onChange={(e) => {
                  const selectedDate = e.target.value
                    ? new Date(e.target.value)
                    : null;
                  setDueDate(selectedDate);
                }}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-3">
              <button
                type="button"
                className="px-4 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
        <Modal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen}>
          <div className="flex flex-col gap-6 bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <h3 className="font-bold text-xl text-white">Confirm Delete</h3>
            <p className="text-gray-300">
              Are you sure you want to delete this task?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={() => {
                  console.log(task.id + editDescription);
                  setDeleteModalOpen(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>

        <FaRegTrashAlt
          size={17}
          color="red"
          cursor="pointer"
          onClick={() => setDeleteModalOpen(true)}
          title="delete task"
        />
      </div>
    </div>
  );
}

export default TaskBox;
