import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Layout from '../../components/Layout';
import SummaryCard from '../../components/SummaryCard';
import api from '../../services/api';
import { getLogado } from '../../services/auth';
import './styles.css';

const COLORS = {
  receitas:      '#00838f',
  despesas:      '#c92a2a',
  investimentos: '#3b5bdb',
};

const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function Dashboard() {
  const navigate = useNavigate();
  const nomeUsuario = getLogado()?.nome || 'Visitante';
  const [receitas, setReceitas] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [investimentos, setInvestimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get('/receitas'),
      api.get('/despesas'),
      api.get('/investimentos'),
    ])
      .then(([resR, resD, resI]) => {
        setReceitas(resR.data);
        setDespesas(resD.data);
        setInvestimentos(resI.data);
        setLoading(false);
      })
      .catch(() => {
        setErro('Não foi possível carregar os dados do servidor.');
        setLoading(false);
      });
  }, []);

  if (loading) return <Layout><p className="loading-text">Carregando...</p></Layout>;
  if (erro)    return <Layout><p className="error-text">{erro}</p></Layout>;

  const totalReceitas      = receitas.reduce((s, r) => s + r.valor, 0);
  const totalDespesas      = despesas.reduce((s, d) => s + d.valor, 0);
  const totalInvestimentos = investimentos.reduce((s, i) => s + i.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  const chartData = [
    { name: 'Receitas',      value: totalReceitas,      color: COLORS.receitas      },
    { name: 'Despesas',      value: totalDespesas,      color: COLORS.despesas      },
    { name: 'Investimentos', value: totalInvestimentos, color: COLORS.investimentos },
  ].filter((d) => d.value > 0);

  return (
    <Layout>
      <div className="dashboard-header-row">
        <div>
          <h1 className="dashboard-title">Olá, {nomeUsuario}!</h1>
          <p className="dashboard-subtitle">Resumo consolidado de todas as suas finanças</p>
        </div>
      </div>

      <div className="summary-grid">
        <SummaryCard label="Total Receitas"   value={totalReceitas}      colorClass="receitas"      />
        <SummaryCard label="Total Despesas"   value={totalDespesas}      colorClass="despesas"      />
        <SummaryCard label="Investimentos"    value={totalInvestimentos} colorClass="investimentos" />
        <SummaryCard label="Saldo Líquido"    value={saldo}              colorClass="saldo" isBalance />
      </div>

      <div className="overview-section">
        <div className="chart-card">
          <p className="card-title">Distribuição</p>
          {chartData.length === 0 ? (
            <p className="empty-state">Nenhum dado para exibir.</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={88}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => fmt(value)} />
                </PieChart>
              </ResponsiveContainer>
              <ul className="chart-legend">
                {chartData.map((entry) => (
                  <li key={entry.name} className="chart-legend-item">
                    <span className="chart-legend-dot" style={{ backgroundColor: entry.color }} />
                    <span className="chart-legend-name">{entry.name}</span>
                    <span className="chart-legend-value">{fmt(entry.value)}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="quick-links">
          <p className="card-title">Acesso Rápido</p>
          <button className="quick-link-card" onClick={() => navigate('/receitas')}>
            <span className="quick-link-dot" style={{ backgroundColor: COLORS.receitas }} />
            <div className="quick-link-info">
              <p className="quick-link-label">Receitas</p>
              <p className="quick-link-count">{receitas.length} registros</p>
            </div>
            <span className="quick-link-arrow">→</span>
          </button>
          <button className="quick-link-card" onClick={() => navigate('/despesas')}>
            <span className="quick-link-dot" style={{ backgroundColor: COLORS.despesas }} />
            <div className="quick-link-info">
              <p className="quick-link-label">Despesas</p>
              <p className="quick-link-count">{despesas.length} registros</p>
            </div>
            <span className="quick-link-arrow">→</span>
          </button>
          <button className="quick-link-card" onClick={() => navigate('/investimentos')}>
            <span className="quick-link-dot" style={{ backgroundColor: COLORS.investimentos }} />
            <div className="quick-link-info">
              <p className="quick-link-label">Investimentos</p>
              <p className="quick-link-count">{investimentos.length} registros</p>
            </div>
            <span className="quick-link-arrow">→</span>
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
