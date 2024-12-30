import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

// its needed for codegen to work
export interface Spec extends TurboModule {
  setAppId(appId: string): void;
  setAppVersion(version: string): void;
  setAppName(name: string): void;
  setDeviceId(deviceId: string): void;
  login(uid: string): void;
  logout(): void;
  setCurrentPage(pageKey: string): void;
  setFCMToken(token: string): void;
  setUid(uid: string): void;
  clearUid(): void;
  setPopupRedirectCallback(callback: (url: string) => void): void;
  trackEvent(eventJsonString: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'BebitTechReactNativeAppSdk'
);
