import React from 'react'

const Dashboard = () => {

  type Task = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    dueDate: string;
  }

  async function fetchAllTasks() {
    try {
      const response = await fetch("https://swedish-club-management-api.onrender.com/task/")
      const data = await response.json()

      const tasksWithConvertedValues = data.map(task => ({
        ...task,
        dueDate: new Date(task.dueDate),
        
      })
      )

      setTasks


    }
  }


  return (
    <div>Dashboard</div>
  )
}

export default Dashboard