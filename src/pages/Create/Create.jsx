import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../../components/TaskForm';
import { TaskContext } from '../../context/TaskContext.jsx';

export default function Create() {
  const { addTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const handleAdd = (title, date, time) => {
    addTask(title, date, time);
    // navigate back to home to show the added task
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 720, margin: '48px auto', padding: 24 }}>
      <h2>作成</h2>
      <p>ここからタスクを作成できます。</p>
      <TaskForm onAdd={handleAdd} autoFocus defaultDate={new Date().toISOString().slice(0,10)} />
    </div>
  );
}
