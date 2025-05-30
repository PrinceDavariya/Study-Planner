import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TaskProvider, {Taskcontext,} from './components/Context/Taskcontext.jsx'

createRoot(document.getElementById('root')).render(
  <>
  <TaskProvider>
    <App />
    </TaskProvider>
  </>,
)
