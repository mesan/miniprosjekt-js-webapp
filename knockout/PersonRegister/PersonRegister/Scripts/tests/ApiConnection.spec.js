define(['ApiConnection', 'sinon'], function (ApiConnection, sinon) {

	describe("ApiConnection", function () {

		beforeEach(function () {
			this.server = sinon.fakeServer.create();
		});

		afterEach(function () {
			this.server.restore();
		});

		it("should get all as json", function () {
			var url = "min/tilfeldige/url";

			var apiConnection = new ApiConnection(url);

			this.server.respondWith("GET", url,
                                 [200, { "Content-Type": "application/json" } ,
                                 '[{ "id": 12, "name": "Gustav" }]']);

			var callback = sinon.spy();
			apiConnection.getAll(url, callback);
			this.server.respond();
			debugger;
			expect(callback.calledWith([{ id: 12, name: "Gustav"}])).toBeTruthy();
		});
	});
});