import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import api from '../../services/api';
import './styles.css';

const hoje = () => new Date().toISOString().split('T')[0];

const getMesAno = (raw) => {
  if (!raw) return null;
  if (Array.isArray(raw)) return `${raw[0]}-${String(raw[1]).padStart(2, '0')}`;
  return String(raw).substring(0, 7);
};

const formatData = (raw) => {
  if (!raw) return '';
  if (Array.isArray(raw))
    return new Date(raw[0], raw[1] - 1, raw[2]).toLocaleDateString('pt-BR');
  return raw;
};

const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function Receitas() {
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtroMes, setFiltroMes] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState(hoje());

  function carregar() {
    api.get('/receitas')
      .then((res) => { setReceitas(res.data); setLoading(false); })
      .catch(() => { setErro('Erro ao carregar receitas.'); setLoading(false); });
  }

  useEffect(() => { carregar(); }, []);

  function abrirNovo() {
    setEditItem(null);
    setDescricao('');
    setValor('');
    setData(hoje());
    setModalOpen(true);
  }

  function abrirEditar(item) {
    setEditItem(item);
    setDescricao(item.descricao || '');
    setValor(String(item.valor));
    if (Array.isArray(item.data)) {
      setData(`${item.data[0]}-${String(item.data[1]).padStart(2, '0')}-${String(item.data[2]).padStart(2, '0')}`);
    } else {
      setData(item.data || hoje());
    }
    setModalOpen(true);
  }

  function fechar() {
    setModalOpen(false);
    setEditItem(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { descricao, valor: parseFloat(valor), data };
    const req = editItem
      ? api.put(`/receitas/${editItem.id_Receita}`, payload)
      : api.post('/receitas', payload);
    req.then(() => { fechar(); carregar(); })
       .catch(() => alert('Erro ao salvar.'));
  }

  function handleDeletar(id) {
    if (window.confirm('Deseja excluir esta receita?')) {
      api.delete(`/receitas/${id}`)
        .then(() => carregar())
        .catch(() => alert('Erro ao deletar.'));
    }
  }

  const filtradas = filtroMes
    ? receitas.filter((r) => getMesAno(r.data) === filtroMes)
    : receitas;

  const total = filtradas.reduce((s, r) => s + r.valor, 0);

  if (loading) return <Layout><p className="loading-text">Carregando...</p></Layout>;
  if (erro)    return <Layout><p className="error-text">{erro}</p></Layout>;

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1 className="page-title">Receitas</h1>
          <p className="page-sub">
            Total: <strong className="value-positive">{fmt(total)}</strong>
          </p>
        </div>
        <button className="btn-add-trigger btn-add-desktop" onClick={abrirNovo}>
          + Nova Receita
        </button>
      </div>

      <div className="filter-bar">
        <label className="filter-label">Filtrar por mês:</label>
        <input
          type="month"
          className="filter-input"
          value={filtroMes}
          onChange={(e) => setFiltroMes(e.target.value)}
        />
        {filtroMes && (
          <button className="btn-clear-filter" onClick={() => setFiltroMes('')}>
            Limpar
          </button>
        )}
        {filtroMes && (
          <span className="filter-badge">
            {(() => {
              const [a, m] = filtroMes.split('-');
              return new Date(+a, +m - 1, 1).toLocaleDateString('pt-BR', {
                month: 'long', year: 'numeric',
              });
            })()}
          </span>
        )}
      </div>

      <div className="finance-card">
        <ul className="mock-list">
          {filtradas.length === 0 ? (
            <p className="empty-state">Nenhuma receita encontrada.</p>
          ) : (
            filtradas.map((r) => (
              <li className="mock-item" key={r.id_Receita}>
                <div className="item-main">
                  <span className="item-description">{r.descricao}</span>
                  <span className="item-date">{formatData(r.data)}</span>
                </div>
                <div className="item-info">
                  <span className="value-positive">{fmt(r.valor)}</span>
                  <button className="btn-edit" onClick={() => abrirEditar(r)}>✏</button>
                  <button className="btn-delete" onClick={() => handleDeletar(r.id_Receita)}>×</button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={fechar}
        title={editItem ? 'Editar Receita' : 'Nova Receita'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Descrição</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Salário"
              required
            />
          </div>
          <div className="form-group">
            <label>Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0,00"
              required
            />
          </div>
          <div className="form-group">
            <label>Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={fechar}>Cancelar</button>
            <button type="submit" className="btn-primary">
              {editItem ? 'Salvar Alterações' : 'Salvar'}
            </button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
}

export default Receitas;
