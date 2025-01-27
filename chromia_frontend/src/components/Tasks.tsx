"use client";

import { ITask } from "@/types/todoTypes";
import { Modal } from "./Modal";
import { useState } from "react";
import TaskBax from "./TaskBox";

interface taskprops {
  task: ITask;
}

export const Task: React.FC<taskprops> = ({ task }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(task.title);
  const [editDescription, setEditDescription] = useState<string>(
    task.description
  );
  const [editPriority, setEditPriority] = useState<string>(task.priority_val);

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditModalOpen(false);
  };

  return (
    <tr key={task.id}>
      <td className="flex flex-row gap-4">
        <TaskBax task={task} setTaskCompleted={setTaskCompleted} />
        <Modal modalOpen={editModalOpen} setModalOpen={setEditModalOpen}>
          <form
            onSubmit={handleEditSubmit}
            method="dialog"
            className="flex flex-col gap-5 bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="font-bold text-xl text-white text-center mb-4">
              Edit Task
            </h3>
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="text-white">
                Task Name
              </label>
              <input
                className="h-10 bg-gray-700 text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="description" className="text-white">
                Description
              </label>
              <textarea
                className="h-24 bg-gray-700 text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="priority" className="text-white">
                Priority
              </label>
              <select
                className="h-10 bg-gray-700 text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
              >
                <option value="" disabled>
                  Select priority
                </option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
                  setDeleteModalOpen(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </td>
    </tr>
  );
};
