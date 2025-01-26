// 'use client';

// import { useTAppStore } from "@/store/stateStore";
// import { useEffect } from "react";

// import React, { useState, useEffect } from 'react';
// import TaskItem from '@/components/TaskItemComponent';
// import { GetAlltodos } from '@/lib/api';

// const UpcomingTasks = () => {
//     const tasks = GetAlltodos();
// const { session } = useTAppStore();
//   const [tasks, setTasks] = useState([]);

// useEffect(() => {
//   const fetchTasks = async () => {
//     const allTasks = await session.query("get_all_tasks",{args});
//     const upcomingTasks = allTasks.filter(task => {
//       const dueDate = new Date(task.dueDate);
//       const today = new Date();
//       const oneWeekLater = new Date();
//       oneWeekLater.setDate(today.getDate() + 7);
//       return (task) => new Date().getTime() < new Date(task.dueDate).getTime()
//     });
//     setTasks(upcomingTasks);
//   };
//   fetchTasks();
// }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-white mb-4">Upcoming Tasks</h1>

//       {tasks.length === 0 ? (
//         <p className="text-gray-400">No upcoming tasks 🎉</p>
//       ) : (
//         <ul className="space-y-4">
//           {upcomingTasks.map(task => (
//             <TaskItem key={task.id} task={task} />
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default UpcomingTasks;
