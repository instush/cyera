import { useEffect, useState } from "react";
import { fetchDataStores, fetchFindings } from "../api/mockApi";
import { useDebounce } from "../hooks/useDebounce";
import { relativeTime } from "../utils/time";
import "./DataStores.css";

const TYPE_OPTIONS = ["database", "object-storage", "data-warehouse", "saas"];
const STATUS_OPTIONS = ["connected", "stale", "error"];

const STATUS_COLORS = {
  connected: "#10b981",
  stale: "#f59e0b",
  error: "#ef4444",
};

function DataStores({ statusFilter, onOpenStore }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState(statusFilter || "");
  const [stores, setStores] = useState(null);
  const [findingCounts, setFindingCounts] = useState({});

  const debouncedSearch = useDebounce(search, 300);

  // Sync the status filter when the incoming URL param changes (e.g. arriving
  // from the Overview status cards or via back/forward). Adjusting state during
  // render is the recommended pattern over an effect.
  const [prevStatusFilter, setPrevStatusFilter] = useState(statusFilter);
  if (statusFilter !== prevStatusFilter) {
    setPrevStatusFilter(statusFilter);
    setStatus(statusFilter || "");
  }

  // Findings count per data store (fetched once).
  useEffect(() => {
    let cancelled = false;
    fetchFindings().then((findings) => {
      if (cancelled) return;
      const counts = {};
      for (const f of findings) {
        counts[f.dataStoreId] = (counts[f.dataStoreId] || 0) + 1;
      }
      setFindingCounts(counts);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Data stores, re-fetched whenever search/filters change.
  useEffect(() => {
    let cancelled = false;
    fetchDataStores({
      search: debouncedSearch || undefined,
      type: type || undefined,
      status: status || undefined,
    }).then((res) => {
      if (!cancelled) setStores(res);
    });
    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, type, status]);

  return (
    <div className="ds">
      <div className="ds__main">
        <input
          type="search"
          className="ds__search"
          placeholder="Search by name, owner, or tag…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {stores === null ? (
          <p className="overview__state">Loading…</p>
        ) : stores.length === 0 ? (
          <p className="overview__state">No data stores match your filters.</p>
        ) : (
          <table className="ds-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Platform</th>
                <th>Region</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Last scanned</th>
                <th className="ds-table__num">Findings</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((ds) => (
                <tr
                  key={ds.id}
                  className="ds-table__row"
                  onClick={() => onOpenStore?.(ds.id)}
                >
                  <td className="ds-table__name">{ds.name}</td>
                  <td>{ds.type}</td>
                  <td>{ds.platform}</td>
                  <td>{ds.region}</td>
                  <td>{ds.owner}</td>
                  <td>
                    <span className="ds-status">
                      <span
                        className="ds-status__dot"
                        style={{ background: STATUS_COLORS[ds.status] }}
                      />
                      {ds.status}
                    </span>
                  </td>
                  <td>{relativeTime(ds.lastScanned)}</td>
                  <td className="ds-table__num">{findingCounts[ds.id] || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Right vertical filter bar */}
      <aside className="ds__filters">
        <FilterGroup
          title="Type"
          options={TYPE_OPTIONS}
          value={type}
          onChange={setType}
        />
        <FilterGroup
          title="Status"
          options={STATUS_OPTIONS}
          value={status}
          onChange={setStatus}
        />
      </aside>
    </div>
  );
}

function FilterGroup({ title, options, value, onChange }) {
  return (
    <div className="ds-filter">
      <h3 className="ds-filter__title">{title}</h3>
      <button
        type="button"
        className={"ds-filter__opt" + (value === "" ? " ds-filter__opt--active" : "")}
        onClick={() => onChange("")}
      >
        All
      </button>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={
            "ds-filter__opt" + (value === opt ? " ds-filter__opt--active" : "")
          }
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default DataStores;
