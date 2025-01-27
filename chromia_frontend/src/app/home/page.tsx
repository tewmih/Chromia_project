"use client";

import ToDoList from "@/components/ToDoList";

const Page = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Your To-Do List</h1>
        <ToDoList />
      </div>
    </div>
  );
};

export default Page;
