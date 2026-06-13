export function formatPrice(price: number | null, type: string) {
  if (price == null) return "Contact for price";
  const formatted = `₹${price.toLocaleString("en-IN")}`;
  if (type === "Hourly") return `${formatted}/hr`;
  if (type === "Negotiable") return `${formatted} · Negotiable`;
  return formatted;
}

export function timeAgo(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}
