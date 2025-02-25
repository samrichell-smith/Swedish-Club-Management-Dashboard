import  { useEffect, useState } from "react";
import { Task } from "../typeDefs";


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

  function calculateTaskStats(taskList: Task[]) {

    const now = new Date();
    const nowUTC = new Date(now.toISOString())

    console.log("Current UTC Time:", nowUTC);
    console.log("Task Due Dates:", taskList.map(task => task.due));

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
            <li key={task.id} className="border p-2 my-2">
              <h4 className="font-semibold">{task.title}</h4>
              <p className="text-sm text-gray-500">
                Due: {task.due.toLocaleString()}
              </p>{" "}
              
            </li>
          ))}
        </ul>
      </div>

      <div className="my-4">
        <h3>Overdue Tasks</h3>
        <ul>
          {overdueTasks.map((task) => (
            <li key={task.id} className="border p-2 my-2">
              <h4 className="font-semibold">{task.title}</h4>
              <p className="text-sm text-gray-500">
                Due: {task.due.toLocaleString()}
              </p>{" "}
              
            </li>
          ))}
        </ul>
      </div>
      {/* Add quick actions here */}
    </div>
  );
};

export default Dashboard;
