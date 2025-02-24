import React, { useEffect, useState } from 'react'


type Task = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  dueDate: Date;
}

const Dashboard = () => {

  const [tasks, setTasks] = useState<Task[]>([])
  const [totalTasks, setTotalTasks] = useState(0)
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([])
  const [overdueTasksCount, setOverdueTasksCount] = useState(0)

  useEffect(() => {
    fetchAllTasks()
  }, [])





  async function fetchAllTasks() {
    try {
      const response = await fetch("https://swedish-club-management-api.onrender.com/task/")
      const data = await response.json()

      const tasksWithConvertedValues: Task[] = data.map((task: any) => ({
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

  function calculateTaskStats(taskList: Task[]) {
    setTotalTasks(taskList.length)

    const now = new Date()
    const upcoming = taskList.filter(task => task.dueDate > now).slice(0,3)
    setUpcomingTasks(upcoming)

    const overdueCount = taskList.filter(task => task.dueDate < now).length
    setOverdueTasksCount(overdueCount)
  }


  return (
    <div>Dashboard</div>
  )
}

export default Dashboard