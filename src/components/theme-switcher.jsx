import { useState, useEffect } from "react";

export const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev)

  return (
    <div className="flex justify-center p-4">
      <button
        onClick={toggleTheme}
        className="px-4 py-2 font-semibold text-white bg-indigo-500 rounded-lg shadow hover:bg-indigo-400"
      >
        Switch to {isDark ? "Light" : "Dark"} Mode
      </button>
    </div>
  )
}
