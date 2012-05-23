define(['ViewModels/PersonViewModel', 'sinon'], function (PersonViewModel, sinon) {

	describe("PersonViewModel", function () {

		it("should have an updatePerson function", function () {
			var personRepoStub = sinon.stub();
			var personViewModel = new PersonViewModel(personRepoStub);

			expect(typeof (personViewModel.updatePerson)).toEqual("function");
		});

		it("should pass", function () {
			expect("a").toEqual("a");
		});

	});
});