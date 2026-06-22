export default function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    APPROVED: { label: "Live", cls: "bg-green-500/15 text-green-700" },
    PENDING: { label: "Pending review", cls: "bg-warning/20 text-warning" },
    REJECTED: { label: "Rejected", cls: "bg-error/15 text-error" },
  };
  const s = map[status] ?? map.PENDING;
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${s.cls}`}>
      {s.label}
    </span>
  );
}
