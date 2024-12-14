import { useContext } from "react";
import { ToDoContext } from "../todo-context";
import { useForm } from "react-hook-form";

export const ToDoAdd = () => {
  const { onAdd } = useContext(ToDoContext)
  const { register, reset, handleSubmit, formState: { errors } } = useForm()
  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
      <h1 className="text-2xl font-bold mb-4">Add To Do</h1>
      <form onSubmit={handleSubmit(onAdd)} className="space-y-4">

        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300 mb-1">Text</label>
          {errors.text && <p className="text-red-500 p-2">{errors.text.message}</p>}
          <input
            {...register('text', { required: 'Please fill text' })}
            type="text"
            className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-lg border border-gray-400 dark:border-gray-600 focus:ring-indigo-400 focus:outline-none" />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300 mb-1">Description</label>          <input
            {...register('description')}
            type="text"
            className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-lg border border-gray-400 dark:border-gray-600 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-400 mb-1">Category</label>
          <select
            {...register("category", { required: "Please select a category" })}
            className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-lg border border-gray-400 dark:border-gray-600 focus:ring-emerald-400 focus:outline-none"          >
            <option value="">Select Category</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button className="w-full px-4 py-2 text-lg font-semibold text-white bg-indigo-800 rounded-lg hover:bg-indigo-500">
          Save
        </button>
      </form>
    </div>
  )
}
