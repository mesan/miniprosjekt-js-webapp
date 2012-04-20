define(["ApiConnection", "Models/Person"], function (ApiConnection, Person) {

    function PersonRepository() {

        var self = this;

        var api = new ApiConnection("http://restapi.apphb.com/api/person");

        self.getAll = function (callback) {
            api.getAll(callback);
            
        }

        self.update = function (person, callback) {

            api.update(person, callback);

        }


        self.remove = function (person, callback) {

            api.remove(person, callback);

        }

        return self;
    }

    return PersonRepository;

});