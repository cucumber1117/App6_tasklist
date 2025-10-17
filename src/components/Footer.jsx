import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="app-footer" role="contentinfo">
      <nav className="footer-nav" aria-label="footer navigation">
        <Link to="/" className="nav-item">ホーム</Link>
        <Link to="/create" className="nav-item">作成</Link>
        <Link to="/list" className="nav-item">一覧</Link>
        <Link to="/settings" className="nav-item">設定</Link>
      </nav>
    </footer>
  );
}
