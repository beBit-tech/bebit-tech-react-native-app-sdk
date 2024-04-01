# Usage

## Set User

After the user logs in, you need to provide the user's uid to the sdk, so that the sdk can use it when sending records.

```typescript
OmniSegment.login('uid');
```

When the user logs out:

```typescript
OmniSegment.logout();
```

## Set Current Page

When the user enters a new page, you need to provide the page key to the sdk, so that the sdk can use it to determine whether to display a popup.

```typescript
OmniSegment.setCurrentPage('page_key');
```

## Set Uid/ Clear Uid

```typescript
OmniSegment.setUid('uid');
OmniSegment.clearUid();
```

## Set Firebase Cloud Messaging Token

> Note: Before using this feature, you need to integrate Firebase SDK into your project and enable GooFirebase services for your app.

You need to provide the user's Firebase Cloud Messaging Token to the sdk, so that the sdk can use it when sending records and push notifications.

```typescript
OmniSegment.setFCMToken('FCM Token');
```
## Managing WebView Document Location

To customize the document location reported in WebView events, use the setWebViewLocation method provided by OmniSegment SDK. This allows for overriding the default document location with a specified string.

```typescript
OmniSegment.setWebViewLocation("location")
```

After setting a custom document location, you may wish to revert to using the default document location in WebView events. Achieve this by invoking the resetWebViewLocation method.

```typescript
OmniSegment.resetWebViewLocation()
```

## Set popup redirect callback

To use your own callback function to handle the redirect url behavior on popup button

```typescript
OmniSegment.setPopupRedirectCallback(_ callback: @escaping (String) -> Void)
```
