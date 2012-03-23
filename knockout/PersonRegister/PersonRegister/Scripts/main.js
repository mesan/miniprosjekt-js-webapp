require.config({
  paths: {
    "order":      "lib/require/order",
    "jQuery":     "lib/require/require-jQuery",
	"Underscore": "lib/require/require-underscore",
    "Knockout":   "lib/require/require-knockout",
    "Upshot":     "lib/require/require-upshot"
	}
});

require([
  "app",
  "lib/require/order!lib/jquery-1.7.1",
  "lib/require/order!lib/underscore",
  "lib/require/order!lib/knockout",
  "lib/require/order!lib/jquery-pubsub"
	], function (app) {
		app.init();
	});