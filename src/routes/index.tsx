import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Sparkles, Star, X } from "lucide-react";
import { productList, type Product } from "@/lib/products";
import { useShopifyPrice } from "@/hooks/use-shopify-price";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Relief Atelier — Targeted Relief for Modern Body Care" },
      { name: "description", content: "Innovative ergonomic wellness devices for menstrual, knee and neck relief. Cordless heat, vibration and TENS therapy engineered for the way you live." },
    ],
  }),
  component: Home,
});

function Home() {
  const [active, setActive] = useState<Product | null>(null);

  return (
    <main className="bg-hero">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/40 blur-3xl" />
          <div className="absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-blush/60 blur-3xl" />
          <div className="absolute bottom-0 -right-24 h-80 w-80 rounded-full bg-cream/70 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-6 pt-6 text-center sm:px-6 sm:pt-8">
          <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3 text-rose" />
            Wellness, quietly engineered
          </div>
          <h1 className="animate-fade-up mt-3 text-balance font-serif text-3xl leading-[1.05] text-primary sm:text-4xl md:text-5xl">
            Targeted Body Relief
          </h1>
          <p className="animate-fade-up mx-auto mt-2 max-w-xl text-balance text-sm text-muted-foreground sm:text-base" style={{ animationDelay: "120ms" }}>
            Choose your recovery tool below.
          </p>
        </div>
      </section>

      {/* 3-Product Showcase */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">The Collection</div>
            <h2 className="mt-1 font-serif text-2xl text-primary sm:text-3xl">Three rituals, expertly tuned</h2>
          </div>
          <div className="hidden text-sm text-muted-foreground sm:block">
            Tap any card for a closer look
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          {productList.map((p, i) => (
            <ProductCard
              key={p.slug}
              product={p}
              onClick={() => setActive(p)}
              featured={p.featured}
              delay={i * 90}
            />
          ))}
        </div>
      </section>

      {/* Value strip */}
      <section className="border-y border-border/60 bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-center sm:grid-cols-3 sm:px-6">
          {[
            { t: "30-Day Risk-Free Trial", s: "Feel the difference or return it, no questions." },
            { t: "Free Express Shipping", s: "On every order over $75, worldwide." },
            { t: "Clinically Considered", s: "Designed with physiotherapists and gynecologists." },
          ].map((v) => (
            <div key={v.t}>
              <div className="font-serif text-lg text-primary">{v.t}</div>
              <div className="mt-1 text-sm text-muted-foreground">{v.s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial */}
      <section className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Our Philosophy</div>
        <h2 className="mt-3 font-serif text-4xl text-primary sm:text-5xl">
          Devices that feel like <em className="font-serif italic text-rose">rituals</em>.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-muted-foreground">
          We start from how the body actually recovers, then design objects gentle enough to keep on the nightstand.
          No blinking screens. No plastic buzz. Only warmth, breath, and quiet relief.
        </p>
      </section>

      {active && <ProductModal product={active} onClose={() => setActive(null)} />}
    </main>
  );
}

function ProductCard({
  product,
  onClick,
  featured,
  delay,
}: {
  product: Product;
  onClick: () => void;
  featured?: boolean;
  delay: number;
}) {
  const shop = useShopifyPrice(product.shopifyHandle);
  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
      className={`animate-fade-up group relative overflow-hidden rounded-3xl border bg-card text-left transition-all duration-500 hover-lift ${
        featured
          ? "z-10 md:scale-[1.06] border-rose/50 shadow-glow animate-shimmer"
          : "border-border/70 shadow-soft"
      }`}
    >
      {featured && (
        <span className="absolute left-5 top-5 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-primary-foreground">
          Bestseller
        </span>
      )}
      <div className={`relative overflow-hidden bg-blush ${featured ? "aspect-[4/5]" : "aspect-[4/5]"}`}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent" />
      </div>
      <div className="p-6">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.tagline}</div>
        <h3 className="mt-2 font-serif text-2xl text-primary">{product.name}</h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-primary">
            <span className="font-medium">{shop?.price ?? `$${product.price}`}</span>
            {shop?.compareAt && (
              <span className="ml-2 text-muted-foreground line-through">{shop.compareAt}</span>
            )}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-rose text-rose" />
            {product.reviews.rating}
          </span>
        </div>
      </div>
    </button>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-primary/40 px-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="animate-scale-in relative w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-card shadow-glow"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/80 text-primary backdrop-blur transition-transform hover:scale-110"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden bg-blush md:aspect-auto">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" width={1024} height={1024} />
          </div>
          <div className="flex flex-col justify-between p-8">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{product.tagline}</div>
              <h3 className="mt-2 font-serif text-3xl text-primary">{product.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {product.shortDefinition}
              </p>
              <div className="mt-5 inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-primary">
                <Star className="h-3 w-3 fill-rose text-rose" />
                {product.reviews.rating} · {product.reviews.count.toLocaleString()}+ reviews
              </div>
            </div>
            <Link
              to="/products/$slug"
              params={{ slug: product.slug }}
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-all hover:scale-[1.02]"
            >
              Explore Product Page
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
