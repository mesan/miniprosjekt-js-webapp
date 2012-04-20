define(["jQuery", "Knockout", "Models/Person", "Repositories/PersonRepository"],
function ($, ko, Person, PersonRepository) {

    function PersonViewModel() {

        var self = this;
        //self.personer = { id: 0, name: "nn", age: "0" };

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
        self.changeState = function (item) { self.state(item); };

        self.newPerson = function () { self.changeState("new"); };

        self.index = function () { self.changeState("index"); };

        self.updatePerson = function () {
            personRepo.update(this, function () { loadPersons() });
        };


        self.deletePerson = function () {
            personRepo.remove(this, function () { loadPersons() });
        };


        self.addPerson = function (form) {
            var nPerson = new Person();
            nPerson.name = form.ibname.value;
            nPerson.age = form.ibage.value;
            personRepo.add(nPerson, function () { index(); loadPersons(); });
        };

        self.loadPersons = loadPersons;

    }

    return PersonViewModel;

});