import type { OSGProduct } from './OSGProduct';

export enum Source {
  App = 'APP',
  Web = 'WEB',
}

export enum HitType {
  PageView = 'pageview',
  Event = 'event',
}

export enum Action {
  AddToCart = 'AddToCart',
  RemoveFromCart = 'RemoveFromCart',
  Checkout = 'Checkout',
  Refund = 'Refund',
  Search = 'Search',
  FormFillOut = 'FormFillOut',
  ViewContent = 'ViewContent',
  Purchase = 'Purchase',
  AddToWishlist = 'AddToWishlist',
  CompleteRegistration = 'CompleteRegistration',
  ClickProduct = 'ClickProduct',
  WebPopupImpression = 'WebPopupImpression',
  WebPopupClick = 'WebPopupClick',
  WebPopupInteraction = 'WebPopupInteraction',
  WebPopupClose = 'WebPopupClose',
  AppOpen = 'AppOpen',
  Login = 'Login',
  Logout = 'Logout',
  AppUnsubscribe = 'AppUnsubscribe',
}

export enum Category {
  ClickFooter = 'ClickFooter',
  ViewContent = 'ViewContent',
  Ecommerce = 'Ecommerce',
  CompleteRegistration = 'CompleteRegistration',
  Sort = 'Sort',
  Filter = 'Filter',
  ClickMenu = 'ClickMenu',
  Search = 'Search',
  FormFillOut = 'FormFillOut',
  WebPopup = 'WebPopup',
}

export type OSGEvent = {
  action?: String;
  category?: Category;
  hitType: HitType;
  extraAttributes: { [key: string]: any };

  userId?: string;
  deviceId?: string;
  appId?: string;
  appVersion?: string;
  appName?: string;
  source: Source;
  location?: string;
  locationTitle?: string;
  products?: OSGProduct[];
  currencyCode?: string;
  transactionId?: string;
  transactionRevenue?: number;
  transactionTax?: string;
  transactionShipping?: string;
  transactionCouponCode?: string;
  label?: { [key: string]: any };
  value?: string;
};

const defaultEvent: OSGEvent = {
  hitType: HitType.Event,
  source: Source.App,
  extraAttributes: {},
};

export const OSGEventBuilder = {
  default: () => defaultEvent,
  appOpen: () => ({ ...defaultEvent, action: Action.AppOpen }),
  appUnsubscribe: () => ({ ...defaultEvent, action: Action.AppUnsubscribe }),
  productImpression: (products: OSGProduct[]) => ({
    ...defaultEvent,
    hitType: HitType.PageView,
    products,
  }),
  productClicked: (products: OSGProduct[]) => ({
    ...defaultEvent,
    action: Action.ClickProduct,
    category: Category.Ecommerce,
    products: products,
  }),
  addToWishlist: (products: OSGProduct[]) => ({
    ...defaultEvent,
    action: Action.AddToWishlist,
    category: Category.Ecommerce,
    products: products,
  }),
  addToCart: (products: OSGProduct[]) => ({
    ...defaultEvent,
    action: Action.AddToCart,
    category: Category.Ecommerce,
    products: products,
  }),
  removeFromCart: (products: OSGProduct[]) => ({
    ...defaultEvent,
    action: Action.RemoveFromCart,
    category: Category.Ecommerce,
    products: products,
  }),
  checkout: (products: OSGProduct[]) => ({
    ...defaultEvent,
    action: Action.Checkout,
    category: Category.Ecommerce,
    products: products,
  }),
  purchase: (
    transactionId: string,
    revenue: number,
    products: OSGProduct[]
  ) => ({
    ...defaultEvent,
    action: Action.Purchase,
    category: Category.Ecommerce,
    transactionId,
    transactionRevenue: revenue,
    products: products,
  }),
  refund: (transactionId: string, revenue: number, products: OSGProduct[]) => ({
    ...defaultEvent,
    action: Action.Refund,
    category: Category.Ecommerce,
    transactionId,
    transactionRevenue: revenue,
    products: products,
  }),
  completeRegistration: (label: { [key: string]: any }) => ({
    ...defaultEvent,
    action: Action.CompleteRegistration,
    category: Category.Ecommerce,
    label,
  }),
  search: (label: { [key: string]: any }) => ({
    ...defaultEvent,
    action: Action.Search,
    category: Category.Search,
    label,
  }),
  custom: (action: string, value?: string) => ({
    ...defaultEvent,
    action,
    value,
  }),
};
