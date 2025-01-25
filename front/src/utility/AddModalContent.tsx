"use client";

import React, { useState } from "react";
import { addTodo } from "@/lib/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

interface AddModalContentProps {
  setModalOpen: (open: boolean) => void;
}

const AddModalContent: React.FC<AddModalContentProps> = ({ setModalOpen }) => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [dueDate, setDueDate] = useState("");
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addTodo({
      id: uuidv4(),
      title: title,
      description,
      priority_val: priority,
    });

    setPriority("");
    setTitle("");
    setDescription("");
    setModalOpen(false); // Close modal after submission
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 bg-gray-800 p-8 rounded-lg shadow-lg text-white w-full max-w-md"
    >
      <h3 className="font-bold text-2xl text-center">Add New Task</h3>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-semibold">
          Task Title
        </label>
        <input
          id="name"
          className="h-10 bg-gray-700 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter task name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm font-semibold">
          Description
        </label>
        <textarea
          id="description"
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
          id="priority"
          className="h-10 bg-gray-700 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="" disabled>
            Select priority
          </option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="dueDate" className="text-sm font-semibold">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          className="h-10 bg-gray-700 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-500 transition-transform transform hover:scale-105"
      >
        Submit
      </button>
    </form>
  );
};

export default AddModalContent;
