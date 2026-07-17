import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { products, productList } from "@/lib/products";

export const Route = createFileRoute("/science")({
  head: () => ({
    meta: [
      { title: "The Science of Relief — Relief Atelier" },
      { name: "description", content: "How Relief Atelier devices work: NTC smart heat, infrared matrix, TENS micro-current, and the technologies behind menstrual, knee and neck relief." },
      { property: "og:title", content: "The Science of Relief — Relief Atelier" },
      { property: "og:description", content: "The technology behind our menstrual, knee and neck therapy devices — plainly explained." },
    ],
  }),
  component: Science,
});

function Science() {
  return (
    <main className="bg-hero">
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Product Science</div>
        <h1 className="mt-3 font-serif text-5xl text-primary sm:text-6xl">The Science of Relief</h1>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-muted-foreground">
          Every Relief Atelier device is a small engineering study — heat, pulse, and pressure tuned to what the body actually asks for. Here's what's inside, and what it does for you.
        </p>
      </section>

      {productList.map((p, i) => (
        <section key={p.slug} className={`py-16 ${i % 2 === 0 ? "bg-secondary/30" : ""}`}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className={`grid gap-12 lg:grid-cols-2 lg:items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="overflow-hidden rounded-3xl bg-blush shadow-soft">
                <img src={p.image} alt={p.name} loading="lazy" width={1024} height={1024} className="aspect-[4/5] w-full object-cover" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{p.tagline}</div>
                <h2 className="mt-2 font-serif text-4xl text-primary">{p.name}</h2>

                <div className="mt-8">
                  <div className="mb-3 text-xs uppercase tracking-[0.2em] text-rose">What's inside</div>
                  <div className="space-y-4">
                    {p.science.inside.map((s) => (
                      <div key={s.title} className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
                        <div className="font-serif text-lg text-primary">{s.title}</div>
                        <p className="mt-1.5 text-sm text-muted-foreground">{s.body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <div className="mb-3 text-xs uppercase tracking-[0.2em] text-rose">How it helps</div>
                  <ul className="space-y-2">
                    {p.science.helps.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-sm text-primary">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose" /> {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground"
                >
                  Shop {p.name.split(" ")[1] ?? "Now"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Comparison */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Compare</div>
          <h2 className="mt-2 font-serif text-4xl text-primary">Which device is right for you?</h2>
        </div>

        <div className="mt-10 overflow-x-auto rounded-3xl border border-border bg-card shadow-soft">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="bg-secondary/60 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <th className="p-5"></th>
                {productList.map((p) => (
                  <th key={p.slug} className="p-5 text-primary">{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Best for", get: (p: typeof products.menstrual) => p.tagline },
                { label: "Primary tech", get: (p: typeof products.menstrual) => p.science.inside.map(x => x.title).join(" + ") },
                { label: "Battery", get: (p: typeof products.menstrual) => p.specs.find(s => s.label === "Battery")?.value ?? "—" },
                { label: "Weight", get: (p: typeof products.menstrual) => p.specs.find(s => s.label === "Weight")?.value ?? "—" },
                { label: "Rating", get: (p: typeof products.menstrual) => `${p.reviews.rating} ★ (${p.reviews.count.toLocaleString()}+)` },
                { label: "Price", get: (p: typeof products.menstrual) => `$${p.price}` },
              ].map((row) => (
                <tr key={row.label} className="border-t border-border">
                  <td className="p-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">{row.label}</td>
                  {productList.map((p) => (
                    <td key={p.slug} className="p-5 text-primary">{row.get(p)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
