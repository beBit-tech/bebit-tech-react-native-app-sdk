package com.bebittechreactnativeappsdk;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;

import java.util.HashMap;
import java.util.Map;

public class BebitTechReactNativeAppSdkPackage extends TurboReactPackage {
    @Nullable
    @Override
    public NativeModule getModule(String name, ReactApplicationContext reactContext) {
        if (name.equals(OmniSegmentModule.NAME)) {
            return new OmniSegmentModule(reactContext);
        }
        return null;
    }

    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        return () -> {
            final Map<String, ReactModuleInfo> moduleInfo = new HashMap<>();

            boolean isTurboModule = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
            moduleInfo.put(
                OmniSegmentModule.NAME,
                new ReactModuleInfo(
                    OmniSegmentModule.NAME, // 模組名稱，用於 JS 端
                    OmniSegmentModule.NAME, // 模組類名
                    false, // canOverrideExistingModule：是否可被覆蓋
                    false, // needsEagerInit：是否需要在 app 啟動時就初始化
                    true, // hasConstants：是否包含常數
                    false, // isCxxModule：是否是 C++ 模組，純 Java 模組設為 false
                    isTurboModule // 是否是 Turbo Module，新架構設為 true
                )
            );
            return moduleInfo;
        };
    }
}