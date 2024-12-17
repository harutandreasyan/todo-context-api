import { useContext, useState } from "react";
import { ToDoContext } from "../todo-context";

export const ToDoItem = ({ todo }) => {
  const { onUpdate, onDelete, onAddSubtask, onUpdateSubtask, onDeleteSubtask } = useContext(ToDoContext)
  const [subtaskText, setSubtaskText] = useState("")
  const [showInput, setShowInput] = useState(false)

  const handleAddSubtask = () => {
    if (subtaskText.trim()) {
      onAddSubtask(todo.id, subtaskText)
      setSubtaskText("")
      setShowInput(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddSubtask()
    }
  }

  return (
    <div
      className={`p-4 rounded-lg shadow-md mb-4 ${
        todo.completed ? "opacity-50" : ""
      } bg-gray-100 dark:bg-gray-800`}
    >
      {/* Main Todo */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {todo.text}
          </p>
          <small className="text-gray-600 dark:text-gray-400">
            {todo.description}
          </small>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onUpdate(todo.id)}
            className="w-28 text-center bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            {todo.completed ? "Cancel" : "Complete"}
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="w-28 text-center bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Subtask Input */}
      <div className="mt-2">
        {!showInput && (
          <button
            onClick={() => setShowInput(true)}
            className="text-blue-500 hover:underline"
          >
            + Add Subtask
          </button>
        )}
        {showInput && (
          <div className="mt-2 flex space-x-2">
            <input
              value={subtaskText}
              onChange={(e) => setSubtaskText(e.target.value)}
              onKeyDown={handleKeyDown} 
              className="flex-1 border p-2 rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Add subtask..."
            />
            <button
              onClick={handleAddSubtask}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* Subtask List */}
      <ul className="mt-2 space-y-1">
        {todo.subtasks?.map((subtask) => (
          <li
            key={subtask.id}
            className="flex justify-between items-center pl-2 border-l-4 border-gray-400 dark:border-gray-500"
          >
            <span
              className={`${
                subtask.completed
                  ? "line-through text-gray-500 dark:text-gray-400"
                  : "text-gray-800 dark:text-gray-100"
              }`}
            >
              {subtask.text}
            </span>
            <div className="flex space-x-1">
              <button
                onClick={() => onUpdateSubtask(todo.id, subtask.id)}
                className="text-sm bg-blue-500 w-20 text-center px-3 py-1 text-white rounded hover:bg-blue-600"
              >
                {subtask.completed ? "Cancel" : "Complete"}
              </button>
              <button
                onClick={() => onDeleteSubtask(todo.id, subtask.id)}
                className="text-sm bg-red-500 w-20 text-center px-3 py-1 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
