import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import app from "../../FireBase/Firebase"; // Adjust the import path as necessary
import { set, ref, getDatabase, push } from "firebase/database";
import DatePickerDemo from "../ui/datapicker";
import { format } from "date-fns/fp";

export default function DialogDemo() {
  const [Task, setTask] = useState("");
  const [Priority, setPriority] = useState("Low");
  const [Tasks, setTasks] = useState([]);
  const [date, setDate] = useState(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className=" bg-blue-50 text-blue-600">
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>

        <form
          className="grid gap-4 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (Task === "") {
              alert("Please enter a task");
              return;
            }          
           
            const db = getDatabase(app);
            const tasksRef = ref(db, "Tasks"); // Reference to the "Tasks" url in the database
            const uniqueid = push(tasksRef); // Create a new unique key for the task
            const id  = uniqueid.key; // Get the unique key
            const newTask = {
              id: id, // Store the unique ID
              Task,
              Priority,
              completed: false,
              createdAt: date.toISOString(), // Store the date as an ISO string
            };
            set(uniqueid, newTask); // stores the task object

            setTasks((prevTasks) => [...prevTasks, newTask, ]); // Update the local state with the new task
            setTask("");
            setPriority("Low");
            setDate(null); // Reset the date picker
          }}
        >
          <div className="grid items-center gap-4 text-2xl">
            <Input
              id="name"
              placeholder="Write Task"
              className="col-span-3 font-medium text-lg!"
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center ">
            <Label htmlFor="priority" className="text-right text-base">
              Priority
            </Label>
            <dropdown>
              <div className="col-span-3">
                <select
                  id="username"
                  className="w-full h-10 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </dropdown>
          </div>

          <DatePickerDemo date={date} setDate={setDate} />
          <DialogFooter>
            <DialogClose asChild>
              <center>
                {" "}
                <Button
                  className="flex justify-center items-center"
                  type="submit"
                >
                  Save changes
                </Button>
              </center>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
