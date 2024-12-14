import { useEffect, useState } from "react";
import { ToDoList } from "./components/todo-list";
import { ToDoContext } from "./todo-context";
import { ThemeSwitcher } from "./components/theme-switcher";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 101, text: "css task", description: "responsiveness", completed: false, category: "urgent" },
    { id: 102, text: "js task", description: "DOMworking", completed: true, category: "low" },
    { id: 103, text: "php task", description: "backend-server", completed: false, category: "medium" },
    { id: 104, text: "html task", description: "divs", completed: true, category: "high" }
  ])

  const [currentFilter, setCurrentFilter] = useState("all");
  const [filters, setFilters] = useState(["all", "active", "completed"]);

  useEffect(() => {
    const categories = [
      ...new Set(todos.map((todo) => todo.category).filter((category) => !!category)),
    ]
    setFilters(["all", "active", "completed", ...categories]);
  }, [todos])

  const handleUpdate = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const handleAdd = (todo) => {
    setTodos([...todos, { ...todo, completed: false, id: Date.now() }]);
    if (!filters.includes(todo.category)) {
      setFilters([...filters, todo.category])
    }
  }

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <ToDoContext.Provider value={{
        todos,
        onAdd: handleAdd,
        onUpdate: handleUpdate,
        onDelete: handleDelete,
        filters, currentFilter,
        onFilter: setCurrentFilter
      }}>
        <ThemeSwitcher />
        <ToDoList />
      </ToDoContext.Provider>
    </>
  )
}
