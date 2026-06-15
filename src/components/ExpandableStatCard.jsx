import { useState } from "react";
import "./StatCard.css";
import "./ExpandableStatCard.css";

function ExpandableStatCard({ count, title, color, items = [], onItemClick }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={"stat-card exp-card" + (expanded ? " exp-card--open" : "")}>
      <button
        type="button"
        className="exp-card__header"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        {expanded ? (
          // Expanded: title collapses to a single line, regular font size.
          <span className="exp-card__header-line">
            {color && (
              <span className="exp-card__dot" style={{ background: color }} />
            )}
            <span className="exp-card__title-inline">{title}</span>
            <span className="exp-card__count-inline">{count}</span>
          </span>
        ) : (
          // Collapsed: same look as a StatCard.
          <>
            <span className="stat-card__count" style={color ? { color } : undefined}>
              {count}
            </span>
            <span className="stat-card__title">{title}</span>
          </>
        )}
      </button>

      {expanded && (
        <ul className="exp-card__list">
          {items.length === 0 ? (
            <li className="exp-card__empty">No items</li>
          ) : (
            items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="exp-card__item"
                  onClick={() => onItemClick?.(item)}
                >
                  {item.name}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default ExpandableStatCard;
