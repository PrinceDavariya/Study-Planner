import React from 'react';
import { ClockIcon, BookIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
export function Overview() {
  
  const stats = [
  //  
   {
    title: 'Completed Tasks',
    value: '18',
    unit: 'tasks',
    change: '+4',
    icon: <CheckCircleIcon className="h-6 w-6 text-green-600" />,
    color: 'bg-green-50'
  }, {
    title: 'Upcoming Deadlines',
    value: '3',
    unit: 'tasks',
    change: '-1',
    icon: <AlertCircleIcon className="h-6 w-6 text-amber-600" />,
    color: 'bg-amber-50'
  }];
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <div className="flex items-baseline mt-1">
                <h3 className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
                <span className="ml-1 text-sm text-gray-500">{stat.unit}</span>
              </div>
              <p className={`text-xs mt-2 ${parseInt(stat.change) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last week
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>{stat.icon}</div>
          </div>
        </div>)}
    </div>;
}