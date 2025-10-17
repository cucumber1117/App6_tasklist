import React, { useContext, useMemo, useState } from 'react';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import './Home.css';
import { TaskContext } from '../../context/TaskContext.jsx';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function Home() {
  const { tasks, toggleDone, removeTask, addTask } = useContext(TaskContext);
  const [selectedDate, setSelectedDate] = useState(todayISO());

  const tasksForDate = useMemo(() => tasks.filter((task) => task.date === selectedDate), [tasks, selectedDate]);

  const grouped = useMemo(() => {
    return tasksForDate.reduce((acc, t) => {
      const key = t.time || '';
      acc[key] = acc[key] || [];
      acc[key].push(t);
      return acc;
    }, {});
  }, [tasksForDate]);

  const timeKeys = useMemo(() => Object.keys(grouped).sort((a, b) => {
    if (a === '') return 1;
    if (b === '') return -1;
    return a.localeCompare(b);
  }), [grouped]);

  return (
    <div className="home">
      <h1 className="title">1日にすること</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
        <label style={{ alignSelf: 'center' }}>日付: </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <TaskForm onAdd={addTask} defaultDate={selectedDate} />

      {timeKeys.length === 0 ? (
        <p className="empty">タスクがありません。新しいタスクを追加してください。</p>
      ) : (
        timeKeys.map((k) => (
          <section key={k} style={{ marginBottom: 16 }}>
            <h3 style={{ margin: '8px 0' }}>{k === '' ? '時間未定' : k}</h3>
            <TaskList tasks={grouped[k]} onToggle={toggleDone} onRemove={removeTask} />
          </section>
        ))
      )}
    </div>
  );
}
