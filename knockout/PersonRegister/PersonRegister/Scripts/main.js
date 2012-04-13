require.config({
  paths: {
    "order":      "lib/require/order",
    "jQuery":     "lib/require/require-jQuery",
	"Underscore": "lib/require/require-underscore",
    "Knockout":   "lib/require/require-knockout",
    "Upshot":     "lib/require/require-upshot",
    "Template":   "lib/require/require-query.tmpl"
	}
});

require([
  "app",
  "lib/require/order!lib/jquery-1.7.1",
  "lib/require/order!lib/underscore",
  "lib/require/order!lib/jquery-pubsub",
  "lib/require/order!lib/jquery.tmpl",
  "lib/require/order!lib/knockout"
	], function (app) {
		app.init();
	});