import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import type { ReactNode } from "react";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="font-display text-2xl tracking-wide text-foreground">
          lilouette
        </Link>
        <nav className="flex items-center gap-8 text-sm">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <a
            href="https://www.instagram.com/lilouette.co/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Instagram"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="text-muted-foreground tracking-wide uppercase text-xs transition-colors hover:text-foreground"
      activeProps={{ className: "text-foreground" }}
      activeOptions={{ exact: true }}
    >
      {children}
    </Link>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 mt-20">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p className="font-display text-lg text-foreground">lilouette</p>
        <p>© {new Date().getFullYear()} Lilouette. Handcrafted with love.</p>
        <a
          href="https://www.instagram.com/lilouette.co/"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
        >
          <Instagram className="h-4 w-4" /> @lilouette.co
        </a>
      </div>
    </footer>
  );
}