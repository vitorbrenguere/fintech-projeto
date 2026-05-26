import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './styles.css';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="error-screen">
      <div className="error-card">
        <img src={logo} alt="Fintech FIAP" className="error-logo" />
        <p className="error-code">404</p>
        <h1 className="error-title">Página não encontrada</h1>
        <p className="error-sub">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="error-actions">
          <button className="btn-error-primary" onClick={() => navigate('/dashboard')}>
            Ir para o Dashboard
          </button>
          <button className="btn-error-secondary" onClick={() => navigate('/')}>
            Voltar ao Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
