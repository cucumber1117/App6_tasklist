import React from 'react';

export default function TaskItem({ task, onToggle, onRemove }) {
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
        <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>{task.title}</span>
        {task.time ? <small style={{ color: '#666' }}>{task.time}</small> : null}
      </div>
      <button onClick={() => onRemove(task.id)} style={{ background: 'transparent', border: 'none', color: '#c00' }} aria-label="remove">削除</button>
    </li>
  );
}
