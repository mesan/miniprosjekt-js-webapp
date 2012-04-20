define([
    "jQuery",
    "Underscore",
    "Template",
    "Knockout",
    "Sammy",
    "ViewModels/PersonViewModel"
], function ($, _, Template, ko, Sammy, PersonViewModel) {


    function init() {
        try {

            var viewModel = new PersonViewModel();

            ko.applyBindings(viewModel);
            viewModel.loadPersons();


            Sammy(function () {
                this.get('#', function () {
                    viewModel.index();
                    viewModel.loadPersons();
                });

                this.get('#new', function () {
                    viewModel.newPerson();
                });

                this.get('', function () { this.app.runRoute('get', '#') });
            }).run();


        }
        catch (err) {
            alert("feil i app! " + err);
        }
    }

    return {
        init: init
    };
});


