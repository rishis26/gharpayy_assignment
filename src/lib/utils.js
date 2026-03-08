export const timeAgo = (date) => {
  const d = Date.now() - new Date(date).getTime();
  if (d < 60000) return 'Just now';
  if (d < 3600000)  return `${Math.floor(d/60000)}m ago`;
  if (d < 86400000) return `${Math.floor(d/3600000)}h ago`;
  return `${Math.floor(d/86400000)}d ago`;
};
export const fmtDate = (date) => new Date(date).toLocaleDateString("en-IN", { day:"numeric", month:"short", hour:"2-digit", minute:"2-digit" });
export const isInactive = (lead) => {
  if (!lead?.lastActivity) return false;
  if (["booked", "lost", "contacted"].includes(lead.stage)) return false;
  return Date.now() - new Date(lead.lastActivity).getTime() > 5 * 60 * 1000;
};
