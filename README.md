# syncp.js

Watch and synchronize files between a source and a destination.
Configuration is a simple key/value JSON object inside `package.json`.

```
"syncp": {
  "assets/background.jpg": "build/assets/background.jpg",
  "config.json": [ "build/config.json", "build2/config.json" ]
}
```

