import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="nav" aria-label="Primary navigation">
        <Link className="brand" href="/">Ganymai</Link>
        <div className="nav-links">
          <Link className="nav-link desktop" href="/explore">Explore</Link>
          <Link className="nav-link desktop" href="/login">Log in</Link>
          <Link className="button primary" href="/new">Start challenge</Link>
        </div>
      </nav>
    </header>
  );
}
