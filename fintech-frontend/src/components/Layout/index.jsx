import { useState } from 'react';
import Sidebar from '../Sidebar';
import logo from '../../assets/logo.svg';
import './styles.css';

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main-content">
        <div className="topbar-mobile">
          <button className="btn-hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
          <img src={logo} alt="Fintech FIAP" className="topbar-logo" />
        </div>
        <div className="content-inner">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
