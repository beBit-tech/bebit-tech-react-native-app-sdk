#ifdef RCT_NEW_ARCH_ENABLED
// 新架構: 使用 Codegen 生成的 Spec
#import "BebitTechReactNativeAppSdkSpec.h"
@interface RCT_EXTERN_MODULE(BebitTechReactNativeAppSdk, NSObject<NativeBebitTechReactNativeAppSdkSpec>)
#else
// 舊架構: 使用 RCTBridgeModule
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BebitTechReactNativeAppSdk, NSObject<RCTBridgeModule>)
#endif

RCT_EXTERN_METHOD(setAppId:(NSString *)id)
RCT_EXTERN_METHOD(setAppVersion:(NSString *)version)
RCT_EXTERN_METHOD(setAppName:(NSString *)name)
RCT_EXTERN_METHOD(setDeviceId:(NSString *)id)
RCT_EXTERN_METHOD(login:(NSString *)uid)
RCT_EXTERN_METHOD(logout)
RCT_EXTERN_METHOD(setCurrentPage:(NSString *)pageKey)
RCT_EXTERN_METHOD(setFCMToken:(NSString *)token)
RCT_EXTERN_METHOD(setUid:(NSString *)uid)
RCT_EXTERN_METHOD(clearUid)
RCT_EXTERN_METHOD(setPopupRedirectCallback:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(trackEvent:(NSString *)eventJsonString)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

// 新架構: TurboModule，JavaScript 可以直接用 Native 方法
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    // 不需要通過 bridge 排隊
    return std::make_shared<facebook::react::NativeBebitTechReactNativeAppSdkSpecJSI>(params);
}
#endif
@end
