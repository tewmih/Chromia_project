"use client";
import ToDoList from "@/components/ToDoList";
import { GetAlltodos } from "@/lib/api";
import { ITask } from "@/types/todoTypes";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [isFilterOpened, setFilterOpened] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [priority, setPriority] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await GetAlltodos();
        setTasks(fetchedTasks);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };
    fetchTasks();
  }, []);

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      // Filter by priority
      const isPriorityMatch = priority ? task.priority_val === priority : true;

      // Filter by status
      const isStatusMatch = status ? task.status === status : true;

      return isPriorityMatch && isStatusMatch;
    })
    .sort((a, b) => {
      // Sort by the selected criteria
      if (sortBy === "due_date") {
        const dateA = a.due_date ? new Date(a.due_date).getTime() : 0;
        const dateB = b.due_date ? new Date(b.due_date).getTime() : 0;
        return dateA - dateB;
      }
      return 0; // No sorting if sortBy is not selected
    });

  return (
    <div>
      <button onClick={() => setFilterOpened((prev) => !prev)} className="mb-4">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2M6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2z"
            />
          </svg>
        </span>
      </button>
      {isFilterOpened && (
        <div className="flex items-center mb-2">
          <label className="p-2">
            Priority:
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="ml-2 border border-gray-300 rounded"
            >
              <option value="">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>

          <label className="mr-2">
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="ml-2 border border-gray-300 rounded"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </label>

          <label>
            Sort by:
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="ml-2 border border-gray-300 rounded"
            >
              <option value="">None</option>
              <option value="due_date">Due Date</option>
            </select>
          </label>

          <button
            onClick={() => {
              setPriority("");
              setStatus("");
              setSortBy("");
            }}
            className="ml-2 w-20 h-6 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reset
          </button>
        </div>
      )}
      <hr className="bg-slate-800" />
      <ToDoList tasks={filteredTasks} />
    </div>
  );
};

export default Page;
