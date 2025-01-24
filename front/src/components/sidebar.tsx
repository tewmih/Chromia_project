'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LiaPlusCircleSolid } from 'react-icons/lia';
import { AiOutlineInbox, AiOutlineHome, AiOutlineCalendar, AiOutlineFilter } from 'react-icons/ai';


const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const routes = [
    { name: 'To-Dos', path: '/home', icon: <AiOutlineHome size={20} /> },
    { name: 'Add Task', path: '/add', icon: <LiaPlusCircleSolid size={20} /> },
    { name: 'Upcoming', path: '/upcoming', icon: <AiOutlineCalendar size={20} /> },
  ];

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
      {/* <h2 className={`text-lg font-semibold mb-6 text-gray-400 ${isCollapsed ? 'hidden' : ''}`}>
        My Projects
      </h2> */}
      <ul className="space-y-4">
        {routes.map((route) => (
          <li key={route.path}>
            <Link
              href={route.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md ${
                pathname === route.path
                  ? 'bg-gray-700 text-white'
                  : 'hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span>{route.icon}</span>
              <span className={isCollapsed ? 'hidden' : ''}>{route.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
