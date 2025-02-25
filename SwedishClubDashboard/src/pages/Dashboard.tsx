import  { useEffect, useState } from "react";
import { Task } from "../typeDefs";
import TaskCard from "../components/TaskCard";


const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [overdueTasks, setOverdueTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  async function fetchAllTasks() {
    try {
      const response = await fetch(
        "https://swedish-club-management-api.onrender.com/task/"
      );
      const data = await response.json();

      console.log("Raw API Data:", data)

      const tasksWithConvertedValues: Task[] = data.map((task: any) => ({
        ...task,
        due: new Date(task.due),
      }));

      setTasks(tasksWithConvertedValues);
      calculateTaskStats(tasksWithConvertedValues);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async function handleDelete(taskId: string) {
    try {
      await fetch(`https://swedish-club-management-api.onrender.com/task/${taskId}`, 
        {
          method: 'DELETE'
        }
      )

      setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId))
      calculateTaskStats(tasks)

    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  function calculateTaskStats(taskList: Task[]) {

    const now = new Date();
    const nowUTC = new Date(now.toISOString())

    

    setTotalTasks(taskList.length);

    
    const upcoming = taskList.filter((task) => task.due > nowUTC).slice(0, 3);
    setUpcomingTasks(upcoming);

    const overdue = taskList
      .filter((task) => task.due < nowUTC)
      .sort((a, b) => a.due.getTime() - b.due.getTime())
      .slice(0, 5);
    setOverdueTasks(overdue);

    
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="my-4">
        <h2>Total Tasks: {totalTasks}</h2>
        <h2>Upcoming Tasks: {upcomingTasks.length}</h2>
        <h2>Overdue Tasks: {overdueTasks.length}</h2>
      </div>
      <div className="my-4">
        <h3>Upcoming Tasks</h3>
        <ul>
          {upcomingTasks.map((task) => (
            <TaskCard task={task} onDelete={() => handleDelete(task.id)} />
          ))}
        </ul>
      </div>

      <div className="my-4">
        <h3>Overdue Tasks</h3>
        <ul>
          {overdueTasks.map((task) => (
            <TaskCard task={task} onDelete={() => handleDelete(task.id)} />
          ))}
        </ul>
      </div>
      {/* Add quick actions here */}
    </div>
    
  );
};

export default Dashboard;
