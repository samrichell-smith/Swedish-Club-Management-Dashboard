import { useEffect, useState } from "react";
import { Task } from "../typeDefs";
import TaskCard from "../components/TaskCard";
import NewTask from "../components/NewTask";
import { useNavigate } from "react-router-dom";

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

      console.log("Raw API Data:", data);

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
      await fetch(
        `https://swedish-club-management-api.onrender.com/task/${taskId}`,
        {
          method: "DELETE",
        }
      );

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      calculateTaskStats(tasks);
      fetchAllTasks()
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  function calculateTaskStats(taskList: Task[]) {
    const now = new Date();
    const nowUTC = new Date(now.toISOString());

    setTotalTasks(taskList.length);

    const upcoming = taskList.filter((task) => task.due > nowUTC).slice(0, 3);
    setUpcomingTasks(upcoming);

    const overdue = taskList
      .filter((task) => task.due < nowUTC)
      .sort((a, b) => a.due.getTime() - b.due.getTime())
      .slice(0, 3);
    setOverdueTasks(overdue);
  }

  const [isNewTaskOpen, setisNewTaskOpen] = useState(false)

  const navigate = useNavigate()

  return (
    <div className="p-4 bg-gray-200 h-screen">
      <div className="flex flex-row gap-x-4">
        <div className="flex flex-col items-center mb-4 w-1/2 bg-white p-4 rounded-lg shadow ">
          <div className="w-full h-1/2 flex items-center">
            <h1 className="text-4xl font-semibold text-gray-800">
              University of Auckland Swedish Club Dashboard
            </h1>
          </div>



          <div className="items-center justify-center w-full h-1/2 flex p-2 gap-x-28">
            
            <button className="px-4 py-2 bg-[#005cbf] text-white rounded hover:bg-[#004a9f] cursor-pointer hover:scale-104 duration-300 transition-all
            ease-in-out shadow-md"
            onClick={() => setisNewTaskOpen(true)}>
              Add New Task
            </button>

            <button className="px-4 py-2 bg-[#005cbf] text-white rounded hover:bg-[#004a9f] cursor-pointer hover:scale-104 duration-300 transition-all
            ease-in-out shadow-md"
            onClick={() => navigate('/tasks')}>
              View All Tasks
            </button>
          </div>
        </div>

        <div className="gap-4 mb-4 w-1/2 h-full flex flex-col">
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-3xl font-semibold mb-4  pb-2 text-center text-gray-800">Stats</h2>
            <div className="flex flex-row space-x-40 justify-center ">
              <h3 className="text-lg bg-[#ffc720] p-2 rounded-lg text-gray-800">
                Total Tasks: <span className="font-bold">{totalTasks}</span>
              </h3>
              <h3 className="text-lg bg-[#ffc720] p-2 rounded-lg text-gray-800">
                Upcoming Tasks:{" "}
                <span className="font-bold">{upcomingTasks.length}</span>
              </h3>
              <h3 className="text-lg bg-[#ffc720] p-2 rounded-lg text-gray-800">
                Overdue Tasks:{" "}
                <span className="font-bold">{overdueTasks.length}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-0">
        <section className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-3xl font-semibold mb-4">Upcoming Tasks</h3>
          <ul className="flex flex-col gap-y-4">
            {upcomingTasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} />
            ))}
          </ul>
        </section>

        <section className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-3xl font-semibold mb-4">Overdue Tasks</h3>
          <ul className="flex flex-col gap-y-4">
            {overdueTasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} />
            ))}
          </ul>
        </section>
      </div>

      

      <NewTask isOpen={isNewTaskOpen} onClose={() => setisNewTaskOpen(false)} fetchAllTasks={fetchAllTasks} />
    </div>
  );
};

export default Dashboard;
