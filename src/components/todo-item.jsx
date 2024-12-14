import { useContext } from "react";
import { ToDoContext } from "../todo-context";

export const ToDoItem = ({ todo }) => {
  const { onUpdate, onDelete } = useContext(ToDoContext)

  return (
    <div
      className={`flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-md ${todo.completed ? "opacity-40" : ""
        } hover:bg-gray-200 dark:hover:bg-gray-700`}
    >
      <p className="text-lg font-medium">{todo.text}</p>
      <small>{todo.description}</small>
      <div className="flex space-x-2">
        <button
          className="px-4 py-2 w-24 text-sm font-semibold bg-indigo-500 text-white rounded-md shadow hover:bg-emerald-500"
          onClick={() => onUpdate(todo.id)}
        >
          {todo.completed ? "Cancel" : "Complete"}
        </button>
        <button
          className="px-4 py-2 w-24 text-sm font-semibold bg-indigo-400 text-white rounded-md shadow hover:bg-amber-500"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
