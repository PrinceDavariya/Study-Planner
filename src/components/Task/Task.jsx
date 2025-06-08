import React, { useContext, useEffect, useState } from "react";
import { CheckIcon, PlusIcon } from "lucide-react";
import AddTask from "./AddTask";
import app from "../../FireBase/Firebase";
import { getDatabase, onValue, ref, update } from "firebase/database";
import { set } from "date-fns";
import { Taskcontext } from "../Context/Taskcontext";

export function Tasks({ date, setDate }) {
  const [Tasks, setTasks] = useState();
  const [allTasks, setAllTasks] = useState([]);

  const { setContexttasks } = useContext(Taskcontext);

  function firebaseSavedTask() {
    const db = getDatabase(app);
    const tasksRef = ref(db, "Tasks");
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      const all = data ? Object.values(data) : [];
      setAllTasks(all); // store full list
      setTasks(all); // initially show all tasks
      setContexttasks(all); // update context with all tasks
    });

    // Cleanup function to detach listener
    return () => {
      off(tasksRef, "value", unsubscribe);
    };
  }
  // change task completion status
  function taskcompleted(id, completed) {
    const db = getDatabase(app);
    const taskref = ref(db, `Tasks/${id}`);
    update(taskref, {
      completed: !completed, // toggle completion status
    });
  }

  useEffect(() => {
    firebaseSavedTask();
  }, []);

  function filterTasksByDate() {
    if (!date) return;
    const filtered = allTasks.filter(
      (task) => task.createdAt === date.toISOString()
    );
    setTasks(filtered);
  }

  useEffect(() => {
    if (date) {
      filterTasksByDate();
    } else {
      setTasks(allTasks); // reset to all if no date
    }
  }, [date, allTasks]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-50";
      case "Medium":
        return "text-amber-600 bg-amber-50";
      case "Low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm max-h-[400px]  overflow-y-scroll    p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Tasks</h2>
        <AddTask> </AddTask>
      </div>

      <div className="space-y-3">
        {Tasks &&
          Tasks.map((task, index) => (
            <div
              key={index}
              className={`p-3 runded-lg border border-gray-100 
          ${task.completed ? "bg-gray-50" : "bg-white"}
          `}
            >
              <div className="flex items-start gap-3">
                <div
                  onClick={(e) => {
                    taskcompleted(task.id, task.completed);
                  }}
                  className={`mt-0.5 h-5 w-5 rounded-full border ${
                    task.completed
                      ? "bg-blue-600 border-blue-600 flex items-center justify-center"
                      : "border-gray-300"
                  }`}
                >
                  {task.completed && (
                    <CheckIcon size={12} className="text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      task.completed
                        ? "text-gray-500 line-through"
                        : "text-gray-800"
                    }`}
                  >
                    {task.Task}
                  </p>
                  <div className="flex items-center mt-1 text-xs">
                    <span className="text-gray-500">
                      {task.createdAt
                        ? new Date(task.createdAt).toLocaleDateString()
                        : "No date"}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                    task.Priority
                  )}`}
                >
                  {task.Priority}
                </span>
              </div>
            </div>
          ))}
      </div>

      {Tasks && Tasks.length === 0 && (
        <center className="xl:h-6/12  justify-center items-center flex">
          {" "}
          <p className="text-blue-500 text-lg mt-4 font-medium  ">
            No tasks found for this date.
          </p>
        </center>
      )}

      {/* Button to view all tasks */}
      {/* <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
        View All Tasks
      </button> */}
    </div>
  );
}
