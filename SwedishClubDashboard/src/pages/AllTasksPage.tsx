import { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import NewTask from '../components/NewTask';
import { Task } from '../typeDefs';
import { useNavigate } from 'react-router-dom';

const AllTasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://swedish-club-management-api.onrender.com/task/');
      const data: Task[] = await response.json();
      const sortedTasks = data.sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime());
      setTasks(sortedTasks);
      setFilteredTasks(sortedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`https://swedish-club-management-api.onrender.com/task/${id}/`, { method: 'DELETE' });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleFilterChange = (tag: string) => {
    setSelectedTag(tag);
    if (tag === 'All') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.tags.includes(tag)));
    }
  };

  const uniqueTags = Array.from(new Set(tasks.flatMap(task => task.tags)));

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">All Tasks</h2>
        <div className="mb-6 flex justify-between">
          <button 
            className="px-4 py-2 bg-[#005cbf] text-white rounded hover:bg-[#004a9f] cursor-pointer hover:scale-104 duration-300 transition-all ease-in-out shadow-md"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
          <button 
            className="px-4 py-2 bg-[#005cbf] text-white rounded hover:bg-[#004a9f] cursor-pointer hover:scale-104 duration-300 transition-all ease-in-out shadow-md"
            onClick={() => setIsNewTaskOpen(true)}
          >
            Add New Task
          </button>
        </div>
        <div className="mb-6 flex justify-center">
          <label className="mr-4 font-medium text-gray-700">Filter by tag:</label>
          <select 
            className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedTag} 
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="All">All</option>
            {uniqueTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-6">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} />
            ))
          ) : (
            <p className="text-center text-gray-500">No tasks found.</p>
          )}
        </div>
      </div>

      <NewTask isOpen={isNewTaskOpen} onClose={() => setIsNewTaskOpen(false)} fetchAllTasks={fetchTasks} />
    </div>
  );
};

export default AllTasksPage;
