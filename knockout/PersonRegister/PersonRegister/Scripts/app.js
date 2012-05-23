/*global define, console */
define([
  "Knockout",
  "Sammy",
  "ViewModels/PersonViewModel"
], function (ko, Sammy, PersonViewModel) {

	function init() {
		try {
			var viewModel = new PersonViewModel();

			ko.applyBindings(viewModel);
			viewModel.loadPersons();
			
			Sammy(function () {
				this.get('#', viewModel.index);
				this.get('#new', viewModel.newPerson);
				this.get('', function () { this.app.runRoute('get', '#'); });
			}).run();
		}
		catch (err) {
			console.log("feil i app! " + err);
		}
	}

	return {
		init: init
	};
});


