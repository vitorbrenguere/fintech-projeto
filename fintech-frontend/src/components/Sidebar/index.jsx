import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { logout } from '../../services/auth';

const navItems = [
  { path: '/dashboard',     label: 'Visão Geral',   dot: 'dashboard'     },
  { path: '/receitas',      label: 'Receitas',      dot: 'receitas'      },
  { path: '/despesas',      label: 'Despesas',      dot: 'despesas'      },
  { path: '/investimentos', label: 'Investimentos', dot: 'investimentos' },
  { path: '/perfil',        label: 'Perfil',        dot: 'perfil'        },
];

function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  function goTo(path) {
    navigate(path);
    onClose();
  }

  return (
    <aside className={`sidebar${open ? ' sidebar-open' : ''}`}>
      <div className="sidebar-logo-wrap">
        <img src={logo} alt="Fintech FIAP" className="sidebar-logo" />
      </div>
      <nav className="sidebar-nav">
        {navItems.map(({ path, label, dot }) => (
          <button
            key={path}
            className={`sidebar-nav-item${location.pathname === path ? ' active' : ''}`}
            onClick={() => goTo(path)}
          >
            <span className={`sidebar-nav-dot sidebar-nav-dot--${dot}`} />
            {label}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="sidebar-nav-item" onClick={() => { logout(); goTo('/'); }}>
          <span className="sidebar-nav-dot" style={{ background: '#adb5bd' }} />
          Sair
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
