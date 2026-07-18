// src/lib/products.ts

export type ProductSlug = "menstrual" | "knee" | "neck";

export interface Product {
  slug: ProductSlug;
  name: string;
  subtitle: string;
  tagline: string;
  shortDefinition: string;
  price: number;
  comparePrice: number;
  image: string;
  badge?: string;
  featured?: boolean;
  colors: string[];
  intensities: string[];
  bullets: string[];
  reviews: { rating: number; count: number };
  howToUse: string[];
  specs: { label: string; value: string }[];
  shipping: string[];
  science: {
    inside: { title: string; body: string }[];
    helps: string[];
  };
}

// CONFIGURACIÓ: Aquí poses les teves dades
const SHOPIFY_DOMAIN = "dhqzhe-mw.myshopify.com";
const SHOPIFY_TOKEN = "f5f56c5528ad19bae24a0438ac0136bb"; // <--- POSA EL TEU ACCESS TOKEN AQUÍ

export const fetchShopifyProducts = async (): Promise<any> => {
  const query = `
    query {
      products(first: 3) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange { minVariantPrice { amount } }
            images(first: 1) { edges { node { url } } }
          }
        }
      }
    }
  `;

  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2026-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN
    },
    body: JSON.stringify({ query })
  });

  const { data } = await response.json();
  return data.products.edges;
};
