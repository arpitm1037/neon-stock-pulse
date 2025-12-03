import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const PriceChart = ({ data = [] }) => (
  <div className="chart">
    <h3>Last 30 days</h3>
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <XAxis dataKey="date" tick={{ fill: '#8ef9ff', fontSize: 12 }} />
        <YAxis
          domain={['auto', 'auto']}
          tick={{ fill: '#8ef9ff', fontSize: 12 }}
          tickFormatter={(value) => `₹${value}`}
        />
        <Tooltip
          contentStyle={{
            background: '#0f172a',
            border: '1px solid #22d3ee',
            borderRadius: '12px',
          }}
          labelStyle={{ color: '#8ef9ff' }}
          formatter={(value) => [`₹${value}`, 'Price']}
        />
        <Line
          dataKey="price"
          stroke="#22d3ee"
          strokeWidth={3}
          dot={false}
          type="monotone"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default PriceChart;

