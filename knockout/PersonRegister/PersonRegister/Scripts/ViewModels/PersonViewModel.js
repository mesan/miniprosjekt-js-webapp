define(["jQuery", "Knockout", "ApiConnection"],
function ($, ko, ApiConnection) {

    function PersonViewModel() {

        var self = this;
        self.personer = ko.observable();

        var api = new ApiConnection("http://restapi.apphb.com/api/person");

        api.getAll(function (result) {
            self.personer(result);
        });

    }

    return PersonViewModel;

});