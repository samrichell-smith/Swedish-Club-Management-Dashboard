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
      .slice(0, 3);
    setOverdueTasks(overdue);

    
  }

  return (

  


    <div className="p-4">



      <div className="p-6">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">University of Auckland Swedish Club Dashboard</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          View All Tasks
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Stats</h2>
          <div className="my-2">
            <h3>Total Tasks: {totalTasks}</h3>
            <h3>Upcoming Tasks: {upcomingTasks.length}</h3>
            <h3>Overdue Tasks: {overdueTasks.length}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <section className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Upcoming Tasks</h3>
          <ul>
            {upcomingTasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} />
            ))}
          </ul>
        </section>

        <section className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Overdue Tasks</h3>
          <ul>
            {overdueTasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} />
            ))}
          </ul>
        </section>
      </div>

      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        
      >
        Add New Task
      </button>

      {/* Add your popup modal for adding tasks here */}
    </div>












      {/* <h1 className="text-2xl font-bold">Dashboard</h1>
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
      </div> */}
      {/* Add quick actions here */}
    </div>
    
  );
};

export default Dashboard;
