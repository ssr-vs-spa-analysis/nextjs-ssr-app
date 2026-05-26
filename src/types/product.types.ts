export type ApiProduct = {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
  category: string;
  brand: string;
  rating: number;
  images: string[];
  attributes: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

export type ProductSummary = {
  id: string;
  title: string;
  category: string;
  thumbnailUrl: string;
  price: number;
  rating: number;
};

export type ProductDetail = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  price: number;
  brand: string;
  stockStatus: "na_stanju" | "niske_zalihe" | "nema_na_stanju";
};
