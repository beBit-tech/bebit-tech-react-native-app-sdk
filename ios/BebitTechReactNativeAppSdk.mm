#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BebitTechReactNativeAppSdk, NSObject)

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
RCT_EXTERN_METHOD(trackEvent:(NSString *)eventJsonString)
RCT_EXTERN_METHOD(fetchRecommendProducts:(NSString *)requestJsonString withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
