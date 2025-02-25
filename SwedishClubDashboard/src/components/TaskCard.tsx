import { Task } from '../typeDefs';
import { capitaliseWords } from '../utils';

const TaskCard = ({ task, onDelete }: { task: Task; onDelete: (id: string) => void }) => {
  return (
    <div className="border border-gray-300 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h4 className="text-xl font-semibold text-gray-800">{task.text}</h4>
      <p className="text-sm text-gray-600 mb-4">Due: {task.due.toLocaleString()}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {task.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {capitaliseWords(tag)}
          </span>
        ))}
      </div>
      <button 
        className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        onClick={() => onDelete(task.id)}
      >
        Done
      </button>
    </div>
  );
};

export default TaskCard;
