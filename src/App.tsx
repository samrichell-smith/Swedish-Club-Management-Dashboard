import { Routes, Route } from "react-router-dom"
import './index.css'
import Dashboard from './pages/Dashboard'

import AllTasksPage from "./pages/AllTasksPage"


function App() {
  

  return (
    <>

      <div>
        
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<AllTasksPage />} />
        </Routes>
      </div>
    </> 
  )
}

export default App
