export enum OSGRecommendType {
  UserItemEmbedding = 'user_item_embedding',
  AlsoBought = 'also_bought',
  AlsoViewed = 'also_viewed',
}

export type OSGRecommendRequest = {
  type: OSGRecommendType;
  quantity: number;
  productIds?: string[];
  productTags?: string[];
  productCategories?: string[];
  excludedProductIds?: string[];
  excludedProductTags?: string[];
};

export type OSGRecommendProduct = {
  id: string;
  name: string;
  price: string;
  url: string;
  imageUrl: string;
  additionalImages: AdditionalImage[];
  specialPrice?: string;
};

export type AdditionalImage = {
  name: string;
  link: string;
};
