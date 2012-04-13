define(["jQuery", "Knockout", "Repositories/PersonRepository"],
function ($, ko, PersonRepository) {

    function PersonViewModel() {

        var self = this;
        var personRepo = new PersonRepository();

        self.personer = ko.observable();

        var loadPersons = function () {
            personRepo.getAll(function (result) {
                self.personer(result);
            });
        };


        var state = "view";
        var selectedTemplate = ko.observable("personList");
        self.templateName = function (item) { return selectedTemplate() };

        self.selectedPersonId = null;


        self.updatePerson = function () {
            self.people.remove(this);
            self.selectedPersonId = null;
        }

        loadPersons();
    }

    return PersonViewModel;

});