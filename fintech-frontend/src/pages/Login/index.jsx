import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { login, setLogado, getPasswordByEmail } from '../../services/auth';
import './styles.css';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro]         = useState('');

  const [telaEsqueci, setTelaEsqueci]         = useState(false);
  const [emailEsqueci, setEmailEsqueci]       = useState('');
  const [senhaRecuperada, setSenhaRecuperada] = useState('');
  const [erroEsqueci, setErroEsqueci]         = useState('');

  function handleLogin(e) {
    e.preventDefault();
    const user = login(email, password);
    if (user) {
      setLogado(email);
      navigate('/dashboard');
    } else {
      setErro('E-mail ou senha incorretos.');
    }
  }

  function handleEsqueci(e) {
    e.preventDefault();
    const senha = getPasswordByEmail(emailEsqueci);
    if (senha) {
      setSenhaRecuperada(senha);
      setErroEsqueci('');
    } else {
      setErroEsqueci('E-mail não encontrado.');
      setSenhaRecuperada('');
    }
  }

  function voltarLogin() {
    setTelaEsqueci(false);
    setSenhaRecuperada('');
    setErroEsqueci('');
    setEmailEsqueci('');
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-brand">
          <img src={logo} alt="Fintech FIAP" className="login-logo" />
          <p className="login-brand__subtitle">Gestão financeira integrada</p>
        </div>

        {!telaEsqueci ? (
          <form onSubmit={handleLogin}>
            <div className="input-block">
              <label>E-mail</label>
              <input
                type="email"
                placeholder="nome@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErro(''); }}
                required
              />
            </div>
            <div className="input-block">
              <label>Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErro(''); }}
                required
              />
            </div>

            {erro && <p className="login-erro">{erro}</p>}

            <button type="submit" className="btn-submit">Entrar</button>

            <button type="button" className="btn-link" onClick={() => setTelaEsqueci(true)}>
              Esqueci minha senha
            </button>

            <div className="login-divider">
              <span>Não tem uma conta?</span>
              <button type="button" className="btn-link-primary" onClick={() => navigate('/cadastro')}>
                Criar conta
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleEsqueci}>
            <p className="esqueci-info">
              Informe seu e-mail e mostraremos a senha cadastrada.
            </p>
            <div className="input-block">
              <label>E-mail</label>
              <input
                type="email"
                placeholder="nome@email.com"
                value={emailEsqueci}
                onChange={(e) => { setEmailEsqueci(e.target.value); setSenhaRecuperada(''); setErroEsqueci(''); }}
                required
              />
            </div>

            {erroEsqueci && <p className="login-erro">{erroEsqueci}</p>}

            {senhaRecuperada && (
              <div className="senha-recuperada">
                <span>Sua senha:</span>
                <strong>{senhaRecuperada}</strong>
              </div>
            )}

            <button type="submit" className="btn-submit">Recuperar senha</button>
            <button type="button" className="btn-link" onClick={voltarLogin}>
              Voltar ao login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
