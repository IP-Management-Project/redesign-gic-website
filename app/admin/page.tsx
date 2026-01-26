export default function AdminDashboardPage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-foreground">
          Welcome to the CMS
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Use the sidebar to jump into landing page content, hero blocks, or the
          full page editor. Everything you change here updates the public site.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { label: "Draft sections", value: "4" },
            { label: "Pending reviews", value: "2" },
            { label: "Published today", value: "1" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border bg-background p-4"
            >
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <aside className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h4 className="text-lg font-semibold text-foreground">
          Quick actions
        </h4>
        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
          <li>Review hero banner updates</li>
          <li>Check upcoming events list</li>
          <li>Publish new research highlights</li>
        </ul>
      </aside>
    </section>
  );
}
