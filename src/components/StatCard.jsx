import "./StatCard.css";

function StatCard({ count, title, alert = false }) {
  return (
    <div className={"stat-card" + (alert ? " stat-card--alert" : "")}>
      <span className="stat-card__count">{count}</span>
      <span className="stat-card__title">{title}</span>
    </div>
  );
}

export default StatCard;
