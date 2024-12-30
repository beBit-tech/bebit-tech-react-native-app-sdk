package com.bebittechreactnativeappsdk;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;

// For the old architecture.
public abstract class BebitTechReactNativeAppSdkSpec extends ReactContextBaseJavaModule {
    public BebitTechReactNativeAppSdkSpec(ReactApplicationContext context) {
        super(context);
    }

    public abstract void setAppId(String appId);
    public abstract void setAppVersion(String version);
    public abstract void setAppName(String name);
    public abstract void setDeviceId(String deviceId);
    public abstract void login(String userId);
    public abstract void logout();
    public abstract void setCurrentPage(String pageKey);
    public abstract void setFCMToken(String token);
    public abstract void setUid(String uid);
    public abstract void clearUid();
    public abstract void setPopupRedirectCallback(Callback callback);
    public abstract void trackEvent(String eventJsonString);
}