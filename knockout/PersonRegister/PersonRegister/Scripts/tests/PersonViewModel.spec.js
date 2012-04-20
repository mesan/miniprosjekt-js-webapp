define(['ViewModels/PersonViewModel', 'sinon'], function (PersonViewModel, sinon) {

	describe("PersonViewModel", function () {

		beforeEach(function () {
			this.server = sinon.fakeServer.create();
		});

		afterEach(function () {
			this.server.restore();
		});

		it("should have an updatePerson function", function () {
			var personViewModel = new PersonViewModel();
			expect(typeof (personViewModel.updatePerson)).toEqual("function");
		});

		it("should pass", function () {
			expect("a").toEqual("a");
		});

	});
});