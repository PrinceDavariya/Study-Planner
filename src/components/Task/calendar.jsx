// "use client"

// import * as React from "react"
// import { addDays, format, subDays } from "date-fns"
// import { cn } from "@/lib/utils"
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
// import { Button } from "../ui/button"
// import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"

// export function Calendar({ onDateSelect, initialDate = new Date(), className, title = "14-Day Calendar" }) {
//   const today = new Date()
//   const [startDate, setStartDate] = React.useState(initialDate)
//   const [selectedDate, setSelectedDate] = React.useState(initialDate)

//   // Check if current period includes today
//   const includesCurrentDay = React.useMemo(() => {
//     const endDate = addDays(startDate, 13)
//     return today >= startDate && today <= endDate
//   }, [startDate, today])

//   // Generate array of 14 days starting from the startDate
//   const days = React.useMemo(() => {
//     return Array.from({ length: 14 }, (_, i) => {
//       const date = addDays(startDate, i)
//       return {
//         date,
//         dayName: format(date, "EEE"), // Mon, Tue, etc.
//         dayNumber: format(date, "d"), // 1, 2, etc.
//         isToday: date.toDateString() === today.toDateString(),
//       }
//     })
//   }, [startDate, today])

//   // Navigation handlers
//   const goToPreviousPeriod = () => {
//     setStartDate(subDays(startDate, 14))
//   }

//   const goToNextPeriod = () => {
//     setStartDate(addDays(startDate, 14))
//   }

//   const goToToday = () => {
//     setStartDate(today)
//     setSelectedDate(today)
//     if (onDateSelect) onDateSelect(today)
//   }

//   const handleDateSelect = (date) => {
//     setSelectedDate(date)
//     {console.log("Selected date:", date)}
//     if (onDateSelect) onDateSelect(date)
//   }

//   return (
//     <Card className={cn("w-full h-full max-w-md", className)}>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle ></CardTitle>
//         <div className="flex items-center space-x-2">
//           <Button variant="outline" size="icon" onClick={goToPreviousPeriod} aria-label="Previous 14 days">
//             <ChevronLeft className="h-4 w-4" />
//           </Button>
//           {!includesCurrentDay && (
//             <Button variant="outline" size="sm" onClick={goToToday} className="flex items-center gap-1">
//               <CalendarIcon className="h-4 w-4" />
//               <span>Today</span>
//             </Button>
//           )}
//           <Button variant="outline" size="icon" onClick={goToNextPeriod} aria-label="Next 14 days">
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="mb-3 text-base font-medium">
//           {format(startDate, "MMMM d")} - {format(addDays(startDate, 13), "MMMM d, yyyy")}
//         </div>
//         <div className="grid grid-cols-7 gap-2 sm:grid-cols-7 md:gap-3">
//           {days.map((day, index) => (
//             <button
//               key={index}
//               className={cn(
//                 "flex h-14 flex-col items-center justify-center rounded-md p-2 text-center focus:outline-none focus:ring-2 focus:ring-ring",
//                 // day.isToday ? "" : "bg-muted/50",
//                 selectedDate && day.date.toDateString() === selectedDate.toDateString()


//                   ?"bg-primary text-primary-foreground" 
//                   :"hover:bg-gray-300 " ,
//               )}
//               onClick={() => handleDateSelect(day.date)}
//             >
//               <span className="text-xs font-medium">{day.dayName}</span>
//               <span className="text-lg">{day.dayNumber}</span>
//             </button>
//           ))}
//         </div>
// {/* 
//         {selectedDate && (
//           <div className="mt-4 text-center">
//             <p className="font-medium">Selected: {format(selectedDate, "MMMM d, yyyy")}</p>
//           </div>        )}  */}

//       </CardContent>
//     </Card>
//   )
// }
// export default Calendar
