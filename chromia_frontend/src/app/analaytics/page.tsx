"use client"

import React, { useEffect, useState } from "react";
import { useTAppStore } from "@/store/stateStore";
import TaskChart from "@/components/chart/TaskChart";

const TaskStats = () => {
  const { session,newTaskCheck} = useTAppStore();
  const [taskStats, setTaskStats] = useState({
    completed: 0,
    pending: 0,
    expired: 0,
  });

  useEffect(() => {
    if (!session) return;

    const fetchTaskStats = async () => {
      try {
        const completed = await session.query("number_of_completed_tasks", {
          user_id: session.account.id,
        });
        const pending = await session.query("number_of_pending_tasks", {
          user_id: session.account.id,
        });
        const expired = await session.query("number_of_expired_tasks", {
          user_id: session.account.id,
        });

        setTaskStats({
          completed: Number(completed) || 0,
          pending: Number(pending) || 0,
          expired: Number(expired) || 0,
        });
      } catch (error) {
        console.error("Error fetching task stats:", error);
      }
    };

    fetchTaskStats();
  }, [session,newTaskCheck]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Task Statistics</h2>
      <TaskChart data={taskStats} />
    </div>
  );
};

export default TaskStats;