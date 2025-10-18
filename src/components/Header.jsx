import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../assets/image/icon.png';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="app-icon" onClick={() => navigate('/about')} aria-label="アプリ情報">
          <img src={logo} alt="app icon" />
        </button>
        <div className="app-title">タスク管理</div>
      </div>
    </header>
  );
}
