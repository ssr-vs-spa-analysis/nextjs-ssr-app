import type {
  ApiProduct,
  ProductDetail,
  ProductSummary
} from "@/types/product.types";

const fallbackImage =
  "https://images.unsplash.com/vector-1769004080143-f1664190076a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const toPrice = (price: ApiProduct["price"]): number => {
  const parsedPrice = Number.parseFloat(price);
  return Number.isFinite(parsedPrice) ? parsedPrice : 0;
};

const toStock = (quantity: number): ProductDetail["stockStatus"] => {
  if (quantity <= 0) return "nema_na_stanju";
  if (quantity <= 5) return "niske_zalihe";
  return "na_stanju";
};

// The DB stores the product label as `name`; the UI consistently exposes it as
// `title`. The rename happens here on purpose and is the only place it lives.
export const mapApiToSummary = (product: ApiProduct): ProductSummary => ({
  id: product.id,
  title: product.name,
  category: product.category,
  thumbnailUrl: product.images[0] || fallbackImage,
  price: toPrice(product.price),
  rating: product.rating
});

export const mapApiToDetail = (product: ApiProduct): ProductDetail => ({
  id: product.id,
  title: product.name,
  description: product.description,
  category: product.category,
  imageUrl: product.images[0] || fallbackImage,
  price: toPrice(product.price),
  brand: product.brand,
  stockStatus: toStock(product.quantity)
});
