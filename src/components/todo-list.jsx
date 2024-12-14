import { List } from "./list"
import { ToDoAdd } from "./todo-add"
import { ToDoFilter } from "./todo-filter"

export const ToDoList = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 space-y-6">
        <div>
          <ToDoAdd />
          <ToDoFilter />
        </div>
        <div>
          <List />
        </div>
      </div>
    </div>

  )
}

