import React from 'react';
import { BellIcon, SearchIcon, MenuIcon, UserIcon } from 'lucide-react';
import { Button } from '../ui/button';
export function Header() {
  return <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <button className="md:hidden text-gray-500">
          <MenuIcon />
        </button>
        <div className="relative hidden md:block">
          <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      
        <div className="flex items-center gap-4">
          <button className="relative text-gray-500 hover:text-gray-700">
            <BellIcon />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <UserIcon size={18} />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700">Alex Johnson</p>
              <p className="text-xs text-gray-500">Computer Science</p>
            </div>
          </div>
        </div>
      </div>
    </header>;
}