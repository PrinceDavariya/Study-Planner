import React, { useState } from 'react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import {Calendar} from '../ui/calendar.jsx';


export function Schedule({date, setDate}) {
//   const [date, setDate] =useState()

// const today = new Date();
  // const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // const currentDay = today.getDay();
  // const scheduleItems = [{
  //   subject: 'Mathematics',
  //   topic: 'Linear Algebra',
  //   time: '9:00 AM - 10:30 AM',
  //   color: 'bg-blue-100 border-blue-300 text-blue-800'
  // }, {
  //   subject: 'Computer Science',
  //   topic: 'Data Structures',
  //   time: '11:00 AM - 12:30 PM',
  //   color: 'bg-purple-100 border-purple-300 text-purple-800'
  // }, {
  //   subject: 'Physics',
  //   topic: 'Quantum Mechanics',
  //   time: '2:00 PM - 3:30 PM',
  //   color: 'bg-green-100 border-green-300 text-green-800'
  // }];
 
  return ( 
     <>
  {/* // <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
  //     <div className="flex items-center justify-between mb-6">
  //       <h2 className="text-lg font-bold text-gray-800">Today's Schedule</h2>
  //       <div className="flex items-center gap-2">
  //         <button className="p-1 rounded-md hover:bg-gray-100">
  //           <ChevronLeftIcon size={18} />
  //         </button>
  //         <button className="p-1 rounded-md hover:bg-gray-100">
  //           <ChevronRightIcon size={18} />
  //         </button>
  //       </div>
  //     </div>
  //     <div className="flex mb-6">
  //       {dayNames.map((day, index) => <div key={index} className={`flex-1 text-center py-2 ${index === currentDay ? 'bg-blue-50 rounded-md text-blue-600 font-medium' : 'text-gray-500'}`}>
  //           <p className="text-xs">{day}</p>
  //           <p className="text-sm mt-1">
  //             {new Date(today.getTime() + (index - currentDay) * 86400000).getDate()}
  //           </p>
  //         </div>)}
  //     </div>
  //     <div className="space-y-4">
  //       {scheduleItems.map((item, index) => <div key={index} className={`p-4 rounded-lg border-l-4 ${item.color}`}>
  //           <div className="flex justify-between items-start">
  //             <div>
  //               <h3 className="font-medium">{item.subject}</h3>
  //               <p className="text-sm text-gray-600">{item.topic}</p>
  //             </div>
  //             <div className="flex items-center gap-1 text-sm text-gray-500">
  //               <CalendarIcon size={14} />
  //               <span>{item.time}</span>
  //             </div>
  //           </div>
  //         </div>)}
  //     </div>
  //     <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
  //       View Full Schedule
  //     </button>  </div>; */}
  <div className='text-8xl font-bold text-gray-800'>
 <Calendar  
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-md border font-extralight"
    />
  </div>
 </>
 )
}