const StockChip = ({ label, onClick }) => (
  <button className="chip" onClick={() => onClick(label)}>
    {label}
  </button>
);

export default StockChip;

