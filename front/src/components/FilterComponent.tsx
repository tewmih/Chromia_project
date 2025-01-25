"use client";

import React, { useState, useEffect } from "react";
import { TaskResponse, ITask } from "@/types/todoTypes";

interface TaskInterface {
  tasks: ITask[];
}

const TaskFilter: React.FC<TaskInterface> = ({ tasks }) => {
  const [taskSet, setTaskSet] = useState([...tasks]); // Holds tasks from the backend
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]); // Holds filtered results
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // Filter states
  const [priority, setPriority] = useState(""); // "high", "medium", "low", or ""
  const [status, setStatus] = useState(""); // "pending", "completed", or ""
  const [sortBy, setSortBy] = useState(""); // "due_date" or ""

  // Fetch tasks from backend
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/tasks") // Replace with your backend API endpoint
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch tasks");
        return response.json();
      })
      .then((data: TaskResponse) => {
        setTaskSet(data.tasks || []); // Ensure tasks is always an array
        setFilteredTasks(data.tasks || []); // Ensure tasks is always an array
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Filter and sort tasks
  useEffect(() => {
    if (!taskSet) {
      console.log("No tasks found");
      return;
    }

    let result = [...taskSet];

    // Apply priority filter
    if (priority) {
      result = result.filter((task) => task.priority_val === priority);
    }

    // Apply status filter
    if (status) {
      result = result.filter((task) => task.status === status);
    }

    // Apply sorting
    if (sortBy === "due_date") {
      result.sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
    }

    setFilteredTasks(result);
  }, [priority, status, sortBy, taskSet]);

  return (
    <div className="p-6 font-sans">
      <h2 className="text-2xl font-bold mb-4 absolute top-16 z-10">Filter</h2>

      {/* Loading/Error State */}
      {loading && <p>Loading tasks...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Filters */}
      {!loading && !error && (
        <>
          <div className="flex items-center mb-2" >
            <label className="mr-3">
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

            <label className="mr-3">
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
              className="ml-3 w-20 h-6 top-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reset
            </button>
          </div>
          <hr  className="bg-slate-800"/>

          {/* Task List */}
          <div>
            {filteredTasks && filteredTasks.length > 0 ? (
              <ul className="list-none p-0">
                {filteredTasks.map((task) => (
                  <li
                    key={task.id}
                    className="border border-gray-300 rounded-lg p-4 mb-4"
                  >
                    <h3 className="text-xl font-semibold">{task.title}</h3>
                    <p>
                      <strong>Description:</strong> {task.description}
                    </p>
                    <p>
                      <strong>Priority:</strong> {task.priority_val}
                    </p>
                    <p>
                      <strong>Status:</strong> {task.status}
                    </p>
                    <p>
                      <strong>Due Date:</strong> {new Date(task.due_date).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tasks found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskFilter;
