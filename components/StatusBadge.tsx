export default function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    APPROVED: { label: "Live", cls: "bg-green-500/15 text-green-600" },
    PENDING: { label: "Pending review", cls: "bg-sun-400/20 text-sun-600" },
    REJECTED: { label: "Rejected", cls: "bg-coral-500/15 text-coral-500" },
  };
  const s = map[status] ?? map.PENDING;
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${s.cls}`}>
      {s.label}
    </span>
  );
}
