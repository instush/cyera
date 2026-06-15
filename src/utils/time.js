// Format an ISO date as a short relative string, e.g. "2 hours ago".
export function relativeTime(iso, now = Date.now()) {
  const diff = now - new Date(iso).getTime();
  const sec = Math.round(diff / 1000);
  const min = Math.round(sec / 60);
  const hr = Math.round(min / 60);
  const day = Math.round(hr / 24);

  if (sec < 60) return "just now";
  if (min < 60) return `${min} minute${min === 1 ? "" : "s"} ago`;
  if (hr < 24) return `${hr} hour${hr === 1 ? "" : "s"} ago`;
  if (day < 30) return `${day} day${day === 1 ? "" : "s"} ago`;

  const month = Math.round(day / 30);
  return `${month} month${month === 1 ? "" : "s"} ago`;
}
