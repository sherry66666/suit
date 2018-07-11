#### Examples:

__1.__ Showing a default debyg search result for a basic document.

```jsx
  sampleDocs = require('../sampleData/Documents').default;

  const { StaticRouter } = require('react-router-dom');
  <StaticRouter context={{}}>
    <DebugSearchResult
      document={sampleDocs.elsalvador}
      position={4}
    />
  </StaticRouter>
```
