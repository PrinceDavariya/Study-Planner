import React, { useContext, useState } from "react";
import {
  ClockIcon,
  BookIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react";
import { Taskcontext } from "../Context/Taskcontext";
import {
  endOfWeek,
  isWithinInterval,
  nextMonday,
  parseISO,
  startOfWeek,
} from "date-fns";
import { Button } from "../ui/button";
import FocusTimer from "../Focus/Focus";
import { useNavigate } from "react-router-dom";
import { getDatabase, onValue, ref } from "firebase/database";
import app from "../../FireBase/Firebase";

export function Overview() {
  // Context to manage tasks
  const { Contexttasks } = useContext(Taskcontext);

  const today = new Date();
  const [formattedTime, setFormattedTime] = useState("00:00:00");

  // Block 1: Today's Summary
  // // Filter tasks for today's date
  const TodatTaskSummary = Contexttasks.filter((task) => {
    const taskDate = parseISO(task.createdAt); // convert string to Date
    return today.toDateString() === taskDate.toDateString();
  });

  // Sort Completed and Remaining Tasks
  const completedTasks = TodatTaskSummary.filter((task) => task.completed);
  const remainingTasks = TodatTaskSummary.filter((task) => !task.completed);

  // Block 2: Weekly Productivity
  // Step 1: Get this week's Monday (week starts on Monday = 1)
  const thisMonday = startOfWeek(today, { weekStartsOn: 1 });

  // Step 2: Get this week's Sunday
  const thisSunday = endOfWeek(today, { weekStartsOn: 1 });

  // Step 3: Filter tasks within the week
  const thisWeekTasks = Contexttasks.filter((task) => {
    const taskDate = parseISO(task.createdAt); // convert string to Date
    return isWithinInterval(taskDate, {
      start: thisMonday,
      end: thisSunday,
    });
  });
  const weekTotaTtask = thisWeekTasks.length;

  const weekCompletedTask = thisWeekTasks.filter((task) => {
    return task.completed == true;
  });

  // find percentage for completed task week
  const percentage = 100 * (weekCompletedTask.length / weekTotaTtask);

  // Block 3: Task Streak
  function calculateStreak(tasks) {
    const completedTasks = tasks.filter((task) => task.completed);
    const formattedDates = completedTasks.map((task) => {
      return new Date(task.createdAt).toISOString().split("T")[0];
    });
    const completedSet = new Set(formattedDates);

    let streak = 0;
    for (let i = 0; i < 100; i++) {
      const date = new Date();
      // If date is 2025-06-05, then date.getDate() returns 5.
      date.setDate(date.getDate() - i);
      const formatted = date.toISOString().split("T")[0];
      if (completedSet.has(formatted)) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }
  const streak = calculateStreak(Contexttasks);

  // Block 4 : Focus Timer
  function firebaseSavedTask() {
    const db = getDatabase(app);
    const tasksRef = ref(db, "FocusHours");

    return new Promise((resolve, reject) => {
      onValue(
        tasksRef,
        (snapshot) => {
          const data = snapshot.val();
          const dataArray = data ? Object.values(data) : [];
          resolve(dataArray);
        },
        reject
      );
    });
  }

  async function processFocusHours() {
    try {
      const data = await firebaseSavedTask();
      const todayTasksDuration = data.filter((task) => {
        const taskDate = parseISO(task.date);
        return today.toDateString() === taskDate.toDateString();
      });

      // Calculate total duration for today's tasks
      const totalDuration = todayTasksDuration.reduce((acc, task) => {
        return acc + task.duration * 3600; // convert to seconds
      }, 0);
      // Format total duration to HH:MM:SS
      const formattedTime = new Date(totalDuration * 1000)
        .toISOString()
        .substr(11, 8); // format to HH:MM:SS
      setFormattedTime(formattedTime);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  processFocusHours();
  const navigate = useNavigate();
  function startFocus() {
    navigate("/focus");
  }

  const stats = [
    //
    {
      title: "Today's Summary",
      value: " 1 completed, 2 remaining",
      unit: "tasks",
      // change: '+4',
      icon: <CheckCircleIcon className="h-6 w-6 text-green-600" />,
      color: "bg-green-50",
    },
    {
      title: "Upcoming Deadlines",
      value: "3",
      unit: "tasks",
      change: "-1",
      icon: <AlertCircleIcon className="h-6 w-6 text-amber-600" />,
      color: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Block 1: Today's Summary */}
      <div className="bg-white rounded-xl shadow-sm p-5 border">
        <h3 className="text-gray-700 font-semibold mb-2">Today's Summary</h3>
        <p className="text-2xl font-bold text-blue-600"> Tasks</p>
        <p className="text-sm text-gray-500 mt-1">
          {completedTasks &&
            ` ${completedTasks.length}  completed, ${remainingTasks.length} remaining`}
        </p>
      </div>

      {/* Block 2: Weekly Productivity */}
      <div className="bg-white rounded-xl shadow-sm p-5 border">
        <h3 className="text-gray-700 font-semibold mb-2">
          Weekly Productivity
        </h3>
        <div className="text-2xl font-bold text-green-600">
          {Math.floor(percentage)}%
        </div>
        <div className="h-2 bg-gray-200 rounded mt-2">
          <div
            className="h-2 bg-green-500 rounded"
            style={{ width: percentage + "%" }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {weekTotaTtask} of {weekCompletedTask.length} tasks done
        </p>
      </div>

      {/* Block 3: Task Streak */}
      <div className="bg-white rounded-xl shadow-sm p-5 border">
        <h3 className="text-gray-700 font-semibold mb-2">🔥 Task Streak</h3>
        <p className="text-2xl font-bold text-orange-500">{streak} Day{streak !== 1 && "s"}</p>
        <p className="text-md  text-red-500 mt-1">
          {streak > 0 ? "Keep the streak alive!" : "Start your streak today!"}
        </p>
      </div>

      {/* { Block 4 Focus Timer} */}
      <div className="bg-white rounded-xl shadow-sm p-5 border">
        <h3 className="text-gray-700 font-semibold mb-2">Focus Timer </h3>
        <div className="flex items-center">
          <ClockIcon className="h-6 w-6 text-purple-600 mr-2" />
          <span className="text-2xl font-bold text-purple-600">
            {" "}
            {formattedTime}
          </span>
        </div>
        <Button
          className="mt-4  bg-purple-600 text-white hover:bg-purple-700"
          onClick={startFocus}
        >
          Start Timer
        </Button>
      </div>
    </div>
  );
}
