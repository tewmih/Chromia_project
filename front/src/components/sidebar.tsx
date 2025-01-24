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
          <Link
            href="/add"
            className={`flex items-center gap-3 px-4 py-2 rounded-md ${
              pathname === '/add'
                ? 'bg-gray-700 text-white'
                : 'hover:bg-gray-800 hover:text-white'
            }`}
          >
            <LiaPlusCircleSolid size={20} />
            <span className={isCollapsed ? 'hidden' : ''}>Add Task</span>
          </Link>
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
