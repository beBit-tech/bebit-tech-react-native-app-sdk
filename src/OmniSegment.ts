import { NativeModules } from 'react-native';
import { Action, type OSGEvent } from './OSGEvent';
import type { OSGProduct } from './OSGProduct';
import type {
  AdditionalImage,
  OSGRecommendProduct,
  OSGRecommendRequest,
} from './OSGRecommend';

var fcmToken = '';
const native = NativeModules.BebitTechReactNativeAppSdk;

type OmniSegmentType = {
  setAppId: (appId: string) => void;
  setAppVersion: (version: string) => void;
  setAppName: (name: string) => void;
  setDeviceId: (deviceId: string) => void;

  login: (uid: string) => void;
  logout: () => void;

  setCurrentPage: (pageName: string) => void;
  setFCMToken: (token: string) => void;
  trackEvent: (event: OSGEvent) => void;
  fetchRecommendProducts: (
    request: OSGRecommendRequest
  ) => Promise<OSGRecommendProduct[]>;
};

const OmniSegment: OmniSegmentType = {
  setAppId: (appId: string) => {
    native.setAppId(appId);
  },

  setAppVersion: (version: string) => {
    native.setAppVersion(version);
  },

  setAppName: (name: string) => {
    native.setAppName(name);
  },

  setDeviceId: (deviceId: string) => {
    native.setDeviceId(deviceId);
  },

  login: (uid: string) => {
    native.login(uid);
  },

  logout: () => {
    native.logout();
  },

  setCurrentPage: (pageName: string) => {
    native.setCurrentPage(pageName);
  },

  setFCMToken: (token: string) => {
    fcmToken = token;
    native.setFCMToken(token);
  },

  trackEvent: (event: OSGEvent) => {
    if (
      event.action === Action.AppOpen ||
      event.action === Action.AppUnsubscribe
    ) {
      event.extraAttributes.fcm_token = fcmToken;
    }
    native.trackEvent(OSGEventToJSONString(event));
  },

  fetchRecommendProducts: (
    request: OSGRecommendRequest
  ): Promise<OSGRecommendProduct[]> => {
    return native
      .fetchRecommendProducts(JSON.stringify(request))
      .then((jsonString: string) => {
        const jsonObject = JSON.parse(jsonString) as any[];
        return jsonObject.map((product) => ({
          id: product.product_id,
          name: product.product_name,
          price: product.product_price,
          url: product.product_url,
          imageUrl: product.photo_url,
          additionalImages: product.additional_photo_url.map(
            (item: Object) => item as AdditionalImage
          ),
          specialPrice: product.special_price,
        }));
      });
  },
};

export default OmniSegment;

// Utils
function OSGEventToJSONString(event: OSGEvent): String {
  const { extraAttributes } = event;

  const eventDict: { [key: string]: any } = {
    app_version: event.appVersion,
    app_id: event.appId,
    app_name: event.appName,
    data_source: event.source,
    event_action: event.action,
    event_value: event.value,
    event_label: JSON.stringify(event.label),
    event_category: event.category,
    hit_type: event.hitType,
    document_location: event.location,
    document_title: event.locationTitle,
    products: event.products?.map(OSGProductToJSONString),
    currency_code: event.currencyCode,
    transaction_id: event.transactionId,
    transaction_revenue: event.transactionRevenue,
    transaction_tax: event.transactionTax,
    transaction_shipping: event.transactionShipping,
    transaction_couponcode: event.transactionCouponCode,
    ...extraAttributes,
  };

  return JSON.stringify(eventDict);
}

function OSGProductToJSONString(product: OSGProduct): { [key: string]: any } {
  const { customAttributes, ...rest } = product;
  const productDict = {
    ...rest,
    ...customAttributes,
  };

  return productDict;
}
