'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LiaPlusCircleSolid } from 'react-icons/lia';
import {  AiOutlineHome, AiOutlineCalendar} from 'react-icons/ai';
import { Modal } from './Modal';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [name,setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriorty] = useState("");
  

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const handleSubmit=()=>{}

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-26'
      } !bg-fuchsia-950 h-screen p-4 border-r border-gray-700 text-gray-300 transition-all duration-300 mt-16`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="mb-4 text-gray-400 hover:text-white focus:outline-none"
      >
        {isCollapsed ? '▶' : '◀'}
      </button>

      {/* Sidebar Content */}
      <ul className="space-y-4">
        <li>
          <Link
            href="/home"
            className={`flex items-center gap-3 px-4 py-2 rounded-md ${
              pathname === '/home'
                ? 'bg-gray-700 text-white'
                : 'hover:bg-gray-800 hover:text-white'
            }`}
          >
            <AiOutlineHome size={20} />
            <span className={isCollapsed ? 'hidden' : ''}>To-Dos</span>
          </Link>
        </li>
        <li>
          <div
            
            className={`flex items-center gap-3 px-4 py-2 rounded-md  hover:cursor-pointer hover:bg-gray-800 hover:text-white`}
            onClick={()=>setModalOpen(true)}
          >
            <LiaPlusCircleSolid size={20} />
            <span className={isCollapsed ? 'hidden' : ''}>Add Task</span>
          </div>
          <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                  <form
                    onSubmit={handleSubmit}
                    method="dialog"
                    className="flex flex-col gap-6 bg-gray-800 p-8 rounded-lg shadow-lg text-white w-full max-w-md"
                  >
                    <h3 className="font-bold text-2xl text-center">Add New Task</h3>
          
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm font-semibold">
                        Task Name
                      </label>
                      <input
                        className="h-10 bg-gray-700 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Enter task name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
          
                    <div className="flex flex-col gap-2">
                      <label htmlFor="description" className="text-sm font-semibold">
                        Description
                      </label>
                      <textarea
                        className="h-20 bg-gray-700 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Enter task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
          
                    <div className="flex flex-col gap-2">
                      <label htmlFor="priority" className="text-sm font-semibold">
                        Priority
                      </label>
                      <select
                        className="h-10 bg-gray-700 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriorty(e.target.value)}
                      >
                        <option value="" disabled>
                          Select priority
                        </option>
                        <option value="high" className="p-2">
                          High
                        </option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
          
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-purp;e-500 transition-transform transform hover:scale-105"
                    >
                      Submit
                    </button>
                  </form>
                </Modal>
        </li>
        <li>
          <Link
            href="/upcoming"
            className={`flex items-center gap-3 px-4 py-2 rounded-md ${
              pathname === '/upcoming'
                ? 'bg-gray-700 text-white'
                : 'hover:bg-gray-800 hover:text-white'
            }`}
          >
            <AiOutlineCalendar size={20} />
            <span className={isCollapsed ? 'hidden' : ''}>Upcoming</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
