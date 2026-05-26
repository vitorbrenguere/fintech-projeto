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

function Investimentos() {
  const [investimentos, setInvestimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtroMes, setFiltroMes] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [categoria, setCategoria] = useState('');
  const [valor, setValor] = useState('');
  const [dataAplicacao, setDataAplicacao] = useState(hoje());

  function carregar() {
    api.get('/investimentos')
      .then((res) => { setInvestimentos(res.data); setLoading(false); })
      .catch(() => { setErro('Erro ao carregar investimentos.'); setLoading(false); });
  }

  useEffect(() => { carregar(); }, []);

  function abrirNovo() {
    setEditItem(null);
    setCategoria('');
    setValor('');
    setDataAplicacao(hoje());
    setModalOpen(true);
  }

  function abrirEditar(item) {
    setEditItem(item);
    setCategoria(item.categoriaInvestimento || '');
    setValor(String(item.valor));
    if (Array.isArray(item.dataAplicacao)) {
      setDataAplicacao(`${item.dataAplicacao[0]}-${String(item.dataAplicacao[1]).padStart(2, '0')}-${String(item.dataAplicacao[2]).padStart(2, '0')}`);
    } else {
      setDataAplicacao(item.dataAplicacao || hoje());
    }
    setModalOpen(true);
  }

  function fechar() {
    setModalOpen(false);
    setEditItem(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { categoriaInvestimento: categoria, valor: parseFloat(valor), dataAplicacao };
    const req = editItem
      ? api.put(`/investimentos/${editItem.id_Investimento}`, payload)
      : api.post('/investimentos', payload);
    req.then(() => { fechar(); carregar(); })
       .catch(() => alert('Erro ao salvar.'));
  }

  function handleDeletar(id) {
    if (window.confirm('Deseja excluir este investimento?')) {
      api.delete(`/investimentos/${id}`)
        .then(() => carregar())
        .catch(() => alert('Erro ao deletar.'));
    }
  }

  const filtrados = filtroMes
    ? investimentos.filter((i) => getMesAno(i.dataAplicacao) === filtroMes)
    : investimentos;

  const total = filtrados.reduce((s, i) => s + i.valor, 0);

  if (loading) return <Layout><p className="loading-text">Carregando...</p></Layout>;
  if (erro)    return <Layout><p className="error-text">{erro}</p></Layout>;

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1 className="page-title">Investimentos</h1>
          <p className="page-sub">
            Total: <strong className="value-neutral">{fmt(total)}</strong>
          </p>
        </div>
        <button className="btn-add-trigger btn-add-desktop" onClick={abrirNovo}>
          + Novo Investimento
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
          {filtrados.length === 0 ? (
            <p className="empty-state">Nenhum investimento encontrado.</p>
          ) : (
            filtrados.map((i) => (
              <li className="mock-item" key={i.id_Investimento}>
                <div className="item-main">
                  <span className="item-description">{i.categoriaInvestimento || 'Renda Fixa'}</span>
                  <span className="item-date">{formatData(i.dataAplicacao)}</span>
                </div>
                <div className="item-info">
                  <span className="value-neutral">{fmt(i.valor)}</span>
                  <button className="btn-edit" onClick={() => abrirEditar(i)}>✏</button>
                  <button className="btn-delete" onClick={() => handleDeletar(i.id_Investimento)}>×</button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={fechar}
        title={editItem ? 'Editar Investimento' : 'Novo Investimento'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Categoria</label>
            <input
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Ex: Tesouro Direto"
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
            <label>Data de Aplicação</label>
            <input
              type="date"
              value={dataAplicacao}
              onChange={(e) => setDataAplicacao(e.target.value)}
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

export default Investimentos;
