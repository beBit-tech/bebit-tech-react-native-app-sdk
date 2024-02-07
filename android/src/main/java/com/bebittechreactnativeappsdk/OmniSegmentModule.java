package com.bebittechreactnativeappsdk;

import android.app.Application;
import android.util.Log;

import androidx.annotation.NonNull;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;

import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.HashMap;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.bebittech.omnisegment.OmniSegment;
import com.bebittech.omnisegment.OSGEvent;
import com.bebittech.omnisegment.OSGRecommendRequest;
import com.bebittech.omnisegment.OSGRecommendProduct;

@ReactModule(name = OmniSegmentModule.NAME)
public class OmniSegmentModule extends ReactContextBaseJavaModule {
  public static final String NAME = "BebitTechReactNativeAppSdk";

  public OmniSegmentModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  static public void initialize(Application application, String apiKey, String tid) {
    OmniSegment.initialize(application, apiKey, tid);
  }

  static public void enableDebugLogs(Boolean enable) {
    OmniSegment.enableDebugLogs(enable);
  }

  @ReactMethod
  public void setAppId(String appId) {
    OmniSegment.setAppId(appId);
  }

  @ReactMethod
  public void setAppVersion(String appVersion) {
    OmniSegment.setAppVersion(appVersion);
  }

  @ReactMethod
  public void setDeviceId(String deviceId) {
    OmniSegment.setDeviceId(deviceId);
  }

  @ReactMethod
  public void login(String userId) {
    OmniSegment.login(userId);
  }

  @ReactMethod
  public void logout() {
    OmniSegment.logout();
  }

  @ReactMethod
  public void setCurrentPage(String pageKey) {
    OmniSegment.setCurrentPage(pageKey);
  }

  @ReactMethod
  public void setFCMToken(String token) {
    OmniSegment.setFCMToken(token);
  }

  @ReactMethod
  public void trackEvent(String eventJsonString) {
    try {
      JSONObject eventJson = new JSONObject(eventJsonString);
      Map<String, Object> eventMap = toMap(eventJson);
      OSGEvent event = OSGEvent.custom("", null);
      event.appendAttributes(eventMap);
      OmniSegment.trackEvent(event);
    } catch (Exception e) {
      e.printStackTrace();
      Log.e("OmniSegmentModule", "Error parsing event json: " + e.getMessage());
    }
  }

  @ReactMethod
  public void fetchRecommendProducts(String requestJsonString, Promise promise) {
    try {
      JSONObject requestJson = new JSONObject(requestJsonString);
      OSGRecommendRequest request = toRecommendRequest(requestJson);
      OmniSegment.fetchRecommendProduct(request, new OSGRecommendRequest.Callback() {
        @Override
        public void onComplete(List<OSGRecommendProduct> products) {
          try {
            JSONArray results = new JSONArray();
            for (OSGRecommendProduct product : products) {
              results.put(recommendProductToJSONObject(product));
            }
            promise.resolve(results.toString());
          } catch (Exception e) {
            e.printStackTrace();
            promise.reject("Error", e.getMessage());
          }
        }
      });
    } catch (Exception e) {
      e.printStackTrace();
      promise.reject("Error", e.getMessage());
    }
  }

  // Utils
  Map<String, Object> toMap(JSONObject json) throws JSONException {
    Map<String, Object> map = new HashMap<String, Object>();
    Iterator<String> keysItr = json.keys();
    while (keysItr.hasNext()) {
      String key = keysItr.next();
      Object value = json.get(key);
      if (value instanceof JSONArray) {
        value = toList((JSONArray) value);
      } else if (value instanceof JSONObject) {
        value = toMap((JSONObject) value);
      }
      map.put(key, value);
    }
    return map;
  }

  List<Object> toList(JSONArray array) throws JSONException {
    List<Object> list = new ArrayList<Object>();
    for (int i = 0; i < array.length(); i++) {
      Object value = array.get(i);
      if (value instanceof JSONArray) {
        value = toList((JSONArray) value);
      } else if (value instanceof JSONObject) {
        value = toMap((JSONObject) value);
      }
      list.add(value);
    }
    return list;
  }

  OSGRecommendRequest toRecommendRequest(JSONObject json) throws JSONException {
    String type = json.optString("type");
    Integer quantity = json.optInt("quantity");
    OSGRecommendRequest request = new OSGRecommendRequest(type, quantity);

    if (json.has("productIds")) {
      request.productIds = toArrayList(json.getJSONArray("productIds"));
    }
    if (json.has("productTags")) {
      request.productTags = toArrayList(json.getJSONArray("productTags"));
    }
    if (json.has("productCategories")) {
      request.productCategories = toArrayList(json.getJSONArray("productCategories"));
    }
    if (json.has("excludedProductIds")) {
      request.excludedProductIds = toArrayList(json.getJSONArray("excludedProductIds"));
    }
    if (json.has("excludedProductTags")) {
      request.excludedProductTags = toArrayList(json.getJSONArray("excludedProductTags"));
    }

    return request;
  }

  ArrayList<String> toArrayList(JSONArray array) throws JSONException {
    ArrayList<String> list = new ArrayList<String>();
    for (int i = 0; i < array.length(); i++) {
      list.add(array.getString(i));
    }
    return list;
  }

  JSONObject recommendProductToJSONObject(OSGRecommendProduct product) {
    JSONObject json = new JSONObject();
    try {
      json.put("product_id", product.id);
      json.put("product_name", product.name);
      json.put("product_price", product.price);
      json.put("product_url", product.url);
      json.put("photo_url", product.imageUrl);
      json.put("special_price", product.specialPrice);

      JSONArray additionalImages = new JSONArray();
      for (OSGRecommendProduct.AdditionalImage additionalImage : product.additionalImages) {
        additionalImages.put(additionalImageToJSONObject(additionalImage));
      }

      json.put("additional_photo_url", additionalImages);
    } catch (JSONException e) {
      e.printStackTrace();
    }
    return json;
  }

  JSONObject additionalImageToJSONObject(OSGRecommendProduct.AdditionalImage additionalImage) {
    JSONObject object = new JSONObject();
    try {
      object.put("name", additionalImage.name);
      object.put("link", additionalImage.url);
    } catch (JSONException e) {
      e.printStackTrace();
    }
    return object;
  }
}
