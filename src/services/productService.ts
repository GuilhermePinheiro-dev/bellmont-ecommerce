import { notFound } from "@tanstack/react-router";
import type { Product } from "../interfaces/product";

// const API_BASE_URL = "https://bellmont-api.onrender.com";
const API_BASE_URL = "http://localhost:3000";
const DEFAULT_LIMIT = 3;

interface GetProductParams {
  page: number;
  limit?: number;
}

interface ProductResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

interface ProductApiPayload {
  data?: Product[] | { products?: Product[]; items?: Product[] } | null;
  products?: Product[];
  items?: Product[];
  total?: number;
  page?: number;
  limit?: number;
}

function normalizeProducts(data: unknown): Product[] {
  if (Array.isArray(data)) {
    return data as Product[];
  }

  if (data && typeof data === "object") {
    const payload = data as { products?: Product[]; items?: Product[] };

    if (Array.isArray(payload.products)) {
      return payload.products;
    }

    if (Array.isArray(payload.items)) {
      return payload.items;
    }
  }

  return [];
}

export async function getProducts({
  page,
  limit = DEFAULT_LIMIT,
}: GetProductParams): Promise<ProductResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const url = `${API_BASE_URL}/products?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
    }

    const payload = (await response.json()) as ProductApiPayload;
    const products = normalizeProducts(payload.data ?? payload);

    return {
      data: products,
      total:
        typeof payload.total === "number" ? payload.total : products.length,
      page: typeof payload.page === "number" ? payload.page : page,
      limit: typeof payload.limit === "number" ? payload.limit : limit,
    };
  } catch (error) {
    if (error instanceof Error) throw error;

    throw new Error("Erro desconhecido ao buscar produtos.");
  }
}

export async function getDetailProductsById(id: string): Promise<Product | null> {
  const response = await fetch(`http://localhost:3000/products/${id}`);

  if(!response.ok){
    throw notFound()
  }
  return await response.json();
}
