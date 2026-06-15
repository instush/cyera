import "./Dashboard.css";

function Dashboard({
  navItems = [],
  activeNav,
  onNavSelect,
  breadcrumbs = [],
  user = { name: "User", avatar: null },
  children,
}) {
  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="dashboard">
      {/* Left vertical bar */}
      <aside className="dashboard__sidebar">
        <nav className="dashboard__nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                "dashboard__nav-item" +
                (item.id === activeNav ? " dashboard__nav-item--active" : "")
              }
              onClick={() => onNavSelect?.(item.id)}
            >
              {item.icon && <span className="dashboard__nav-icon">{item.icon}</span>}
              <span className="dashboard__nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="dashboard__main-wrap">
        {/* Top header — 3 stacked horizontal bars */}
        <header className="dashboard__header">
          {/* Bar 1: company */}
          <div className="dashboard__bar dashboard__bar--brand">
            <span className="dashboard__logo">C</span>
            <span className="dashboard__company">Cyera</span>
          </div>

          {/* Bar 2: breadcrumbs */}
          <div className="dashboard__bar dashboard__bar--crumbs">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="dashboard__crumb-group">
                {i > 0 && <span className="dashboard__crumb-sep">/</span>}
                {crumb.onClick ? (
                  <button
                    type="button"
                    className="dashboard__crumb dashboard__crumb--link"
                    onClick={crumb.onClick}
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="dashboard__crumb">{crumb.label}</span>
                )}
              </span>
            ))}
          </div>

          {/* Bar 3: user */}
          <div className="dashboard__bar dashboard__bar--user">
            <span className="dashboard__username">{user.name}</span>
            {user.avatar ? (
              <img className="dashboard__avatar" src={user.avatar} alt={user.name} />
            ) : (
              <span className="dashboard__avatar dashboard__avatar--initials">
                {initials}
              </span>
            )}
          </div>
        </header>

        {/* Main panel */}
        <main className="dashboard__content">{children}</main>
      </div>
    </div>
  );
}

export default Dashboard;
