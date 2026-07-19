// Shopify Storefront API client (public token — safe in the browser).
// Lovable is the storefront; Shopify is only the checkout / cash register.

export const SHOPIFY_DOMAIN = "dhqzhe-mw.myshopify.com";
export const SHOPIFY_STOREFRONT_TOKEN = "f5f56c5528ad19bae24a0438ac0136bb";
const API_VERSION = "2024-10";

export type ShopifyProduct = {
  handle: string;
  title: string;
  descriptionHtml?: string;
  featuredImage?: { url: string; altText?: string | null } | null;
  price: { amount: string; currencyCode: string };
  compareAtPrice?: { amount: string; currencyCode: string } | null;
  variantId: string; // gid://...
  variantIdNumeric: string;
  onlineStoreUrl?: string | null;
};

async function storefront<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = (await res.json()) as { data?: T; errors?: unknown };
  if (!res.ok || json.errors) throw new Error("Shopify API error");
  return json.data as T;
}

const PRODUCT_QUERY = `
  query Product($handle: String!) {
    product(handle: $handle) {
      handle title descriptionHtml onlineStoreUrl
      featuredImage { url altText }
      priceRange { minVariantPrice { amount currencyCode } }
      compareAtPriceRange { minVariantPrice { amount currencyCode } }
      variants(first: 1) { edges { node { id } } }
    }
  }`;

type ProductGql = {
  product: null | {
    handle: string;
    title: string;
    descriptionHtml?: string;
    onlineStoreUrl?: string | null;
    featuredImage?: { url: string; altText?: string | null } | null;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    compareAtPriceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    variants: { edges: { node: { id: string } }[] };
  };
};

export async function getShopifyProduct(handle: string): Promise<ShopifyProduct | null> {
  const data = await storefront<ProductGql>(PRODUCT_QUERY, { handle });
  const p = data.product;
  if (!p) return null;
  const variantId = p.variants.edges[0]?.node.id ?? "";
  const variantIdNumeric = variantId.split("/").pop() ?? "";
  const compare = p.compareAtPriceRange.minVariantPrice;
  return {
    handle: p.handle,
    title: p.title,
    descriptionHtml: p.descriptionHtml,
    featuredImage: p.featuredImage,
    price: p.priceRange.minVariantPrice,
    compareAtPrice: parseFloat(compare.amount) > 0 ? compare : null,
    variantId,
    variantIdNumeric,
    onlineStoreUrl: p.onlineStoreUrl,
  };
}

// Direct-to-checkout permalink: fastest path from click to Shopify checkout.
export function shopifyCheckoutUrl(variantIdNumeric: string, quantity = 1): string {
  return `https://${SHOPIFY_DOMAIN}/cart/add?id=${variantIdNumeric}&quantity=${quantity}`;
}

export function formatMoney(amount: string | number, currency: string): string {
  const n = typeof amount === "string" ? parseFloat(amount) : amount;
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);
  } catch {
    return `${n.toFixed(2)} ${currency}`;
  }
}
