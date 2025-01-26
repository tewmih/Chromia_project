"use client";

import React, { useState } from "react";

export default function About() {
  const [seeMore, setSeeMore] = useState(false);

  const features = [
    {
      title: "User Account Management",
      description:
        "Enable users to create accounts using either an EVM wallet or a generated keypair securely stored in local storage.",
    },
    {
      title: "Task Creation",
      description:
        "Allow users to create tasks with a title, description, and due date to organize their activities effectively.",
    },
    {
      title: "Task Updates",
      description:
        "Provide the ability to update task details such as title, description, and due date to reflect changes dynamically.",
    },
    {
      title: "Task Completion & Deletion",
      description:
        "Mark tasks as completed or delete them permanently to keep the task list relevant and clutter-free.",
    },
    {
      title: "View & Filter Tasks",
      description:
        "Display tasks specific to the authenticated user with filtering by status and sorting by due date.",
    },
    {
      title: "Secure Authentication",
      description:
        "Authenticate users with the selected method to ensure data privacy and secure task management.",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row px-6 py-12">
      {/* Left Section - Image */}
      <div className="w-full md:w-1/3 flex mt-10 justify-center items-start mb-6 md:mb-0">
  <svg
    className="rounded-lg shadow-lg"
    viewBox="0 0 20 30"
    fill="none"
    width={400}
    height={300}
  >
    <path
      d="M14.02 17.251A4.906 4.906 0 0 1 9.695 19.8c-2.702 0-4.892-2.14-4.892-4.78s2.19-4.781 4.892-4.781a4.906 4.906 0 0 1 4.325 2.548h5.093c-1.021-4.162-4.845-7.26-9.418-7.26C4.341 5.526 0 9.768 0 15s4.34 9.474 9.695 9.474c4.56 0 8.373-3.08 9.409-7.223H14.02Z"
      fill="#FFB0C2"
    />
    <path
      d="M14.26 10.29a5.066 5.066 0 0 0 3.107-1.1c-1.74-2.23-4.504-3.652-7.643-3.623-.091 0-.182.003-.273.006-.042 2.63 2.11 4.74 4.81 4.716Z"
      fill="#CC66B8"
    />
    <path
      d="M17.364 9.223a4.704 4.704 0 0 0 1.792-3.686c0-2.625-2.178-4.753-4.864-4.753-2.687 0-4.865 2.128-4.865 4.753v.004c.09-.002.18-.004.271-.004a9.74 9.74 0 0 1 7.666 3.686Z"
      fill="#CC91F0"
    />
  </svg>
</div>


      {/* Right Section - Features */}
      <div className="w-full md:w-2/3 flex flex-col items-center md:items-start p-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome to To-Do dApp
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg text-center md:text-left mb-6">
          Stay on top of your tasks with our easy-to-use To-Do dApp. Organize,
          prioritize, and track your tasks to boost productivity.
        </p>

        {/* Features Section */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
            Features
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {features.slice(0, 4).map((feature, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-5 transition hover:scale-105"
              >
                <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                  {feature.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}

            {seeMore &&
              features.slice(4).map((feature, index) => (
                <div
                  key={index + 4}
                  className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-5 transition hover:scale-105"
                >
                  <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
          </div>

          {/* See More / See Less Toggle */}
          <button
            className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium underline"
            onClick={() => setSeeMore(!seeMore)}
          >
            {seeMore ? "See Less" : "See More"}
          </button>
        </div>
      </div>
    </div>
  );
}
