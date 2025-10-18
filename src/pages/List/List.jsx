import React, { useContext, useMemo, useState } from 'react';
import './List.css';
import { TaskContext } from '../../context/TaskContext.jsx';
import TaskList from '../../components/TaskList';

function startOfMonth(date) {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0,0,0,0);
  return d;
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export default function List() {
  const { tasks } = useContext(TaskContext);
  const [active, setActive] = useState(new Date().toISOString().slice(0,10));

  const today = new Date();
  const monthStart = startOfMonth(today);
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  const days = daysInMonth(year, month);

  const weeks = useMemo(() => {
    const arr = [];
    const firstDay = new Date(year, month, 1).getDay();
    let week = new Array(firstDay).fill(null);
    for (let d = 1; d <= days; d++) {
      week.push(d);
      if (week.length === 7) {
        arr.push(week);
        week = [];
      }
    }
    if (week.length) arr.push(week.concat(new Array(7-week.length).fill(null)));
    return arr;
  }, [year, month, days]);

  const tasksForActive = useMemo(() => tasks.filter((t) => t.date === active), [tasks, active]);

  return (
    <div className="page page-list">
      <h2>カレンダー</h2>

      <div className="calendar">
        <div className="calendar-weekdays">
          {['日','月','火','水','木','金','土'].map((d) => <div key={d} className="cw">{d}</div>)}
        </div>
        <div className="calendar-grid">
          {weeks.map((week, i) => (
            <div key={i} className="calendar-row">
              {week.map((d, j) => {
                if (!d) return <div key={j} className="calendar-cell empty" />;
                const iso = new Date(year, month, d).toISOString().slice(0,10);
                return (
                  <button key={j} className={`calendar-cell ${iso===active? 'active':''}`} onClick={() => setActive(iso)}>
                    <div className="date-number">{d}</div>
                    <div className="mini-count">{tasks.filter((t)=>t.date===iso).length}</div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <h3 style={{ marginTop: 18 }}>選択日: {active}</h3>
      <TaskList tasks={tasksForActive} onToggle={() => {}} onRemove={() => {}} />
    </div>
  );
}
