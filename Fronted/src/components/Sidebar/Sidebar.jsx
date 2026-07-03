import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboardIcon,
  CalendarIcon,
  BookOpenIcon,
  BarChart3Icon,
  SettingsIcon,
  LogOutIcon,
  GraduationCapIcon
} from 'lucide-react';

export function Sidebar() {
  const menuItems = [
    { icon: <LayoutDashboardIcon size={20} />, label: 'Dashboard', path: '/' },
    { icon: <BarChart3Icon size={20} />, label: 'Analytics', path: '/analytics' },
    { icon: <CalendarIcon size={20} />, label: 'Schedule', path: '/schedule' },
    { icon: <BookOpenIcon size={20} />, label: 'Subjects', path: '/subjects' },
    { icon: <SettingsIcon size={20} />, label: 'Settings', path: '/settings' }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:block relative">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <GraduationCapIcon className="h-8 w-8 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Study Planner</h2>
        </div>
      </div>
      <nav className="mt-6">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 text-sm font-medium ${
                    isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-64 p-6">
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <LogOutIcon size={18} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
