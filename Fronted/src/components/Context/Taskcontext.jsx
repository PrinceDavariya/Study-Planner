import React, { createContext, useContext, useState } from "react";

export  const Taskcontext = createContext();

const TaskProvider = ({ children }) => {
  const [Contexttasks, setContexttasks] = useState([]);

  return (
    <Taskcontext.Provider value={{ Contexttasks, setContexttasks }}>
      {children}
    </Taskcontext.Provider>
  );
};


export default TaskProvider;
