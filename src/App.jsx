import { useEffect, useState } from "react";
import { ToDoList } from "./components/todo-list";
import { ToDoContext } from "./todo-context";
import { ThemeSwitcher } from "./components/theme-switcher";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 101, text: "css task", description: "responsiveness", completed: false, category: "urgent", subtasks: [] },
    { id: 102, text: "js task", description: "DOMworking", completed: true, category: "low", subtasks: [] },
    { id: 103, text: "php task", description: "backend-server", completed: false, category: "medium", subtasks: [] },
    { id: 104, text: "html task", description: "divs", completed: true, category: "high", subtasks: [] }
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
    setTodos([...todos, { ...todo, completed: false, id: Date.now(), subtasks: [] }]);
    if (!filters.includes(todo.category)) {
      setFilters([...filters, todo.category])
    }
  }

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const handleAddSubtask = (id, subtaskText) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? {
            ...todo,
            subtasks: [
              ...todo.subtasks,
              { id: Date.now(), text: subtaskText, completed: false },
            ],
          }
        : todo
    ))
  }
  
  const handleUpdateSubtask = (todoId, subtaskId) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        const updatedSubtasks = todo.subtasks.map(subtask =>
          subtask.id === subtaskId
            ? { ...subtask, completed: !subtask.completed }
            : subtask
        )
        const allCompleted = updatedSubtasks.every(sub => sub.completed);
        return { ...todo, subtasks: updatedSubtasks, completed: allCompleted };
      }
      return todo;
    }))
  }
  
  const handleDeleteSubtask = (todoId, subtaskId) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        const updatedSubtasks = todo.subtasks.filter(subtask => subtask.id !== subtaskId);
        return { ...todo, subtasks: updatedSubtasks };
      }
      return todo;
    }))
  }

  return (
    <>
      <ToDoContext.Provider value={{
        todos,
        onAdd: handleAdd,
        onUpdate: handleUpdate,
        onDelete: handleDelete,
        filters, currentFilter,
        onFilter: setCurrentFilter,
        onAddSubtask: handleAddSubtask,
        onUpdateSubtask: handleUpdateSubtask,
        onDeleteSubtask: handleDeleteSubtask
      }}>
        <ThemeSwitcher />
        <ToDoList />
      </ToDoContext.Provider>
    </>
  )
}
