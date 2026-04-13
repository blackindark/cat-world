export function KpiCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <article className="panel kpi-card">
      <p className="kpi-label">{label}</p>
      <p className="kpi-value">{value}</p>
      <p className="muted">{hint}</p>
    </article>
  );
}
