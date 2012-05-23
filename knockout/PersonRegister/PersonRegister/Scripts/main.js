/*global require */

require.config({
  paths: {
    "order":      "lib/require/order",
    "jQuery":			"lib/require/require-jquery",
		"Underscore":	"lib/require/require-underscore",
    "Knockout":   "lib/knockout",
    "Sammy":      "lib/require/require-sammy"
	}
});

require([
  "app",
  "lib/require/order!lib/jquery-1.7.1.min",
  "lib/require/order!lib/underscore",
  "lib/require/order!lib/jquery-pubsub",
  "lib/require/order!lib/sammy-latest.min"
	],
    function (app) {
    	try {
    		app.init();
    	}
    	catch (err) {
    		conole.log("feil i main! " + err);
    	}
    });