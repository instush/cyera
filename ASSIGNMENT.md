# Cyera Frontend Assignment — Data Discovery Dashboard

**Time limit: 3 hours**

## Background

You're building a **Data Discovery Dashboard** for a data security platform. The platform automatically scans an organization's data stores (databases, cloud storage, SaaS apps) and classifies sensitive data it finds (emails, SSNs, credit cards, etc.).

Your job is to build the frontend that lets security teams **view, explore, and manage** these findings.

## What's Already Set Up

- Vite + React project (run `npm run dev` to start)
- Mock data in `src/data/mockData.js` (do NOT modify)
- Mock API in `src/api/mockApi.js` — all functions are async with realistic delays

### Available API Functions

```js
import {
  fetchDataStores,        // (filters?) → DataStore[]
  fetchDataStoreById,     // (id) → DataStore
  fetchFindings,          // (filters?) → Finding[]
  fetchFindingById,       // (id) → Finding
  updateFindingSensitivity, // (findingId, newSensitivity) → Finding
  fetchActivityLog,       // (dataStoreId?) → ActivityLogEntry[]
  fetchDashboardStats,    // () → stats summary object
} from "./api/mockApi";
```

---

## Requirements

Build the following **3 views**. You do NOT need a router — tabs, conditional rendering, or any navigation pattern is fine.

### View 1: Dashboard Overview

Display a summary of the organization's data security posture:

- **Total data stores** and **total findings** as stat cards
- **Findings by sensitivity level** (public / internal / confidential / restricted) — use a visual representation (bar chart, pie chart, colored cards, etc.)
- **Total records at risk** (records in "restricted" findings)
- **Data store connection status** breakdown (connected / stale / error)
- Clicking a data store status or sensitivity level should navigate to the relevant filtered list

### View 2: Data Stores List

A filterable, searchable list/table of data stores:

- **Search** by name, owner, or tag
- **Filter** by type (database, object-storage, data-warehouse, saas) and by status (connected, stale, error)
- Each row shows: name, type, platform, region, owner, status (with visual indicator), last scanned date (relative, e.g. "2 hours ago"), and **number of findings** for that data store
- Clicking a data store row opens the **Data Store Detail** (View 3)

### View 3: Data Store Detail

When a user clicks into a specific data store, show:

- **Header** with the data store's name, type, platform, status, owner, and tags
- **Findings table** listing all findings for this data store:
  - Columns: table/path, column/file, data class, sensitivity, record count, auto-classified (yes/no), overridden (yes/no)
  - **Inline sensitivity editing**: clicking a finding's sensitivity should let the user change it via a dropdown. Use `updateFindingSensitivity` from the API. The change should reflect immediately in the UI.
  - Color-code sensitivity levels (e.g., restricted = red, confidential = orange, internal = blue, public = green)
- **Activity log** for this data store (collapsible or in a side panel)

---

## Evaluation Criteria

We'll evaluate the following (in order of importance):

1. **Working functionality** — does it work? All 3 views, data loading, filtering, navigation
2. **Code quality** — component structure, separation of concerns, clean state management, proper use of hooks
3. **UX & visual design** — doesn't need to be pixel-perfect, but should be clean, usable, and provide clear feedback (loading states, empty states, error states)
4. **React patterns** — custom hooks, proper `useEffect` usage, avoiding unnecessary re-renders, key prop usage
5. **TypeScript** is optional but earns bonus points if used well

---

## Constraints

- **No UI component libraries** (no MUI, Ant Design, Chakra, etc.) — write your own CSS/components
- **No state management libraries** (no Redux, Zustand, etc.) — use React's built-in state
- **No router library** — implement navigation with state
- You MAY use a charting library if you want (e.g., recharts, chart.js)
- You MAY add any npm packages for utilities (date formatting, etc.)

---

## Bonus (if time allows)

- Responsive design (mobile-friendly)
- Keyboard accessibility
- URL-based state (using `window.history` / `popstate`)
- Optimistic UI updates when changing sensitivity
- Debounced search
- Sort columns in the findings table
- Dark mode toggle

---

## Getting Started

```bash
npm run dev
```

Open `src/App.jsx` and start building. Good luck!
