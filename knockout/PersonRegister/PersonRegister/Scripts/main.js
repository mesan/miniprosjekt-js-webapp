require.config({
  paths: {
    "order":      "lib/require/order",
    "jQuery":     "lib/require/require-jQuery",
	"Underscore": "lib/require/require-underscore",
    "Knockout":   "lib/require/require-knockout",
    "Upshot":     "lib/require/require-upshot",
    "Template":   "lib/require/require-query.tmpl",
    "Sammy":      "lib/require/require-sammy"

	}
});

require([
  "app",
  "lib/require/order!lib/jquery-1.7.1",
  "lib/require/order!lib/underscore",
  "lib/require/order!lib/jquery-pubsub",
  "lib/require/order!lib/jquery.tmpl",
  "lib/require/order!lib/knockout",
    "lib/require/order!lib/sammy-latest.min"
	],
    function (app) {
    try {
    app.init();
    }
catch (err) {
    alert("feil i main! " + err)
    }
		
}
    );