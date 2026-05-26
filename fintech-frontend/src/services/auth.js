const USERS_KEY  = 'fintech_users';
const LOGADO_KEY = 'fintech_logado';

const DEFAULT_USERS = [
  { nome: 'Visitante', email: 'usuario@fintech.com', password: '123456' },
];

export function getUsers() {
  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }
  return JSON.parse(stored);
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function login(email, password) {
  return getUsers().find(u => u.email === email && u.password === password) || null;
}

export function cadastrar(nome, email, password) {
  const users = getUsers();
  if (users.find(u => u.email === email)) return false;
  users.push({ nome, email, password });
  saveUsers(users);
  return true;
}

export function setLogado(email) {
  localStorage.setItem(LOGADO_KEY, email);
}

export function getLogado() {
  const email = localStorage.getItem(LOGADO_KEY);
  if (!email) return null;
  return getUsers().find(u => u.email === email) || null;
}

export function logout() {
  localStorage.removeItem(LOGADO_KEY);
}

export function updateNome(email, novoNome) {
  const users = getUsers();
  const idx = users.findIndex(u => u.email === email);
  if (idx >= 0) {
    users[idx].nome = novoNome;
    saveUsers(users);
  }
}

export function getPasswordByEmail(email) {
  const user = getUsers().find(u => u.email === email);
  return user ? user.password : null;
}
