/* The frame for the reading pages — about, privacy, licence, 404.
 *
 * Server component: these pages carry `metadata` exports and have nothing to
 * hydrate. They render inside AppShell, so the header, theme toggle and footer
 * come for free and no second layout is needed.
 *
 * Type roles follow the brand guide: Silkscreen for the overline and headings
 * only, Instrument Sans for anything you actually read. */

export function InfoPage({
  overline, title, updated, children,
}: {
  overline: string;
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <article style={{ maxWidth: 'var(--width-prose)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <header style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <span className="em-overline">{overline}</span>
        <h1 className="em-title" style={{ margin: 0 }}>{title}</h1>
        {updated ? (
          <span className="em-label" style={{ color: 'var(--text-muted)' }}>Last updated {updated}</span>
        ) : null}
      </header>
      <div className="em-prose">{children}</div>
    </article>
  );
}

/** Section heading inside a prose page. Pixel type, kept short. */
export function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      {/* No margin: .em-prose section is a flex column and owns the spacing. */}
      <h2 className="em-subtitle" style={{ margin: 0 }}>{title}</h2>
      {children}
    </section>
  );
}
