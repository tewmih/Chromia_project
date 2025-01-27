"use client";
import React, { useEffect, useState } from "react";
import { ITask } from "@/types/todoTypes";
import TaskBax from "./TaskBox";
import { useTAppStore } from "@/store/stateStore";

const ToDoList = () => {
  const [isFilterOpened, setFilterOpened] = useState(false);
  const { session, newTaskCheck } = useTAppStore();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [priority, setPriority] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [taskCompleted, setTaskCompleted] = useState(false);
  useEffect(() => {
    const fetchAlllTasks = async () => {
      try {
        if (!session) {
          return;
        }
        const { tasks, pointer } = await session?.query<any>("get_all_tasks", {
          user_id: session.account.id,
          pointer: 0,
          task_number: 100,
        });
        setTasks(tasks);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };
    fetchAlllTasks();
  }, [session, taskCompleted, newTaskCheck]);

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
    <div className="bg-[#e5e9e4] p-4  pl-40 pr-10 w-full h-full">
      <h1 className="text-3xl font-bold text-green-500 text-center  tracking-wide">
        Your To-Do List
      </h1>

      <button
        title="filter tasks"
        onClick={() => setFilterOpened((prev) => !prev)}
        className="mb-2 sticky top-0 text-gray-600 bg-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
        >
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
          <label className=" text-gray-900  bg-slate-100 mr-2">
            Priority:
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="ml-2 border border-gray-300  text-white rounded"
            >
              <option value="">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>

          <label className="mr-2 text-gray-900  bg-slate-100">
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="ml-2 border  border-gray-300 text-white rounded"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </label>

          <label className="mr-2 text-gray-900 bg-slate-100">
            Sort by:
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="ml-2 border border-gray-300 rounded text-white"
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
            className="ml-2 w-20 h-6 bg-blue-400 text-white rounded hover:bg-blue-600"
          >
            Reset
          </button>
        </div>
      )}
      <hr className="bg-slate-800" />
      <div className="pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskBax
              key={task.id}
              task={task}
              setTaskCompleted={setTaskCompleted}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
