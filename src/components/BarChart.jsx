import "./BarChart.css";

// Fallback palette for any label without an explicit color.
const FALLBACK_COLORS = [
  "#2563eb",
  "#f59e0b",
  "#ef4444",
  "#10b981",
  "#8b5cf6",
  "#ec4899",
];

function BarChart({ data = [] }) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div className="bar-chart">
      {data.map((item, i) => {
        const color = item.color || FALLBACK_COLORS[i % FALLBACK_COLORS.length];
        const heightPct = (item.value / max) * 100;
        return (
          <div className="bar-chart__col" key={item.label}>
            <span className="bar-chart__value">{item.value}</span>
            <div className="bar-chart__track">
              <div
                className="bar-chart__bar"
                style={{ height: `${heightPct}%`, background: color }}
              />
            </div>
            <span className="bar-chart__label">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default BarChart;
