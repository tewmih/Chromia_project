"use client";

import React, { useEffect, useState } from "react";
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
  const [priority, setPriority] = useState<"high" | "medium" | "low" | "">("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // await addTodo({
    //   id: uuidv4(),
    //   title,
    //   description,
    //   priority_val: priority || "low",
    //   due_date: dueDate,
    //   status: "pending", // or any default status
    //   created_at: new Date().toISOString(),
    // });
    console.log("the data you entered is: ",title, description, priority,dueDate)
    // Reset form fields after successful submission
    setTitle("");
    setDescription("");
    setPriority("");
    setDueDate("");
    setModalOpen(false); // Close modal after submission
    router.refresh();
  
    // alert("Task added successfully!"); // Show success message after submission
  };
  useEffect(() => {
    console.log("title:", title);
    console.log("description:", description);
    console.log("priority:", priority);
    console.log("dueDate:", dueDate);
  }, [title, description, priority, dueDate]);
  
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 bg-gray-800 p-6 rounded-lg shadow-lg text-white w-full max-w-md"
    >
      <h3 className="font-bold text-lg text-center">Add New Task</h3>

      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-medium mb-1">
          Task Title
        </label>
        <input
          id="name"
          className="h-9 bg-gray-700 w-full px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter task name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          className="h-16 bg-gray-700 w-full px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="priority" className="text-sm font-medium mb-1">
          Priority
        </label>
        <select
          id="priority"
          className="h-9 bg-gray-700 w-full px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "high" | "medium" | "low" | "")
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

      <div className="flex flex-col">
        <label htmlFor="dueDate" className="text-sm font-medium mb-1">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          className="h-9 bg-gray-700 w-full px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-500 transition-transform transform hover:scale-105"
      >
        Submit
      </button>
    </form>
  );
};

export default AddModalContent;
