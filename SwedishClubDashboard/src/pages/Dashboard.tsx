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
    <div className="p-4">
    <h1 className="text-2xl font-bold">Dashboard</h1>
    <div className="my-4">
      <h2>Total Tasks: {totalTasks}</h2>
      <h2>Upcoming Tasks: {upcomingTasks.length}</h2>
      <h2>Overdue Tasks: {overdueTasksCount}</h2>
    </div>
    <div className="my-4">
      <h3>Upcoming Tasks</h3>
      <ul>
        {upcomingTasks.map(task => (
          <li key={task.id} className="border p-2 my-2">
            <h4 className="font-semibold">{task.title}</h4>
            <p className="text-sm text-gray-500">Due: {task.dueDate.toLocaleString()}</p> {/* Format date for display */}
          </li>
        ))}
      </ul>
    </div>
    {/* Add quick actions here */}
  </div>
  )
}

export default Dashboard