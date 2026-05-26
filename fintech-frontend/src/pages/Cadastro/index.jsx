import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { cadastrar, setLogado } from '../../services/auth';
import '../Login/styles.css';

function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome]                     = useState('');
  const [email, setEmail]                   = useState('');
  const [password, setPassword]             = useState('');
  const [confirmPassword, setConfirm]       = useState('');
  const [erro, setErro]                     = useState('');

  function handleCadastro(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErro('As senhas não conferem.');
      return;
    }
    if (password.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    const ok = cadastrar(nome.trim(), email, password);
    if (ok) {
      setLogado(email);
      navigate('/dashboard');
    } else {
      setErro('Este e-mail já está cadastrado.');
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-brand">
          <img src={logo} alt="Fintech FIAP" className="login-logo" />
          <p className="login-brand__subtitle">Crie sua conta</p>
        </div>

        <form onSubmit={handleCadastro}>
          <div className="input-block">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => { setNome(e.target.value); setErro(''); }}
              required
            />
          </div>
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
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErro(''); }}
              required
            />
          </div>
          <div className="input-block">
            <label>Confirmar senha</label>
            <input
              type="password"
              placeholder="Repita a senha"
              value={confirmPassword}
              onChange={(e) => { setConfirm(e.target.value); setErro(''); }}
              required
            />
          </div>

          {erro && <p className="login-erro">{erro}</p>}

          <button type="submit" className="btn-submit">Criar conta</button>

          <div className="login-divider">
            <span>Já tem uma conta?</span>
            <button type="button" className="btn-link-primary" onClick={() => navigate('/')}>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
