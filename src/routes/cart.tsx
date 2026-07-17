import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, X, ArrowRight, Shield, Truck, Award } from "lucide-react";
import { products } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Relief Atelier" },
      { name: "description", content: "Review your Relief Atelier order — cordless wellness devices with 30-day risk-free trial and free express shipping." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Cart,
});

function Cart() {
  const [items, setItems] = useState<{ slug: keyof typeof products; qty: number }[]>([
    { slug: "menstrual", qty: 1 },
    { slug: "neck", qty: 1 },
  ]);

  const lines = items.map((i) => ({ ...products[i.slug], qty: i.qty }));
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const savings = lines.reduce((s, l) => s + (l.comparePrice - l.price) * l.qty, 0);
  const shipping = subtotal > 75 ? 0 : 9;
  const total = subtotal + shipping;

  const update = (slug: string, d: number) =>
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, i.qty + d) } : i)));
  const remove = (slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug));

  return (
    <main className="bg-hero">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Your Bag</div>
        <h1 className="mt-2 font-serif text-5xl text-primary">Cart</h1>

        {lines.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-border bg-card p-16 text-center shadow-soft">
            <p className="text-muted-foreground">Your bag is quiet. Time to change that.</p>
            <Link to="/products" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground">
              Explore the collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]">
            <div className="space-y-4">
              {lines.map((l) => (
                <div key={l.slug} className="grid grid-cols-[96px_minmax(0,1fr)_auto] items-center gap-5 rounded-2xl border border-border/70 bg-card p-4 shadow-soft sm:grid-cols-[120px_minmax(0,1fr)_auto]">
                  <div className="aspect-square overflow-hidden rounded-xl bg-blush">
                    <img src={l.image} alt={l.name} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-serif text-lg text-primary">{l.name}</div>
                    <div className="text-xs text-muted-foreground">{l.tagline}</div>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border">
                      <button onClick={() => update(l.slug, -1)} className="grid h-8 w-8 place-items-center text-primary"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-6 text-center text-sm text-primary">{l.qty}</span>
                      <button onClick={() => update(l.slug, 1)} className="grid h-8 w-8 place-items-center text-primary"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-primary">${(l.price * l.qty).toLocaleString()}</div>
                    <button onClick={() => remove(l.slug)} className="text-muted-foreground transition-colors hover:text-primary">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-3xl border border-border bg-card p-7 shadow-soft lg:sticky lg:top-24">
              <div className="font-serif text-xl text-primary">Order summary</div>
              <dl className="mt-5 space-y-3 text-sm">
                <Row label="Subtotal" value={`$${subtotal.toLocaleString()}`} />
                <Row label="You save" value={`− $${savings.toLocaleString()}`} accent />
                <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping}`} />
                <div className="my-3 border-t border-border" />
                <div className="flex items-center justify-between text-base text-primary">
                  <dt>Total</dt>
                  <dd className="font-serif text-2xl">${total.toLocaleString()}</dd>
                </div>
              </dl>
              <button className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground transition-all hover:scale-[1.02]">
                Checkout securely
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                <MiniBadge icon={<Award className="h-4 w-4" />} label="Approved" />
                <MiniBadge icon={<Shield className="h-4 w-4" />} label="Secure" />
                <MiniBadge icon={<Truck className="h-4 w-4" />} label="Free ship" />
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={accent ? "text-rose" : "text-primary"}>{value}</dd>
    </div>
  );
}

function MiniBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-background p-3">
      <span className="text-rose">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
