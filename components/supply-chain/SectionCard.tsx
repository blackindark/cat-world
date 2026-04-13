export function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="panel section-card">
      <div className="section-header">
        <div>
          <h3>{title}</h3>
          <p className="muted">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}
