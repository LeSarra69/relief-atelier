import { useEffect, useSyncExternalStore } from "react";
import type { ProductSlug } from "./products";
import { SHOPIFY_DOMAIN } from "./shopify";

export type CartItem = { slug: ProductSlug; qty: number };

const KEY = "relief-atelier:cart:v1";
const listeners = new Set<() => void>();
let items: CartItem[] = [];
let hydrated = false;

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((i) => i && typeof i.slug === "string" && typeof i.qty === "number");
  } catch {
    return [];
  }
}

function write(next: CartItem[]) {
  items = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  }
  listeners.forEach((l) => l());
}

function hydrate() {
  if (hydrated) return;
  hydrated = true;
  items = read();
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      items = read();
      listeners.forEach((l) => l());
    }
  });
}

export const cartStore = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get(): CartItem[] {
    return items;
  },
  add(slug: ProductSlug, qty = 1) {
    if (!hydrated) hydrate();
    const existing = items.find((i) => i.slug === slug);
    if (existing) {
      write(items.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i)));
    } else {
      write([...items, { slug, qty }]);
    }
  },
  setQty(slug: ProductSlug, qty: number) {
    write(items.map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i)));
  },
  remove(slug: ProductSlug) {
    write(items.filter((i) => i.slug !== slug));
  },
  clear() {
    write([]);
  },
};

export function useCart(): CartItem[] {
  useEffect(() => {
    hydrate();
  }, []);
  return useSyncExternalStore(
    cartStore.subscribe,
    () => items,
    () => [] as CartItem[],
  );
}

// Multi-line Shopify checkout permalink:
// https://{shop}/cart/{variantId1}:{qty1},{variantId2}:{qty2}
export function buildShopifyCheckoutUrl(lines: { variantIdNumeric: string; qty: number }[]): string | null {
  const valid = lines.filter((l) => l.variantIdNumeric && l.qty > 0);
  if (valid.length === 0) return null;
  const path = valid.map((l) => `${l.variantIdNumeric}:${l.qty}`).join(",");
  return `https://${SHOPIFY_DOMAIN}/cart/${path}`;
}
