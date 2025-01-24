"use client";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Modal } from "./Modal";
import { addTodo } from "@/lib/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [priority, setPriorty] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add task to the list
    await addTodo({
      id: uuidv4(),
      title: name,
      description: description,
      priority_val: priority,
    });

    setPriorty("");
    setName("");
    setDescription("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <button
        className="btn btn-primary flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-purple-600 hover:to-blue-500 transition-transform transform hover:scale-105"
        onClick={() => setModalOpen(true)}
      >
        Add Task <FaPlus size={20} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form
          onSubmit={handleSubmit}
          method="dialog"
          className="flex flex-col gap-6 bg-gray-800 p-8 rounded-lg shadow-lg text-white w-full max-w-md"
        >
          <h3 className="font-bold text-2xl text-center">Add New Task</h3>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold">
              Task Name
            </label>
            <input
              className="h-10 bg-gray-700 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter task name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-semibold">
              Description
            </label>
            <textarea
              className="h-20 bg-gray-700 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="priority" className="text-sm font-semibold">
              Priority
            </label>
            <select
              className="h-10 bg-gray-700 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="priority"
              value={priority}
              onChange={(e) => setPriorty(e.target.value)}
            >
              <option value="" disabled>
                Select priority
              </option>
              <option value="high" className="p-2">
                High
              </option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-teal-600 hover:to-green-500 transition-transform transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
