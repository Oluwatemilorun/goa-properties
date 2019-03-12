# goa-properties

## Project setup
```
npm install
```

### Add firebase config 
```
echo "# config" >> firebaseConfig.js
```
``` js
// add this to /config/firebase dir and replace with your values
export const config = {
	apiKey:  "firebase API key",
	authDomain: "firebase domain",
	databaseURL: "firebase datase url",
	projectId: "firebase project id",
	storageBucket: "firebase storage bucket",
	messagingSenderId: "firebase sender id"
};
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
