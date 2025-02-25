
interface NewTaskProps {
    isOpen: boolean
    onClose: () => void
}

const NewTask: React.FC<NewTaskProps> = ({isOpen, onClose }) => {
    if (!isOpen) return null



    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
          {/* Modal Container */}
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative">
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
               
            </button>
    
            {/* Modal Content */}
            <h2 className="text-xl font-semibold mb-4">Create a New Task</h2>
            <form className="flex flex-col gap-4">
              <input type="text" placeholder="Task Title" className="border rounded-lg p-2" />
              <textarea placeholder="Task Description" className="border rounded-lg p-2" rows={3}></textarea>
              <input type="date" className="border rounded-lg p-2" />
              <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Add Task
              </button>
            </form>
          </div>
        </div>
      );
    ;
}

export default NewTask