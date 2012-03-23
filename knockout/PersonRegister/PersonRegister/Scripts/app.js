define([
  "jQuery",
   "Underscore",
   "Knockout",
   "ViewModels/PersonViewModel",
   "Models/Person"
], function ($, _, ko, PersonViewModel, Person) {

    function init() {

        var person = new Person();
        person.name = "Ola Normann";

        var viewModel = new PersonViewModel(person);

        ko.applyBindings(viewModel, $("#person").get(0));
    }

    return {
        init: init
    };
});


