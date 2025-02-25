
import { Task } from '../typeDefs';
import { capitaliseWords } from '../utils';




const TaskCard = ({ task, onDelete }: { task: Task; onDelete: (id: string) => void }) => {
    return (
      <div className="border p-4 rounded-lg shadow-md">
        <h4 className="font-semibold">{task.text}</h4>
        <p className="text-sm text-gray-500">Due: {task.due.toLocaleString()}</p>
        <div className="flex gap-2 mt-2">
          {task.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-200 rounded text-xs">{capitaliseWords(tag)}</span>
          ))}
        </div>
        <button 
          className="mt-2 text-red-500 hover:underline" 
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    );
  };
  

export default TaskCard