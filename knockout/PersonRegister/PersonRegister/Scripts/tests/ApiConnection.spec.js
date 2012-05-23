define(['ApiConnection', 'sinon'], function (ApiConnection, sinon) {

	describe("ApiConnection", function () {

		beforeEach(function () {
			this.server = sinon.fakeServer.create();
		});

		afterEach(function () {
			this.server.restore();
		});

		it("getAll should call callback with json result", function () {
			// Arrange
			var url = "min/tilfeldige/url",
				apiConnection = new ApiConnection(url),
				callback = sinon.spy();

			this.server.respondWith("GET", url,
                                 [200, { "Content-Type": "application/json" },
                                 '[{ "id": 12, "name": "Gustav" }]']);
			// Act
			apiConnection.getAll(callback);
			this.server.respond();
			
			// Assert
			expect(callback.calledWith([{ id: 12, name: "Gustav"}])).toBeTruthy();
		});
	});
});