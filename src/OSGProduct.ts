export type OSGProduct = {
  id: string;
  name: string;
  price?: number;
  category?: string;
  brand?: string;
  quantity?: number;
  variant?: string;
  sku?: string;
  position?: number;
  customAttributes?: { [key: string]: any };
};
