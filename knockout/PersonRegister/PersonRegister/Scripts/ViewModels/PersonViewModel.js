define(["jQuery", "Knockout", "Repositories/PersonRepository"],
function ($, ko, PersonRepository) {

    function PersonViewModel() {

        var self = this;
        self.personer = { id: 0, name: "nn", age: "0" };

        var personRepo = new PersonRepository();



        self.personer = ko.observableArray();


        var loadPersons = function () {
            personRepo.getAll(function (result) {
                self.personer(result);
            });
        };


        var state = "view";
        var selectedTemplate = ko.observable("personList");
        self.templateName = function (item) { return selectedTemplate() };

        self.state = ko.observable("index");
        self.changestate = function (item) { self.state(item); };

        self.newperson = function () { self.changestate("new"); };


        self.updatePerson = function () {
            personRepo.update(this, function () { loadPersons() });
        };


        self.deletePerson = function () {
            personRepo.remove(this, function () { loadPersons() });
        };


        self.loadPersons = loadPersons;

    }

    return PersonViewModel;

});