import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header/Header.jsx";
import { Sidebar } from "./components/Sidebar/Sidebar.jsx";
import { Overview } from "./components/Overview/Overview.jsx";
import { Progress } from "./components/Progressbar/Progress.jsx";
import { Tasks } from "./components/Task/Task.jsx";
import { Schedule } from "./components/Schedule/Schedule.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FocusTimer from "./components/Pages/Focus/Focus.jsx";
import { ToastContainer } from "react-toastify";
import Anylitics from "./components/Pages/Anylitics.jsx";

function App() {
  const today = new Date()
  today.setHours(0, 0, 0, 0);            // Sets time to 00:00:00.000

  const [selectedDate, setSelectedDate] = useState(today);
  return (
   

    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Header />
          <main className="p-6">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">
                      Dashboard
                    </h1>
                    <Overview />
                    <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 mt-6">
                      <Schedule date={selectedDate} setDate={setSelectedDate} />
                      <Tasks date={selectedDate} setDate={setSelectedDate} />
                    </div>
                    {/* <Progress /> */}
                  </>
                }
              />
              <Route path="/focus" element={<FocusTimer />} />
                <Route path="/analytics" element={<Anylitics />} />


            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
