import { useQuery } from "@tanstack/react-query";
import { getShopifyProduct, formatMoney } from "@/lib/shopify";

export function useShopifyPrice(handle: string) {
  const { data } = useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: () => getShopifyProduct(handle),
    staleTime: 5 * 60 * 1000,
  });
  if (!data) return null;
  return {
    price: formatMoney(data.price.amount, data.price.currencyCode),
    compareAt: data.compareAtPrice
      ? formatMoney(data.compareAtPrice.amount, data.compareAtPrice.currencyCode)
      : null,
    variantIdNumeric: data.variantIdNumeric,
    raw: data,
  };
}
