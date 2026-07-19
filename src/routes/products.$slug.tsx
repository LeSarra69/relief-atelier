import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Star,
  Check,
  Shield,
  Truck,
  Award,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { products, type Product, type ProductSlug } from "@/lib/products";
import { useQuery } from "@tanstack/react-query";
import { getShopifyProduct, shopifyCheckoutUrl, formatMoney } from "@/lib/shopify";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }): { product: Product } => {
    const product = products[params.slug as ProductSlug];
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product not found" }, { name: "robots", content: "noindex" }] };
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Relief Atelier` },
        { name: "description", content: product.shortDefinition },
        { property: "og:title", content: `${product.name} — Relief Atelier` },
        { property: "og:description", content: product.shortDefinition },
        { property: "og:image", content: product.image },
      ],
    };
  },
  component: PDP,
  notFoundComponent: () => (
    <main className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl text-primary">Product not found</h1>
      <Link to="/products" className="mt-6 inline-block text-primary underline">Back to products</Link>
    </main>
  ),
});

function PDP() {
  const { product } = Route.useLoaderData() as { product: Product };
  const [color, setColor] = useState(product.colors[0]);
  const [intensity, setIntensity] = useState(product.intensities[1] ?? product.intensities[0]);
  const [open, setOpen] = useState<string | null>("how");

  const { data: shop } = useQuery({
    queryKey: ["shopify-product", product.shopifyHandle],
    queryFn: () => getShopifyProduct(product.shopifyHandle),
    staleTime: 5 * 60 * 1000,
  });

  const displayPrice = shop
    ? formatMoney(shop.price.amount, shop.price.currencyCode)
    : `$${product.price}`;
  const displayCompare = shop?.compareAtPrice
    ? formatMoney(shop.compareAtPrice.amount, shop.compareAtPrice.currencyCode)
    : `$${product.comparePrice}`;
  const save = shop?.compareAtPrice
    ? Math.max(0, Math.round(((parseFloat(shop.compareAtPrice.amount) - parseFloat(shop.price.amount)) / parseFloat(shop.compareAtPrice.amount)) * 100))
    : Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100);

  const checkoutUrl = shop?.variantIdNumeric ? shopifyCheckoutUrl(shop.variantIdNumeric, 1) : null;

  const reviews = [
    { name: "Amelia R.", text: "It's the first thing I reach for on day one. Silent, warm, and it actually works.", rating: 5 },
    { name: "Priya S.", text: "I keep it in my bag. Twenty minutes and I'm human again.", rating: 5 },
    { name: "Jordan K.", text: "Beautiful object, and my physio approved. Wearing it as I type.", rating: 5 },
    { name: "Léa M.", text: "Replaced three heating pads and a lot of ibuprofen.", rating: 5 },
  ];

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Gallery (sticky) */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="relative overflow-hidden rounded-3xl bg-blush shadow-soft">
              <img src={product.image} alt={product.name} width={1024} height={1024} className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl border border-border bg-blush">
                  <img src={product.image} alt="" className="h-full w-full object-cover opacity-90" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-0.5">
                {[0,1,2,3,4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-rose text-rose" />
                ))}
              </div>
              <span className="font-medium text-primary">{product.reviews.rating}</span>
              <span className="text-muted-foreground">· Over {product.reviews.count.toLocaleString()}+ happy customers</span>
            </div>

            <h1 className="mt-4 font-serif text-4xl text-primary sm:text-5xl">{product.name}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{product.subtitle}</p>

            <div className="mt-6 flex items-center gap-3">
              <span className="font-serif text-3xl text-primary">${product.price}</span>
              <span className="text-lg text-muted-foreground line-through">${product.comparePrice}</span>
              <span className="rounded-full bg-accent/50 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
                Save {save}% today
              </span>
            </div>

            <ul className="mt-6 grid gap-2.5">
              {product.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-primary">
                  <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-secondary">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Selectors */}
            <div className="mt-7 space-y-5">
              <Selector label="Color" options={product.colors} value={color} onChange={setColor} />
              <Selector label="Intensity" options={product.intensities} value={intensity} onChange={setIntensity} />
            </div>

            <div className="mt-7 rounded-3xl border border-border bg-card p-5 shadow-soft">
              <button className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-sm font-medium uppercase tracking-[0.22em] text-primary-foreground transition-all hover:scale-[1.02]">
                Add to Cart · ${product.price}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                30-Day Risk-Free Trial · Free Express Shipping
              </p>
            </div>

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <Badge icon={<Award className="h-4 w-4" />} label="Physio Approved" />
              <Badge icon={<Shield className="h-4 w-4" />} label="FSA / HSA Eligible" />
              <Badge icon={<Truck className="h-4 w-4" />} label="1-Year Warranty" />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Verified Reviews</div>
            <h2 className="mt-2 font-serif text-3xl text-primary sm:text-4xl">Loved by {product.reviews.count.toLocaleString()}+ people</h2>
          </div>
          <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
            <Sparkles className="h-4 w-4 text-rose" /> Real customers, unfiltered
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <div key={i} style={{ animationDelay: `${i * 60}ms` }} className="animate-fade-up rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-rose text-rose" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-primary">"{r.text}"</p>
              <div className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">— {r.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Accordions */}
      <section className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
        <div className="rounded-3xl border border-border bg-card shadow-soft">
          <Acc id="how" title="How to Use" open={open} setOpen={setOpen}>
            <ol className="space-y-3 text-sm text-muted-foreground">
              {product.howToUse.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-secondary text-xs text-primary">{i+1}</span>
                  <span className="text-primary">{s}</span>
                </li>
              ))}
            </ol>
          </Acc>
          <Acc id="specs" title="Key Specs" open={open} setOpen={setOpen}>
            <dl className="grid gap-3 sm:grid-cols-2">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between border-b border-border/60 py-2 text-sm">
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="text-primary">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Acc>
          <Acc id="ship" title="Shipping & Guarantee" open={open} setOpen={setOpen} last>
            <ul className="space-y-2 text-sm text-primary">
              {product.shipping.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-rose" /> {s}
                </li>
              ))}
            </ul>
          </Acc>
        </div>

        <div className="mt-16 rounded-3xl bg-blush-gradient p-10 text-center">
          <h3 className="font-serif text-3xl text-primary">Understand what's inside</h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            The technology behind each device, explained plainly.
          </p>
          <Link to="/science" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground">
            Read the science <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function Selector({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <span>{label}</span>
        <span className="text-primary">{value}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all ${
              value === o
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-primary hover:border-rose"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-card p-4">
      <span className="text-rose">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function Acc({
  id, title, children, open, setOpen, last,
}: {
  id: string; title: string; children: React.ReactNode;
  open: string | null; setOpen: (v: string | null) => void; last?: boolean;
}) {
  const isOpen = open === id;
  return (
    <div className={last ? "" : "border-b border-border"}>
      <button
        onClick={() => setOpen(isOpen ? null : id)}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-serif text-xl text-primary">{title}</span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid overflow-hidden transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="min-h-0">
          <div className="px-6 pb-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
