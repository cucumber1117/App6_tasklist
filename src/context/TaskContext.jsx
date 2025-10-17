import React, { createContext, useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'app6:tasks';

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const normalized = parsed.map((task) => ({ ...task, date: task.date || new Date().toISOString().slice(0, 10), time: task.time || '' }));
        setTasks(normalized);
      }
    } catch (e) {
      console.error('load tasks', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('save tasks', e);
    }
  }, [tasks]);

  const addTask = useCallback((title, date, time) => {
    const newTask = { id: Date.now(), title, done: false, date: date || new Date().toISOString().slice(0, 10), time: time || '' };
    setTasks((t) => [newTask, ...t]);
  }, []);

  const toggleDone = useCallback((id) => {
    setTasks((t) => t.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  }, []);

  const removeTask = useCallback((id) => {
    setTasks((t) => t.filter((task) => task.id !== id));
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleDone, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
}
