import { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import { Task } from '../typeDefs';

const AllTasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('All');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT/tasks');
        const data: Task[] = await response.json();
        const sortedTasks = data.sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime());
        setTasks(sortedTasks);
        setFilteredTasks(sortedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`YOUR_API_ENDPOINT/tasks/${id}`, { method: 'DELETE' });
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks.filter(task => selectedTag === 'All' || task.tags.includes(selectedTag)));
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
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">All Tasks</h2>
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by tag:</label>
        <select 
          className="border p-2 rounded"
          value={selectedTag} 
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="All">All</option>
          {uniqueTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} onDelete={handleDelete} />
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default AllTasksPage;
