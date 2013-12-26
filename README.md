# Koamotive
Koamotive is an attempt to implement functionality lost in the transition from Express to Koa.

## Usage
Koamotive just an extension of the `koa` object so it works as a drop in replacment. First install via npm:

	$ npm install koamotive

Next, require `koamotive` instead of `koa`.

```js
var koa = require("koamotive"),
	app = koa();

app.use(function*() {}); // Everything works as expected

// New koamotive methods
app.get("/path", function*() {
	this.body = "Hello world!";
});

app.listen(80);
```

## Features
### Router
Basic router functionality. `app.[get|post|put|delete](path, callback)`. 

Example:
	
```js
app.get("/home", function*() {
	this.body = "Hello world!";
});
```

## License
MIT