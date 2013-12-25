var koa = require("koa");

function koamotive() {
	var app = koa.apply(this, arguments);

	// Create the routes store
	app._routes = {};

	/**
	 * Bind a method:path to a callback
	 * @param  {String}   method   Http method
	 * @param  {String}   path     
	 * @param  {Function} callback GeneratorFunction
	 * @return {null}            
	 */
	app.method = function(method, path, callback) {
		var hash = method.toUpperCase() + ":" + path;
		if(app._routes[hash]) throw new Error("Route already exists at " + hash);
		app._routes[hash] = callback;
	};

	// Add the proxies
	["get", "put", "post", "delete"].forEach(function(method) {
		app[method] = app.method.bind(app, method);
	});

	// Add in the router middleware
	app.use(function *router(next) {
		// Beauty of the generators
		// Yield for all other middleware
		// So were the bottom of the list
		yield next;

		var callback = app._routes[this.req.method + ":" + this.req.url];
		if(callback) {
			var gen = callback.call(this);
			gen.next(); // Call the middleware
		}
	});

	return app;
}

module.exports = koamotive;