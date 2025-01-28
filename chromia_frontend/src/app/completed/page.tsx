'use client';

import { useTAppStore } from "@/store/stateStore";
import React, { useState, useEffect } from "react";
import TaskBox from "@/components/TaskBox";

const CompletedTasks = () => {
  const { session, newTaskCheck } = useTAppStore();
  const [allTasks, setAllTasks] = useState([]);
  const [taskCompleted, setTaskCompleted] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!session) return;

        const { tasks, pointer } = await session.query<any>("get_completed_tasks", {
          user_id: session.account.id,
          pointer: 0,
          n_tasks: 100,
        });

        setAllTasks(tasks);
        console.log("Completed tasks:", tasks);
      } catch (err) {
        console.error("Failed to fetch completed tasks", err);
      }
    };

    fetchTasks();
  }, [session, taskCompleted, newTaskCheck]);

  return (
    <div
      className={`min-h-screen pt-10 pl-16 sm:pl-20 md:pl-32 lg:pl-64 px-4 transition-all duration-300 ${
        allTasks.length === 0 ? "bg-red-100" : "bg-gray-100"
      }`}
    >
      <h1 className="text-2xl font-bold text-green-700 mb-4">Completed Tasks ✅</h1>

      {allTasks.length === 0 ? (
        <p className="text-red-600 text-lg text-center font-semibold">
          No completed tasks available 🚨
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {allTasks.map((task) => (
            <TaskBox key={task.id} task={task} setTaskCompleted={setTaskCompleted} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedTasks;
