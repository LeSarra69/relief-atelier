import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import { productList } from "@/lib/products";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — Relief Atelier" },
      { name: "description", content: "Explore Relief Atelier's cordless wellness devices: menstrual relief belt, knee recovery wrap, and cervical neck massager." },
      { property: "og:title", content: "Products — Relief Atelier" },
      { property: "og:description", content: "Cordless heat, vibration and TENS therapy for menstrual, knee and neck relief." },
    ],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  return (
    <main className="bg-hero">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">The Collection</div>
          <h1 className="mt-3 font-serif text-5xl text-primary sm:text-6xl">Every device in the atelier</h1>
          <p className="mt-4 text-muted-foreground">
            Three considered objects, each tuned for a specific body story.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {productList.map((p, i) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              style={{ animationDelay: `${i * 80}ms` }}
              className="animate-fade-up group overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft hover-lift"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-blush">
                <img src={p.image} alt={p.name} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
                {p.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-primary-foreground">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{p.tagline}</div>
                <h3 className="mt-2 font-serif text-2xl text-primary">{p.name}</h3>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span>
                    <span className="font-medium text-primary">${p.price}</span>
                    <span className="ml-2 text-muted-foreground line-through">${p.comparePrice}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-rose text-rose" /> {p.reviews.rating}
                  </span>
                </div>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  View details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
