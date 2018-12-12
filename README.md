

Install Parcel
```
$ mkdir app

$ cd app && yarn init

$ yarn global add parcel-bundler

```

Add index.html
```
# index.html

<html>
<body>
  <script src="./src/index.js"></script>
</body>
</html>
```

Add entry point
```
$ mkdir src && cd src && touch index.js

$ parcel index.html
```
