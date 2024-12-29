#import <Foundation/Foundation.h>

// 檢查是否使用新架構
#ifdef RCT_NEW_ARCH_ENABLED
// 導入 Codegen 生成的檔案，包含 NativeBebitTechReactNativeAppSdkSpec
#import "BebitTechReactNativeAppSdkSpec.h"

// 在新架構下
@interface BebitTechReactNativeAppSdk : NSObject <NativeBebitTechReactNativeAppSdkSpec>
#else
// 橋接 JS 與 native
#import <React/RCTBridgeModule.h>
// 在舊架構下，只需要 RCTBridgeModule
@interface BebitTechReactNativeAppSdk : NSObject <RCTBridgeModule>
#endif
@end