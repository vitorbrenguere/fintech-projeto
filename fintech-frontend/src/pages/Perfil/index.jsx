import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { getLogado, updateNome, logout } from '../../services/auth';
import './styles.css';

function Perfil() {
  const navigate  = useNavigate();
  const user      = getLogado();

  const [nome, setNome]   = useState(user?.nome || '');
  const [salvo, setSalvo] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    updateNome(user.email, nome.trim() || 'Visitante');
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2000);
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  const inicial = (nome.trim() || 'V')[0].toUpperCase();

  return (
    <Layout>
      <div className="perfil-wrapper">
        <div className="perfil-card">
          <div className="perfil-avatar">{inicial}</div>

          <div className="perfil-heading">
            <h1 className="perfil-title">Perfil</h1>
            <p className="perfil-sub">{user?.email}</p>
          </div>

          <form onSubmit={handleSubmit} className="perfil-form">
            <div className="perfil-field">
              <label>Nome de exibição</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Visitante"
                maxLength={40}
              />
              <span className="perfil-hint">
                Aparece no Dashboard como "Olá, {nome.trim() || 'Visitante'}!"
              </span>
            </div>

            <button type="submit" className={`btn-save${salvo ? ' saved' : ''}`}>
              {salvo ? '✓ Salvo com sucesso!' : 'Salvar'}
            </button>
          </form>

          <button className="btn-logout" onClick={handleLogout}>
            Sair da conta
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Perfil;
