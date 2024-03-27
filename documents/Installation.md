# Installation

##### Supported versions

- React Native 0.60 and above.
- iOS 15.0 and above.
- Android API XX and above.

### Step 1 - Adding the wrapper

```npm
npm install @bebit-tech/omnisegment
```

### Step 2 - Android Setup

#### Initialize the SDK

In your `MainApplication.java` file, add the following import:

```java
import com.bebittechreactnativeappsdk.OmniSegmentModule;

// ...

@Override
public void onCreate() {
  super.onCreate();
  SoLoader.init(this, /* native exopackage */ false);

  // ...

  OmniSegmentModule.initialize(this, "API-KEY", "TID"); // Add this line

  // ...
}
```

##### Android Permissions

##### INTERNET

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

### Step 3 - iOS Setup

#### Initialize the SDK

In your `AppDelegate.m` file, add the following import:

```objc
#import <OmniSegmentKit/OmniSegmentKit-Swift.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  //...

  [OmniSegment initialize: @"API-KEY" withTid: @"TID"]; // Add this line

  //...
}
```
