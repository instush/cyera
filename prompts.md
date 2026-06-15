# Prompts

A running log of the prompts used to build this project, in order.

1. Add a count stat card component with count (the number of items, big font) and a title under it (the title of the card). No libs, pure CSS.

2. Create a new dashboard component: left vertical bar with items; top header divided into 3 horizontal bars — #1 for company icon "Cyera", #2 breadcrumbs (inner items are not in the vertical bar), #3 username + user image. Main panel shows relevant content.

3. The first item on the dashboard is Overview. It gets its data using an API in the api folder (mockApi): first it gets Data Stores → card 1; second it gets all findings → card 2. Show the cards on the main panel one next to the other.

4. Create a component that draws a simple bar chart with the total findings, each bar representing one of the sensitivity levels (public / internal / confidential / restricted), but the levels need to be dynamic from the data, not fixed. Fill the chart using the previous API call to get the findings; each bar a different color and a number above.

5. Add to the card component a parameter "alert" — gives it a red thick border (keeps the same size). Add a third card "Total records at risk" (records in "restricted" findings) — show only if there are findings.

6. Add a new component, same as the stat card, but when clicking it expands to a list of items while the title turns to one line, regular font size. Add 3 of these cards under the chart: connected / stale / error. Each one shows the list of data stores. Each item points to the Data Stores item on the left with a router path and URL parameters to filter the data stores by status.

7. In Data Stores: add a free search input with debounce (by name, owner, or tag). Add a filter vertical bar on the right with 2 groups — type (database, object-storage, data-warehouse, saas) and status (connected, stale, error). Each row shows: name, type, platform, region, owner, status (with visual indicator), last scanned date (relative, e.g. "2 hours ago"), and number of findings. Clicking a data store row opens the Data Store Detail.

8. Clicking a data store row opens the data store. The data store view is not an item on the left bar — it's another step in the breadcrumbs, and the routing changes to /datastores/:id. The main panel is replaced and shows data store details: name, type, platform, status, owner, and tags. Under it, a table with all the data store findings, with all the finding fields as columns.

9. Make the Sensitivity column editable via dropdown (public / internal / confidential / restricted). Use the API updateFindingSensitivity and reflect the update immediately.

10. Collect all the chat prompts and organize them in a prompts.md file with numbers. For any new prompt, add it (including this prompt).

11. Add a collapsible Activity log list. Place the "Activity log" toggle on the right of the topmost main title of the data store, aligned right. When clicked, expand a log list above the data store, pushing it down.
