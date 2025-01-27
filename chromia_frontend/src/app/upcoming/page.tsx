'use client';

import { useTAppStore } from "@/store/stateStore";
import React, { useState, useEffect } from "react";
import TaskBox from "@/components/TaskBox";

const UpcomingTasks = () => {
  const { session } = useTAppStore();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!session) return;

        const { tasks } = await session.query<any>("get_upcoming_tasks", {
          pointer: 0,
          n_tasks: 100,
        });

        setTasks(tasks);
        console.log("Upcoming tasks:", tasks);
      } catch (err) {
        console.error("Failed to fetch upcoming tasks", err);
      }
    };

    fetchTasks();
  }, [session]);

  return (
    <div className="bg-gray-100 min-h-screen pt-16 pl-16 sm:pl-20 md:pl-32 lg:pl-64 px-4 ">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Tasks</h1>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No upcoming tasks 🎉</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {tasks.map((task) => (
            <TaskBox key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingTasks;
