import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <Link to="/" className="font-serif text-xl tracking-[0.24em] text-primary sm:text-2xl">
          RELIEF ATELIER
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }} className="transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/products" activeProps={{ className: "text-primary" }} className="transition-colors hover:text-primary">
            Products
          </Link>
          <Link to="/science" activeProps={{ className: "text-primary" }} className="transition-colors hover:text-primary">
            Science
          </Link>
          <Link to="/cart" activeProps={{ className: "text-primary" }} className="transition-colors hover:text-primary">
            Cart
          </Link>
        </nav>
        <Link
          to="/products"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground shadow-soft transition-all hover:scale-[1.03]"
        >
          <ShoppingBag className="h-4 w-4 transition-transform group-hover:-rotate-12" />
          Shop Now
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="font-serif text-lg tracking-[0.24em] text-primary">RELIEF ATELIER</div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Quiet, considered wellness technology for the way you actually live.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <div className="mb-3 font-medium uppercase tracking-widest text-primary">Shop</div>
          <ul className="space-y-2">
            <li><Link to="/products" className="hover:text-primary">All Products</Link></li>
            <li><Link to="/science" className="hover:text-primary">The Science</Link></li>
            <li><Link to="/cart" className="hover:text-primary">Cart</Link></li>
          </ul>
        </div>
        <div className="text-sm text-muted-foreground">
          <div className="mb-3 font-medium uppercase tracking-widest text-primary">Promise</div>
          <ul className="space-y-2">
            <li>30-day risk-free trial</li>
            <li>Free express shipping over $75</li>
            <li>1-year warranty · lifetime support</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Relief Atelier. All rights reserved.
      </div>
    </footer>
  );
}
