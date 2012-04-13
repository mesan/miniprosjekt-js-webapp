define([
    "jQuery",
    "Underscore",
    "Template",
    "Knockout",
    "ViewModels/PersonViewModel"
], function ($, _, Template, ko, PersonViewModel) {

    function init() {

        var viewModel = new PersonViewModel();

        ko.applyBindings(viewModel, $("#person").get(0));
    }

    return {
        init: init
    };
});


