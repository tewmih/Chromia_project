"use client";

import React, {   useState } from "react";
import { useRouter } from "next/navigation";
import { useTAppStore } from "@/store/stateStore";
import { toast } from "react-toastify";
import Spinner from "./Progress_spinner";

interface AddModalContentProps {
  setModalOpen: (open: boolean) => void;
}

const AddModalContent: React.FC<AddModalContentProps> = ({ setModalOpen }) => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<"high" | "medium" | "low" | "">(
    "medium"
  );
  const [dueDate, setDueDate] = useState(new Date().getTime());

  const [isLoading, setIsLoading] = useState(false);
  const { session, setNewTaskCheck, newTaskCheck } = useTAppStore();
  if (!session) {
    toast.success("you haven't registered(loged in) yet");
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session) return;
    try {
      if (
        title.trim() !== "" ||
        description.trim() !== "" ||
        priority.trim() !== "" ||
        dueDate !== undefined
      ) {
        setIsLoading(true);
        await session.call({
          name: "create_task",
          args: [
            title,
            description,
            priority === "high" ? 0 : priority === "medium" ? 1 : 2,
            new Date(dueDate).getTime(),
          ],
        });
      }
      router.push("/home");
      setIsLoading(false);
      setModalOpen(false);
      toast.success("Task created successfully");
    } catch (e) {
      toast.error("Error creating task  "+e);
    }
    setTitle("");
    setDescription("");
    setPriority("");
    setDueDate(new Date().getTime());
    setModalOpen(false);
    setNewTaskCheck(!newTaskCheck);
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="flex flex-col h-96 gap-3 bg-gray-800 p-6 rounded-lg shadow-lg text-white w-full max-w-md"
>
  <h3 className="font-bold text-lg text-center">Add New Task</h3>

  {isLoading && (
    <Spinner message="creating task..."/>
  )}

  {!isLoading && (
    <>
      <div className="flex flex-col z-50">
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
          <option value="medium">Medium</option>
          <option value="high">High</option>
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
          value={new Date(dueDate).toISOString().split("T")[0]}
          onChange={(e) => setDueDate(new Date(e.target.value).getTime())}
        />
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-500 transition-transform transform hover:scale-105"
      >
        Submit
      </button>
    </>
  )}
</form>

  );
};

export default AddModalContent;
