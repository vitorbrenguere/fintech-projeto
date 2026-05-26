import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Receitas from './pages/Receitas';
import Despesas from './pages/Despesas';
import Investimentos from './pages/Investimentos';
import Perfil from './pages/Perfil';
import Cadastro from './pages/Cadastro';
import ErrorPage from './pages/Error';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"              element={<Login />}        />
        <Route path="/cadastro"      element={<Cadastro />}     />
        <Route path="/dashboard"     element={<Dashboard />}    />
        <Route path="/receitas"      element={<Receitas />}     />
        <Route path="/despesas"      element={<Despesas />}     />
        <Route path="/investimentos" element={<Investimentos />}/>
        <Route path="/perfil"        element={<Perfil />}       />
        <Route path="*"              element={<ErrorPage />}    />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
