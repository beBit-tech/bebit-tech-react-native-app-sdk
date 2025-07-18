import type { Spec } from './NativeBebitTechReactNativeAppSdk';
import { TurboModuleRegistry } from 'react-native';

import { Action, type OSGEvent, OSGEventBuilder } from './OSGEvent';
import type { OSGProduct } from './OSGProduct';

var fcmToken = '';
var webViewLocation = '';

class TrackingApi {
  static callTrackingURL(
    urlString: string,
    completion: (result: string) => void
  ) {
    const modifiedURL = this.modifyTrackingURL(urlString);

    fetch(modifiedURL, { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((responseString) => {
        completion(responseString);
      })
      .catch((error) => {
        completion(`Error: ${error.message}`);
      });
  }

  private static modifyTrackingURL(urlString: string): string {
    try {
      const url = new URL(urlString);

      // Find and modify the 'goto' parameter
      url.searchParams.set('goto', '0');

      const modifiedURL = url.toString();
      return modifiedURL;
    } catch (error) {
      return urlString;
    }
  }
}

// 新架構: 使用 JSI 直接共享記憶體，JS 可以直接呼叫 C++ 物件的方法
const native = TurboModuleRegistry.getEnforcing<Spec>(
  'BebitTechReactNativeAppSdk'
);

type OmniSegmentType = {
  setAppId: (appId: string) => void;
  setAppVersion: (version: string) => void;
  setAppName: (name: string) => void;
  setDeviceId: (deviceId: string) => void;

  login: (uid: string) => void;
  logout: () => void;

  setCurrentPage: (pageName: string) => void;
  setFCMToken: (token: string) => void;

  setUid: (uid: string) => void;
  clearUid: () => void;

  setWebViewLocation: (location: string) => void;
  resetWebViewLocation: () => void;

  setPopupRedirectCallback: (callback: (url: string) => void) => void;

  trackEvent: (event: OSGEvent) => void;

  handleWebViewMessage: (message: string) => void;

  handleNotification: (
    pushNotificationData: { [key: string]: any },
    isUserClicked?: boolean
  ) => void;
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

  setUid: (uid: string) => {
    native.setUid(uid);
  },

  clearUid: () => {
    native.clearUid();
  },

  setWebViewLocation: (location: string) => {
    webViewLocation = location;
  },
  resetWebViewLocation: () => {
    webViewLocation = '';
  },
  setPopupRedirectCallback: (callback: (url: string) => void) => {
    native.setPopupRedirectCallback(callback);
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

  handleWebViewMessage: (message: string): boolean => {
    const object = JSON.parse(message);
    if (object.key !== 'bebit-tech' || typeof object.payload !== 'string') {
      return false;
    }

    if (webViewLocation.length > 0) {
      const payload = JSON.parse(object.payload);
      const newPayload = JSON.stringify({
        ...payload,
        document_location: webViewLocation,
      });
      object.payload = newPayload;
    }
    switch (object.name) {
      case 'sendOmniSegmentEvent':
        native.trackEvent(object.payload);
        break;
      default:
        return false;
    }

    return true;
  },

  handleNotification: (
    pushNotificationData: { [key: string]: any },
    isUserClicked: boolean = false
  ) => {
    const data = pushNotificationData.data || {};
    if (isUserClicked) {
      if (
        data.omnisegment_tracking_url &&
        typeof data.omnisegment_tracking_url === 'string'
      ) {
        TrackingApi.callTrackingURL(
          data.omnisegment_tracking_url,
          (result: string) => {
            const event = OSGEventBuilder.productImpression([]);
            event.location = result;
            OmniSegment.trackEvent(event);
          }
        );
      }
      return;
    }
  },
};

export default OmniSegment;

// Utils
function OSGEventToJSONString(event: OSGEvent): string {
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
