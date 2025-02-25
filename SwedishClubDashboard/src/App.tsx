import { Routes, Route } from "react-router-dom"
import './index.css'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/TaskPage'


function App() {
  

  return (
    <>

      <div>
        
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </div>
    </> 
  )
}

export default App
