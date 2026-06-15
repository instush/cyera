import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Overview from "./components/Overview";
import DataStores from "./components/DataStores";
import DataStoreDetail from "./components/DataStoreDetail";

// ============================================================
//  YOUR CODE GOES HERE
//  See ASSIGNMENT.md for full requirements.
//
//  The mock API is ready to use:
//    import { fetchDataStores, fetchFindings, ... } from "./api/mockApi"
//
//  All API functions are async and return promises.
//  Check src/api/mockApi.js for the full list of available endpoints.
// ============================================================

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "▣", path: "/" },
  { id: "data-stores", label: "Data Stores", icon: "🗄", path: "/datastores" },
];

// Derive the current "route" from the URL path (+ query for filters).
//   /                    -> overview
//   /datastores          -> data stores list   (?search=&type=&status= filters)
//   /datastores/:id      -> data store detail
function readLocation() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const sp = new URLSearchParams(window.location.search);
  const base = { id: null, search: "", type: "", status: "" };

  if (segments[0] === "datastores") {
    if (segments[1]) return { ...base, view: "data-store", id: segments[1] };
    return {
      ...base,
      view: "data-stores",
      search: sp.get("search") || "",
      type: sp.get("type") || "",
      status: sp.get("status") || "",
    };
  }
  return { ...base, view: "overview" };
}

function App() {
  const [loc, setLoc] = useState(readLocation);
  const [detailName, setDetailName] = useState("");

  // Keep state in sync with browser back/forward.
  useEffect(() => {
    const onPop = () => setLoc(readLocation());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Push a path and update state. Optional status becomes a query param.
  function navigate(path, { status } = {}) {
    const search = status ? `?status=${encodeURIComponent(status)}` : "";
    window.history.pushState({}, "", path + search);
    setLoc(readLocation());
  }

  // Merge filter/search changes into the current URL query (replaceState, so
  // typing and toggling filters don't flood the back/forward history).
  const updateQuery = useCallback((partial) => {
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(partial)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const qs = params.toString();
    window.history.replaceState({}, "", "/datastores" + (qs ? `?${qs}` : ""));
    setLoc(readLocation());
  }, []);

  const onDetailLoaded = useCallback((store) => setDetailName(store.name), []);

  // The detail view lives under the Data Stores nav item.
  const activeNav = loc.view === "data-store" ? "data-stores" : loc.view;
  const navLabel = NAV_ITEMS.find((n) => n.id === activeNav)?.label ?? "";

  // Breadcrumbs — the detail view adds a step (it is not a sidebar item).
  const breadcrumbs = [
    { label: navLabel, onClick: () => navigate(NAV_ITEMS.find((n) => n.id === activeNav).path) },
  ];
  if (loc.view === "data-store") breadcrumbs.push({ label: detailName || loc.id });
  else if (loc.status) breadcrumbs.push({ label: loc.status });

  const title = loc.view === "data-store" ? detailName || "Data Store" : navLabel;

  return (
    <Dashboard
      navItems={NAV_ITEMS}
      activeNav={activeNav}
      onNavSelect={(id) => navigate(NAV_ITEMS.find((n) => n.id === id).path)}
      breadcrumbs={breadcrumbs}
      user={{ name: "Yaniv Issachar", avatar: null }}
    >
      <h1 className="app__title">{title}</h1>

      {loc.view === "overview" && (
        <Overview
          onStatusClick={(status) => navigate("/datastores", { status })}
        />
      )}
      {loc.view === "data-stores" && (
        <DataStores
          search={loc.search}
          type={loc.type}
          status={loc.status}
          onQueryChange={updateQuery}
          onOpenStore={(id) => navigate(`/datastores/${id}`)}
        />
      )}
      {loc.view === "data-store" && (
        <DataStoreDetail storeId={loc.id} onLoaded={onDetailLoaded} />
      )}
    </Dashboard>
  );
}

export default App;
