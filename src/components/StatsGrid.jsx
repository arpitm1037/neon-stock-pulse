const statsConfig = [
  { key: 'open', label: 'Open' },
  { key: 'dayHigh', label: 'Day High' },
  { key: 'dayLow', label: 'Day Low' },
];

const StatsGrid = ({ data }) => (
  <section className="stats">
    {statsConfig.map((item) => (
      <div key={item.key} className="stats__item">
        <p className="stats__label">{item.label}</p>
        <p className="stats__value">₹{data?.[item.key] ?? '--'}</p>
      </div>
    ))}
  </section>
);

export default StatsGrid;

