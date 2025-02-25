import { Task } from '../typeDefs';
import { capitaliseWords } from '../utils';

const TaskCard = ({ task, onDelete }: { task: Task; onDelete: (id: string) => void }) => {
  return (
    <div className="border border-gray-300 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-101">
      <h4 className="text-2xl font-semibold text-gray-800 mb-1">{task.text}</h4>
      <p className="text-md text-gray-600 mb-4">Due: {task.due.toLocaleString()}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {task.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-[#ffc720] text-gray-800 rounded-full text-sm font-medium">
            {capitaliseWords(tag)}
          </span>
        ))}
      </div>
      <button 
        className="w-1/8 py-2 bg-[#005cbf] text-white rounded hover:bg-[#004a9f] transition-colors cursor-pointer"
        onClick={() => onDelete(task.id)}
      >
        Done
      </button>
    </div>
  );
};

export default TaskCard;
