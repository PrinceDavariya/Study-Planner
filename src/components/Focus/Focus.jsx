import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { getDatabase, ref, push } from "firebase/database";
import app from "../../FireBase/Firebase";
import { useNavigate } from "react-router-dom";

export default function FocusTimer({ onClose }) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const navigate = useNavigate()
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  function formatTime(totalSeconds) {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function handleStop() {
    setIsRunning(false);
    const focusHours = seconds / 3600;

    // Save to Firebase
    const db = getDatabase(app);
    const focusRef = ref(db, "FocusHours");
    push(focusRef, {
      duration: focusHours,
      date: new Date().toISOString(),
    });

    navigate("/")
    onClose();
  }

  const quotes = [
    "Stay focused, stay sharp.",
    "You are doing great.",
    "Discipline is doing it even when you don't feel like it.",
    "One task at a time."
  ];

  const generateQuotes = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[generateQuotes];

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col items-center justify-center text-center px-4">
      {/* <p className="text-xl mb-4">{randomQuote}</p> */}
      <h1 className="text-6xl font-bold mb-8">{formatTime(seconds)}</h1>
      <button
        onClick={handleStop}
        className="px-6 py-3 bg-red-600 rounded-md text-white text-lg hover:bg-red-700"
      >
        Stop Focus
      </button>
    </div>
  );
}
