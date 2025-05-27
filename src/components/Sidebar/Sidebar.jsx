import React from 'react';
import { LayoutDashboardIcon, CalendarIcon, BookOpenIcon, BarChart3Icon, SettingsIcon, LogOutIcon, GraduationCapIcon } from 'lucide-react';
export function Sidebar() {
  return <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <GraduationCapIcon className="h-8 w-8 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Study Planner</h2>
        </div>
      </div>
      <nav className="mt-6">
        <ul>
          {[{
          icon: <LayoutDashboardIcon size={20} />,
          label: 'Dashboard',
          active: true
        }, {
          icon: <CalendarIcon size={20} />,
          label: 'Schedule',
          active: false
        }, {
          icon: <BookOpenIcon size={20} />,
          label: 'Subjects',
          active: false
        }, {
          icon: <BarChart3Icon size={20} />,
          label: 'Analytics',
          active: false
        }, {
          icon: <SettingsIcon size={20} />,
          label: 'Settings',
          active: false
        }].map((item, index) => <li key={index}>
              <a href="#" className={`flex items-center gap-3 px-6 py-3 text-sm font-medium ${item.active ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>
                {item.icon}
                {item.label}
              </a>
            </li>)}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-64 p-6">
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <LogOutIcon size={18} />
          <span>Log out</span>
        </button>
      </div>
    </aside>;
}