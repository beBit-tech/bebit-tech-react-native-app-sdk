import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'bebit-tech-react-native-app-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const BebitTechReactNativeAppSdk = NativeModules.BebitTechReactNativeAppSdk
  ? NativeModules.BebitTechReactNativeAppSdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return BebitTechReactNativeAppSdk.multiply(a, b);
}
