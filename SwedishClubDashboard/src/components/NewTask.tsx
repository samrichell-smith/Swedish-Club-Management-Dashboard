import { X } from "lucide-react";
import { useState } from "react";



interface NewTaskProps {
    isOpen: boolean
    onClose: () => void
    fetchAllTasks: () => void
}

const NewTask: React.FC<NewTaskProps> = ({isOpen, onClose, fetchAllTasks }) => {
    if (!isOpen) return null

    const [text, setText] = useState("")
    const [tags, setTags] = useState<string[]>([])
    const [due, setDue] = useState("")

    const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.currentTarget.value.trim()) {
            e.preventDefault()
            setTags([...tags, e.currentTarget.value.trim()])
            e.currentTarget.value = ""
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const taskData = {
            text, 
            tags, 
            due: new Date(due).toISOString(),
        }

        try {
            const response = await fetch("https://swedish-club-management-api.onrender.com/task/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(taskData),
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`)
            }

            console.log("New Task Created Successfully:", taskData)
            fetchAllTasks()
            onClose()
            
        } catch(error) {
            console.error("Failed to create task:", error)
        }

    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
          
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative">
            
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer">
              <X />
            </button>
    
            
            <h2 className="text-xl font-semibold mb-4">Create a New Task</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* Task Description */}
              <textarea
                placeholder="Task Description"
                className="border rounded-lg p-2"
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
    
              
              <div>
                <input
                  type="text"
                  placeholder="Press Enter to add tags"
                  className="border rounded-lg p-2 w-full"
                  onKeyDown={handleTagInput}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
    
              
              <input
                type="datetime-local"
                className="border rounded-lg p-2"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
    
              
              <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Create Task
              </button>
            </form>
          </div>
        </div>
      );
    ;
}

export default NewTask