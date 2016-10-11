## 2.0.0

- `StreamPromise.create` has now been renamed to a default function `createStreamPromise`
- Previously this function would reject even if the request body touched the limit, now it only throws when request body grows bigger than the limit

## 1.0.0

- Initial version
