import { useContext } from "react";
import { ToDoContext } from "../todo-context";

export const ToDoFilter = () => {
  const { filters, currentFilter, onFilter } = useContext(ToDoContext);

  const staticFilters = ["all", "active", "completed"]
  const dynamicFilters = filters.filter((filter) => !staticFilters.includes(filter))

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
      <div className="flex justify-center gap-4 mb-4">
        {staticFilters.map((filter) => (
          <label
            key={filter}
            className="flex items-center space-x-2 text-gray-800 dark:text-gray-300"
          >
            <input
              value={filter}
              name="filter"
              type="radio"
              checked={filter === currentFilter}
              onChange={(e) => onFilter(e.target.value)}
              className="text-emerald-400 focus:ring-emerald-400 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800"
            />
            <span>{filter}</span>
          </label>
        ))}
      </div>

      {dynamicFilters.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4">
          {dynamicFilters.map((filter) => (
            <label
              key={filter}
              className="flex items-center space-x-2 text-gray-800 dark:text-gray-300"
            >
              <input
                value={filter}
                name="filter"
                type="radio"
                checked={filter === currentFilter}
                onChange={(e) => onFilter(e.target.value)}
                className="text-emerald-400 focus:ring-emerald-400 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800"
              />
              <span>{filter}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
