# Track events

Each Event contains bundleId, bundleVersion, appName, deviceId, with the following default values:

| Key        | iOS Default Value                     | Android Default Value      |
| ---------- | ------------------------------------- | -------------------------- |
| appId      | Bundle Identifier                     | App Identifier             |
| appVersion | CFBundleShortVersionString            | PackageInfo versionName.   |
| appName    | CFBundleDisplayName (or CFBundleName) | App Name                   |
| deviceId   | IDFA (or "${IDFV}-IDFV")              | AAID (or "${SSAID}-SSAID") |

You can set these values by yourself:

```typescript
OmniSegment.setBundleId('bundleId');
OmniSegment.setBundleVersion('bundleVersion');
OmniSegment.setAppName('appName');
OmniSegment.setDeviceId('deviceId');
```

> Note: Setting these values will override the default values.

### Track event

Will send a event to OmniSegment server.

```typescript
OmniSegment.trackEvent(OSGEventBuilder.search('...'));
```

### Make a event

You can use build-in events including custom event:

```typescript
let buildInEvent = OSGEventBuilder.search('...');
let customEvent = OSGEventBuilder.custom('...', '...');
```

#### Build-in events

| Event Name            | Static function                                                                |
| --------------------- | ------------------------------------------------------------------------------ |
| App Open              | appOpen()                                                                      |
| App Unsubscribe       | appUnsubscribe()                                                               |
| Product Impression    | productImpression(products: `[OSGProduct]`)                                    |
| Product Click         | productClicked(products: `[OSGProduct]`)                                       |
| Add to Cart           | addToCart(products: `[OSGProduct]`)                                            |
| Remove from Cart      | removeFromCart(products: `[OSGProduct]`)                                       |
| Checkout              | checkout(products: `[OSGProduct]`)                                             |
| Purchase              | purchase(transactionId: `string`, revenue: `Number`, products: `[OSGProduct]`) |
| Refund                | refund(transactionId: `string`, revenue: `Number`, products: `[OSGProduct]`)   |
| Complete Registration | completeRegistration(label: `[string: Any]`) `email, regType is accepted`      |
| Search                | search(label: `[string: Any]`) `search_string is accepted`                     |
| Custom Event          | custom(action: `string`, value: `string`)                                      |

#### Event Properties

| Property Name         | Type                   | Description                                        |
| --------------------- | ---------------------- | -------------------------------------------------- |
| userId                | string                 | User ID. Default is the uid you set before.        |
| deviceId              | string                 | Device ID. If not set, will use default value      |
| bundleId              | string                 | Bundle ID. If not set, will use default value      |
| bundleVersion         | string                 | Bundle Version. If not set, will use default value |
| appName               | string                 | App Name. If not set, will use default value       |
| source                | string                 | Enum `WEB` or `APP`, default is `App`              |
| location              | string?                | The page key where the event is triggered.         |
| locationTitle         | string?                | The page title where the event is triggered.       |
| products              | [OSGProduct]?          | The products related to the event.                 |
| currencyCode          | string?                | The transaction currency code.                     |
| transactionId         | string?                | The transaction ID.                                |
| transactionRevenue    | Number?                | The transaction revenue.                           |
| transactionTax        | string?                | The transaction tax.                               |
| transactionShipping   | string?                | The transaction shipping.                          |
| transactionCouponCode | string?                | The transaction coupon.                            |
| label                 | string?                | Dictionary of event label.                         |
| value                 | string?                | Event value.                                       |
| extraAttributes       | { [key: string]: any } | Extra attributes.                                  |

Besides, you can add custom attributes to the event:

```typescript
let exampleEvent = OSGEventBuilder.search('...');
exampleEvent.extraAttributes = { key: 'value' };
```

> Note: Custom attributes will override the default attributes with the same key.

##### OSGProduct Properties

| Property Name    | Type                    | Description                                                   |
| ---------------- | ----------------------- | ------------------------------------------------------------- |
| id               | string                  | Product ID.                                                   |
| name             | string                  | Product Name.                                                 |
| price            | Number?                 | Product Price.                                                |
| category         | string?                 | Product Category.                                             |
| brand            | string?                 | Product Brand. Use "," to separate multiple product brands.   |
| quantity         | string?                 | Product Quantity.                                             |
| variant          | string?                 | Product specifications, color, size, packaging quantity, etc. |
| sku              | string?                 | Product variant sku number.                                   |
| customAttributes | { [key: string]: any }? | Custom attributes.                                            |

Besides, you can add custom attributes to the event:

```typescript
let exampleProduct = OSGProduct(id: "1", name: "product name");
exampleProduct.customAttributes = { key: 'value'};
```

> Note: Custom attributes will override the default attributes with the same key.
