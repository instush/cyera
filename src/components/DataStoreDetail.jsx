import { useEffect, useState } from "react";
import {
  fetchActivityLog,
  fetchDataStoreById,
  fetchFindings,
  updateFindingSensitivity,
} from "../api/mockApi";
import { relativeTime } from "../utils/time";
import "./DataStoreDetail.css";

const SENSITIVITY_LEVELS = ["public", "internal", "confidential", "restricted"];

const SENSITIVITY_COLORS = {
  public: "#10b981",
  internal: "#2563eb",
  confidential: "#f59e0b",
  restricted: "#ef4444",
};

const STATUS_COLORS = {
  connected: "#10b981",
  stale: "#f59e0b",
  error: "#ef4444",
};

function DataStoreDetail({ storeId, onLoaded }) {
  const [store, setStore] = useState(null);
  const [findings, setFindings] = useState(null);
  const [error, setError] = useState(null);
  const [logOpen, setLogOpen] = useState(false);
  const [log, setLog] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchDataStoreById(storeId), fetchFindings({ dataStoreId: storeId })])
      .then(([ds, fs]) => {
        if (cancelled) return;
        setStore(ds);
        setFindings(fs);
        setError(null);
        setLog(null);
        setLogOpen(false);
        onLoaded?.(ds);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      });
    return () => {
      cancelled = true;
    };
  }, [storeId, onLoaded]);

  // Optimistically update a finding's sensitivity, then persist via the API.
  async function changeSensitivity(findingId, newSensitivity) {
    const prev = findings;
    setFindings((curr) =>
      curr.map((f) =>
        f.id === findingId
          ? { ...f, sensitivity: newSensitivity, overridden: true }
          : f
      )
    );
    try {
      const updated = await updateFindingSensitivity(findingId, newSensitivity);
      setFindings((curr) =>
        curr.map((f) => (f.id === findingId ? updated : f))
      );
    } catch {
      // Revert on failure.
      setFindings(prev);
    }
  }

  // Toggle the activity log, lazily fetching it the first time it opens.
  function toggleLog() {
    setLogOpen((open) => !open);
    if (log === null) {
      fetchActivityLog(storeId).then((entries) => setLog(entries));
    }
  }

  if (error) return <p className="overview__state">Data store not found.</p>;
  if (!store) return <p className="overview__state">Loading…</p>;

  return (
    <div className="dsd">
      {/* Top bar: title + status on the left, Activity log toggle on the right */}
      <div className="dsd__top">
        <h2 className="dsd__name">{store.name}</h2>
        <span className="dsd__status">
          <span
            className="dsd__status-dot"
            style={{ background: STATUS_COLORS[store.status] }}
          />
          {store.status}
        </span>
        <button
          type="button"
          className="dsd__log-toggle"
          onClick={toggleLog}
          aria-expanded={logOpen}
        >
          <span className={"dsd__chevron" + (logOpen ? " dsd__chevron--open" : "")}>
            ▸
          </span>
          Activity log
        </button>
      </div>

      {/* Collapsible activity log — expands above the data store details */}
      {logOpen && (
        <div className="dsd-log">
          {log === null ? (
            <p className="dsd-log__state">Loading activity…</p>
          ) : log.length === 0 ? (
            <p className="dsd-log__state">No activity recorded.</p>
          ) : (
            <ul className="dsd-log__list">
              {log.map((entry) => (
                <li key={entry.id} className="dsd-log__item">
                  <div className="dsd-log__head">
                    <span className="dsd-log__action">
                      {entry.action.replace(/_/g, " ")}
                    </span>
                    <span className="dsd-log__time">
                      {relativeTime(entry.timestamp)}
                    </span>
                  </div>
                  <p className="dsd-log__details">{entry.details}</p>
                  <span className="dsd-log__user">{entry.user}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Header */}
      <header className="dsd__header">
        <dl className="dsd__meta">
          <div>
            <dt>Type</dt>
            <dd>{store.type}</dd>
          </div>
          <div>
            <dt>Platform</dt>
            <dd>{store.platform}</dd>
          </div>
          <div>
            <dt>Owner</dt>
            <dd>{store.owner}</dd>
          </div>
        </dl>
        <div className="dsd__tags">
          {store.tags.map((tag) => (
            <span key={tag} className="dsd__tag">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Findings table */}
      <h3 className="overview__heading dsd__findings-heading">
        Findings ({findings ? findings.length : 0})
      </h3>
      {findings && findings.length === 0 ? (
        <p className="overview__state">No findings for this data store.</p>
      ) : (
        <table className="dsd-table">
          <thead>
            <tr>
              <th>Table</th>
              <th>Column</th>
              <th>Data class</th>
              <th>Sensitivity</th>
              <th className="dsd-table__num">Records</th>
              <th>Auto-classified</th>
              <th>Overridden</th>
            </tr>
          </thead>
          <tbody>
            {(findings || []).map((f) => (
              <tr key={f.id}>
                <td className="dsd-table__mono">{f.table}</td>
                <td className="dsd-table__mono">{f.column}</td>
                <td>{f.dataClass}</td>
                <td>
                  <select
                    className="dsd-sensitivity dsd-sensitivity--select"
                    value={f.sensitivity}
                    onChange={(e) => changeSensitivity(f.id, e.target.value)}
                    style={{
                      color: SENSITIVITY_COLORS[f.sensitivity],
                      background: `${SENSITIVITY_COLORS[f.sensitivity]}1a`,
                    }}
                  >
                    {SENSITIVITY_LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="dsd-table__num">{f.recordCount.toLocaleString()}</td>
                <td>{f.autoClassified ? "Yes" : "No"}</td>
                <td>{f.overridden ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DataStoreDetail;
