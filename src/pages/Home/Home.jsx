import React, { useContext, useMemo, useState } from 'react';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import './Home.css';
import { TaskContext } from '../../context/TaskContext.jsx';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function formatDateJapanese(dateStr) {
  const date = new Date(dateStr);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  const weekday = days[date.getDay()];
  return `${y}年${m}月${d}日（${weekday}曜日）`;
}

function getWeekDates(baseDate) {
  const d = new Date(baseDate);
  const day = d.getDay(); // 0(日)〜6(土)
  const diffToMonday = (day + 6) % 7; // 月曜スタート
  const monday = new Date(d);
  monday.setDate(d.getDate() - diffToMonday);

  // 月曜〜日曜の配列を生成
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date;
  });
}

export default function Home() {
  const { tasks, toggleDone, removeTask, addTask } = useContext(TaskContext);
  const [selectedDate, setSelectedDate] = useState(todayISO());

  const selectedWeek = useMemo(() => getWeekDates(selectedDate), [selectedDate]);

  const tasksForDate = useMemo(
    () => tasks.filter((task) => task.date === selectedDate),
    [tasks, selectedDate]
  );

  const grouped = useMemo(() => {
    return tasksForDate.reduce((acc, t) => {
      const key = t.time || '';
      acc[key] = acc[key] || [];
      acc[key].push(t);
      return acc;
    }, {});
  }, [tasksForDate]);

  const timeKeys = useMemo(
    () =>
      Object.keys(grouped).sort((a, b) => {
        if (a === '') return 1;
        if (b === '') return -1;
        return a.localeCompare(b);
      }),
    [grouped]
  );

  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  const month = new Date(selectedDate).getMonth() + 1;

  return (
    <div className="home">
      <header className="calendar-header">
        <button
          className="month-btn"
          onClick={() => {
            const d = new Date(selectedDate);
            d.setMonth(d.getMonth() - 1);
            setSelectedDate(d.toISOString().slice(0, 10));
          }}
        >
          ＜
        </button>
        <h2>{month}月</h2>
        <button
          className="month-btn"
          onClick={() => {
            const d = new Date(selectedDate);
            d.setMonth(d.getMonth() + 1);
            setSelectedDate(d.toISOString().slice(0, 10));
          }}
        >
          ＞
        </button>
      </header>

      <div className="weekday-bar">
        {selectedWeek.map((date, i) => {
          const dayNum = date.getDate();
          const days = ['月', '火', '水', '木', '金', '土', '日'];
          const label = days[i];
          const iso = date.toISOString().slice(0, 10);
          const isSelected = iso === selectedDate;
          return (
            <div
              key={i}
              className={`weekday-item ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedDate(iso)}
            >
              <div className="weekday-label">{label}</div>
              <div className="weekday-date">{dayNum}</div>
            </div>
          );
        })}
      </div>

      <div className="selected-date">{formatDateJapanese(selectedDate)}</div>

      <div className="time-list">
        {hours.map((h) => (
          <div key={h} className="time-row">
            <div className="time-label">{h}</div>
            <div className="task-cell">
              {grouped[h]?.length > 0 && (
                <TaskList
                  tasks={grouped[h]}
                  onToggle={toggleDone}
                  onRemove={removeTask}
                />
              )}
            </div>
          </div>
        ))}

        {timeKeys.length === 0 && (
          <p className="empty">タスクがありません。新しいタスクを追加してください。</p>
        )}
      </div>

      <TaskForm onAdd={addTask} defaultDate={selectedDate} />

      <footer className="footer">© 2025 MyTaskApp</footer>
    </div>
  );
}
