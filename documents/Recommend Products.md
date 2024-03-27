# Recommend Products

### 1. Make a request

Using `OSGRecommendRequest` to make a request:

```typescript
const request: OSGRecommendRequest = {
  type: OSGRecommendType.UserItemEmbedding,
  quantity: 2,
};
```

##### Properties

| Property            | Type      | Description                                                                             |
| ------------------- | --------- | --------------------------------------------------------------------------------------- |
| type                | Enum      | The type of recommendation. Has types: `UserItemEmbedding`, `AlsoBought`, `AlsoViewed`. |
| quantity            | Number    | The number of recommendations to return. Max value is 30.                               |
| productIds          | string[]? | The product ids to get recommendations for. Max count is 10.                            |
| productTags         | string[]? | The product tags to get recommendations for.                                            |
| productCategories   | string[]? | The product categories to get recommendations for.                                      |
| excludedProductIds  | string[]? | The product ids to exclude from recommendations. Max count is 10.                       |
| excludedProductTags | string[]? | The product tags to exclude from recommendations.                                       |

### 2. Send the request

To send the request and fetch recommended products, you can use the `fetchRecommendProduct` method in `OmniSegment`:

```typescript
OmniSegment.fetchRecommendProducts(recommendRequest)
           .then(...) // Handle the recommended products
           .catch(...) // Handle the error
```

### 3. Process the recommended products

The recommended products are returned as an array of `OSGRecommendProduct` objects. You can use the `OSGRecommendProduct` object to get the product information.

##### Properties

| Property         | Type              | Description                    |
| ---------------- | ----------------- | ------------------------------ |
| id               | string            | The product id.                |
| name             | string            | The product name.              |
| price            | string            | The product price.             |
| url              | string            | The product url.               |
| imageUrl         | string            | The product image url.         |
| additionalImages | AdditionalImage[] | The product additional photos. |
| specialPrice     | string?           | The product special price.     |

##### AdditionalImage

| Property | Type   | Description     |
| -------- | ------ | --------------- |
| name     | string | The image name. |
| link     | string | The image url.  |
