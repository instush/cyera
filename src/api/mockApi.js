import { DATA_STORES, FINDINGS, ACTIVITY_LOG } from "../data/mockData";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = () => delay(200 + Math.random() * 600);

export async function fetchDataStores({ search, type, status } = {}) {
  await randomDelay();
  let results = [...DATA_STORES];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (ds) =>
        ds.name.toLowerCase().includes(q) ||
        ds.owner.toLowerCase().includes(q) ||
        ds.tags.some((t) => t.includes(q))
    );
  }
  if (type) results = results.filter((ds) => ds.type === type);
  if (status) results = results.filter((ds) => ds.status === status);

  return results;
}

export async function fetchDataStoreById(id) {
  await randomDelay();
  const ds = DATA_STORES.find((d) => d.id === id);
  if (!ds) throw new Error(`Data store not found: ${id}`);
  return ds;
}

export async function fetchFindings({ dataStoreId, sensitivity, dataClass } = {}) {
  await randomDelay();
  let results = [...FINDINGS];

  if (dataStoreId) results = results.filter((f) => f.dataStoreId === dataStoreId);
  if (sensitivity) results = results.filter((f) => f.sensitivity === sensitivity);
  if (dataClass) results = results.filter((f) => f.dataClass === dataClass);

  return results;
}

export async function fetchFindingById(id) {
  await randomDelay();
  const f = FINDINGS.find((f) => f.id === id);
  if (!f) throw new Error(`Finding not found: ${id}`);
  return { ...f };
}

export async function updateFindingSensitivity(findingId, newSensitivity) {
  await randomDelay();
  const finding = FINDINGS.find((f) => f.id === findingId);
  if (!finding) throw new Error(`Finding not found: ${findingId}`);
  finding.sensitivity = newSensitivity;
  finding.overridden = true;
  return { ...finding };
}

export async function fetchActivityLog(dataStoreId) {
  await randomDelay();
  if (dataStoreId) {
    return ACTIVITY_LOG.filter((a) => a.dataStoreId === dataStoreId);
  }
  return [...ACTIVITY_LOG];
}

export async function fetchDashboardStats() {
  await randomDelay();

  const totalDataStores = DATA_STORES.length;
  const totalFindings = FINDINGS.length;

  const bySensitivity = {};
  for (const f of FINDINGS) {
    bySensitivity[f.sensitivity] = (bySensitivity[f.sensitivity] || 0) + 1;
  }

  const byDataClass = {};
  for (const f of FINDINGS) {
    byDataClass[f.dataClass] = (byDataClass[f.dataClass] || 0) + 1;
  }

  const byStatus = {};
  for (const ds of DATA_STORES) {
    byStatus[ds.status] = (byStatus[ds.status] || 0) + 1;
  }

  const totalRecordsAtRisk = FINDINGS.filter(
    (f) => f.sensitivity === "restricted"
  ).reduce((sum, f) => sum + f.recordCount, 0);

  return {
    totalDataStores,
    totalFindings,
    bySensitivity,
    byDataClass,
    byStatus,
    totalRecordsAtRisk,
  };
}
