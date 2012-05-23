/* globals define */
define(["Underscore", "Knockout", "Models/Person", "Repositories/PersonRepository"],
function (_, ko, Person, PersonRepository) {

	function PersonViewModel(_personRepo) {

		var personRepo = _personRepo || new PersonRepository(),
			personer = ko.observableArray(),
		  state = ko.observable("index");

		function loadPersons() {
			personRepo.getAll(function (result) {

				_.each(result, function (person) {
					person.edit = ko.observable(false);
				});

				personer(result);
			});
		};

		function changeState(item) { state(item); };

		function newPerson() { changeState("new"); };

		function index() { changeState("index"); };

		function editPerson() { this.edit(true); };

		function updatePerson() {
			personRepo.update(this, function () { loadPersons(); });
		};

		function deletePerson() {
			personRepo.remove(this, function () { loadPersons(); });
		};

		function addPerson(form) {
			var nPerson = new Person();
			nPerson.name = form.ibname.value;
			nPerson.age = form.ibage.value;
			personRepo.add(nPerson, function () { index(); loadPersons(); });
		};

		return {
			personer: personer,
			state: state,
			loadPersons: loadPersons,
			index: index,
			newPerson: newPerson,
			editPerson: editPerson,
			updatePerson: updatePerson,
			deletePerson: deletePerson,
			addPerson: addPerson
		};
	}

	return PersonViewModel;
});