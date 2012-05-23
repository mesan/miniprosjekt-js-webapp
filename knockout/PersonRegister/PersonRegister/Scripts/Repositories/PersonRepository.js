/*global define */
define(["ApiConnection"], function (ApiConnection) {
	function PersonRepository() {

		var self = this,
			api = new ApiConnection("http://restapi.apphb.com/api/person");

		self.getAll = function (callback) {
			api.getAll(callback);
		};

		// Eksempel med deferred
		self.update = function (person) {
			return api.update(person);
		};

		self.add = function (person, callback) {
			api.add(person, callback);
		};

		self.remove = function (person, callback) {
			api.remove(person, callback);
		};

		return self;
	}

	return PersonRepository;

});