import React, { useState } from 'react';

export default function TaskForm({ onAdd, defaultDate, autoFocus = false }) {
  const [value, setValue] = useState('');
  const [date, setDate] = useState(defaultDate || new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('');
  const titleRef = React.useRef(null);

  React.useEffect(() => {
    if (autoFocus && titleRef.current) titleRef.current.focus();
  }, [autoFocus]);

  const submit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed, date, time);
    setValue('');
    setTime('');
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
      <input
        ref={titleRef}
        aria-label="task-title"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="新しいタスクを入力"
        style={{ flex: 1, padding: '8px 12px', fontSize: 16 }}
      />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button type="submit" style={{ padding: '8px 12px' }}>追加</button>
    </form>
  );
}
