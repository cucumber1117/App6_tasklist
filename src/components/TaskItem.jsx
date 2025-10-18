import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext.jsx';

export default function TaskItem({ task, onToggle, onRemove }) {
  const { updateTask } = useContext(TaskContext);
  const [editing, setEditing] = useState(false);
  const [date, setDate] = useState(task.date || new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(task.time || '');

  const save = () => {
    updateTask(task.id, { date, time });
    setEditing(false);
  };

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '8px 12px',
        borderBottom: '1px solid #eee',
      }}
    >
      <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{ textDecoration: task.done ? 'line-through' : 'none' }}>{task.title}</div>
          {!editing && task.time ? <small style={{ color: '#666' }}>{task.time}</small> : null}
        </div>
        {editing ? (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            <button onClick={save} style={{ padding: '6px 8px' }}>保存</button>
            <button onClick={() => setEditing(false)} style={{ padding: '6px 8px' }}>キャンセル</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setEditing(true)} style={{ padding: '6px 8px' }}>移動</button>
          </div>
        )}
      </div>
      <button onClick={() => onRemove(task.id)} style={{ background: 'transparent', border: 'none', color: '#c00' }} aria-label="remove">削除</button>
    </li>
  );
}
