import './styles.css';

const fmt = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function SummaryCard({ label, value, colorClass, isBalance }) {
  const valueClass = isBalance
    ? `summary-card__value ${value >= 0 ? 'positive' : 'negative'}`
    : 'summary-card__value';

  return (
    <div className={`summary-card ${colorClass}`}>
      <p className="summary-card__label">{label}</p>
      <p className={valueClass}>{fmt(value)}</p>
    </div>
  );
}

export default SummaryCard;
