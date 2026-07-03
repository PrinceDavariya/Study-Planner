import React from 'react';
import { BookOpenIcon, BarChart3Icon, TrendingUpIcon } from 'lucide-react';
export function Progress() {
  const subjects = [{
    name: 'Mathematics',
    progress: 75,
    color: 'bg-blue-600',
    hours: 12.5
  }, {
    name: 'Physics',
    progress: 60,
    color: 'bg-purple-600',
    hours: 10
  }, {
    name: 'Computer Science',
    progress: 85,
    color: 'bg-green-600',
    hours: 14
  }, {
    name: 'Literature',
    progress: 40,
    color: 'bg-amber-600',
    hours: 7
  }, {
    name: 'Chemistry',
    progress: 30,
    color: 'bg-red-600',
    hours: 5
  }];
  return <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Subject Progress</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <BookOpenIcon size={16} />
            <span>5 Subjects</span>
          </span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="flex items-center gap-1">
            <BarChart3Icon size={16} />
            <span>48.5 Hours</span>
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {subjects.map((subject, index) => <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${subject.color}`}></div>
                <span className="font-medium text-gray-700">
                  {subject.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {subject.hours} hrs
                </span>
                <span className="text-sm font-medium">{subject.progress}%</span>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full ${subject.color}`} style={{
            width: `${subject.progress}%`
          }}></div>
            </div>
          </div>)}
      </div>
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUpIcon className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Weekly Progress</h3>
            <p className="text-sm text-gray-600">
              You're 15% ahead of your weekly study goal!
            </p>
          </div>
        </div>
      </div>
    </div>;
}