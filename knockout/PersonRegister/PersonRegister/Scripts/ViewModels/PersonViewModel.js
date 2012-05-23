/*global define, console */
define(["Underscore", "Knockout", "Models/Person", "Repositories/PersonRepository"],
	function (_, ko, Person, PersonRepository) {
		'use strict';
		
		function PersonViewModel(_personRepo) {
			var self = this,
			  personRepo = _personRepo || new PersonRepository();

			this.personer = ko.observableArray();

			this.loadPersons = function () {
				personRepo.getAll(function (result) {

					_.each(result, function (person) {
						person.edit = ko.observable(false);
					});

					self.personer(result);
				});
			};

			this.state = ko.observable("index");

			this.changeState = function (item) { self.state(item); };

			this.newPerson = function () { self.changeState("new"); };

			this.index = function () { self.changeState("index"); };

			this.editPerson = function () { this.edit(true); };

			// Eksempel med deferred
			this.updatePerson = function () {
				personRepo.update(this)
					.fail(function () { console.log("feil"); })
					.done(function () { self.loadPersons(); })
					.promise(function () { console.log("skjer alltid"); });
			};

			this.deletePerson = function () {
				personRepo.remove(this, function () { self.loadPersons(); });
			};

			this.addPerson = function (form) {
				var nPerson = new Person();
				nPerson.name = form.ibname.value;
				nPerson.age = form.ibage.value;
				personRepo.add(nPerson, function () {
					form.ibname.value = "";
					form.ibage.value = "";
					self.index();
					self.loadPersons();
				});
			};
		}

		return PersonViewModel;
	});