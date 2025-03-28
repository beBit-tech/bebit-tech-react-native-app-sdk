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
import java.util.function.Consumer;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.bebittech.omnisegment.OmniSegment;
import com.bebittech.omnisegment.OSGEvent;

@ReactModule(name = OmniSegmentModule.NAME)
public class OmniSegmentModule extends BebitTechReactNativeAppSdkSpec {
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
  public void setAppName(String appName) {
    OmniSegment.setAppName(appName);
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
  public void setUid(String uid) {
    OmniSegment.setUid(uid);
  }

  @ReactMethod
  public void clearUid() {
    OmniSegment.clearUid();
  }

  @ReactMethod
  public void setPopupRedirectCallback(final Callback rnCallback) {
      Consumer<String> javaCallback = new Consumer<String>() {
          @Override
          public void accept(String s) {
              rnCallback.invoke(s);
          }
      };

      OmniSegment.setPopupRedirectCallback(javaCallback);
  }


  @ReactMethod
  public void trackEvent(String eventJsonString) {
    try {
      JSONObject eventJson = new JSONObject(eventJsonString);
      Map<String, Object> eventMap = toMap(eventJson);
      String event_action = (String) eventMap.get("event_action");
      OSGEvent event = OSGEvent.custom(event_action, null);
      event.appendAttributes(eventMap);

      if (eventMap.get("event_value") != null) {
        event.value = (String) eventMap.get("event_value");
      }

      if (eventMap.get("event_label") != null) {
        Object eventLabelObj = eventMap.get("event_label");
        if (eventLabelObj instanceof String) {
          String eventLabelStr = (String) eventLabelObj;
          try {
              JSONObject eventLabelJson = new JSONObject(eventLabelStr);
              Map<String, Object> eventLabelMap = toMap(eventLabelJson);
              event.label = eventLabelMap;
          } catch (JSONException e) {
              Log.e("OmniSegmentModule", "Error parsing event_label JSON: " + e.getMessage());
          }
        }
      }


      Log.d("OmniSegmentModule", "Send Event Payload: " + eventJson);

      OmniSegment.trackEvent(event);
    } catch (Exception e) {
      e.printStackTrace();
      Log.e("OmniSegmentModule", "Error parsing event json: " + e.getMessage());
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

  ArrayList<String> toArrayList(JSONArray array) throws JSONException {
    ArrayList<String> list = new ArrayList<String>();
    for (int i = 0; i < array.length(); i++) {
      list.add(array.getString(i));
    }
    return list;
  }
}
