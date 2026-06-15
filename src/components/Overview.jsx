import { useEffect, useMemo, useState } from "react";
import StatCard from "./StatCard";
import BarChart from "./BarChart";
import ExpandableStatCard from "./ExpandableStatCard";
import { fetchDataStores, fetchFindings } from "../api/mockApi";

// Color hints for known sensitivity levels; unknown levels still render
// (BarChart falls back to its palette), so the set stays data-driven.
const SENSITIVITY_COLORS = {
  public: "#10b981",
  internal: "#2563eb",
  confidential: "#f59e0b",
  restricted: "#ef4444",
};

// Data store connection statuses to surface as expandable cards.
const STATUS_CARDS = [
  { status: "connected", label: "Connected", color: "#10b981" },
  { status: "stale", label: "Stale", color: "#f59e0b" },
  { status: "error", label: "Error", color: "#ef4444" },
];

function Overview({ onStatusClick }) {
  const [dataStores, setDataStores] = useState(null);
  const [findings, setFindings] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        // 1. Data stores -> card 1
        const stores = await fetchDataStores();
        if (cancelled) return;
        setDataStores(stores);

        // 2. Findings -> card 2
        const allFindings = await fetchFindings();
        if (cancelled) return;
        setFindings(allFindings);
      } catch (err) {
        if (!cancelled) setError(err);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Findings per sensitivity level — levels are derived from the data,
  // not a fixed list.
  const sensitivityData = useMemo(() => {
    if (!findings) return [];
    const counts = {};
    for (const f of findings) {
      counts[f.sensitivity] = (counts[f.sensitivity] || 0) + 1;
    }
    return Object.entries(counts).map(([label, value]) => ({
      label,
      value,
      color: SENSITIVITY_COLORS[label],
    }));
  }, [findings]);

  // Group data stores by connection status for the expandable cards.
  const storesByStatus = useMemo(() => {
    const groups = {};
    for (const ds of dataStores || []) {
      (groups[ds.status] ||= []).push(ds);
    }
    return groups;
  }, [dataStores]);

  // Records in "restricted" findings.
  const recordsAtRisk = useMemo(() => {
    if (!findings) return 0;
    return findings
      .filter((f) => f.sensitivity === "restricted")
      .reduce((sum, f) => sum + f.recordCount, 0);
  }, [findings]);

  if (error) {
    return <p className="overview__state">Failed to load dashboard data.</p>;
  }

  return (
    <>
      <div className="stat-cards">
        <StatCard
          count={dataStores ? dataStores.length : "…"}
          title="Data Stores"
        />
        <StatCard count={findings ? findings.length : "…"} title="Findings" />
        {findings && findings.length > 0 && (
          <StatCard
            count={recordsAtRisk.toLocaleString()}
            title="Records at Risk"
            alert
          />
        )}
      </div>

      {sensitivityData.length > 0 && (
        <section className="overview__section">
          <h2 className="overview__heading">Findings by sensitivity</h2>
          <BarChart data={sensitivityData} />
        </section>
      )}

      {dataStores && (
        <section className="overview__section">
          <h2 className="overview__heading">Connection status</h2>
          <div className="stat-cards">
            {STATUS_CARDS.map(({ status, label, color }) => (
              <ExpandableStatCard
                key={status}
                title={label}
                color={color}
                count={(storesByStatus[status] || []).length}
                items={storesByStatus[status] || []}
                onItemClick={() => onStatusClick?.(status)}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default Overview;
