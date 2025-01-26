'use clinet';
import React from 'react';

const TaskItem = ({ task }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-white">{task.title}</h3>
      <p className="text-gray-400">{task.description}</p>
      <p className="text-sm text-blue-400">Due: {new Date(task.dueDate).toDateString()}</p>
    </div>
  );
};

export default TaskItem;
