import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle, onRemove }) {
  if (!tasks || tasks.length === 0) {
    return <p className="empty">タスクがありません。新しいタスクを追加してください。</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </ul>
  );
}
