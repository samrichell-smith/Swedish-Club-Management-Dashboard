import React, { useState } from 'react'


type Task = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
}

const Dashboard = () => {

  const [tasks, setTasks] = useState<Task[]>([])
  const [totalTasks, setTotalTasks] = useState(0)





  async function fetchAllTasks() {
    try {
      const response = await fetch("https://swedish-club-management-api.onrender.com/task/")
      const data = await response.json()

      const tasksWithConvertedValues = data.map(task => ({
        ...task,
        dueDate: new Date(task.dueDate),
        
      })
      )

      setTasks(tasksWithConvertedValues)
      calculateTaskStats(tasksWithConvertedValues)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    }
  }


  return (
    <div>Dashboard</div>
  )
}

export default Dashboard