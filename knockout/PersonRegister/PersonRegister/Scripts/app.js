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
                            viewModel.loadPersons();
                        });

                        this.get('#new', function () {
                            viewModel.chosenFolderId(this.params.folder);
                            viewModel.chosenFolderData(null);
                            $.get("/mail", { mailId: this.params.mailId }, viewModel.chosenMailData);
                        });

                        this.get('', function () { this.app.runRoute('get', '#Inbox') });
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


