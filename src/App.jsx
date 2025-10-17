import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import List from './pages/List/List.jsx';
import Settings from './pages/Settings/Settings.jsx';
import Create from './pages/Create/Create.jsx';
import Footer from './components/Footer.jsx';
import './components/Footer.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
  <Route path="/list" element={<List />} />
  <Route path="/create" element={<Create />} />
  <Route path="/settings" element={<Settings />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;