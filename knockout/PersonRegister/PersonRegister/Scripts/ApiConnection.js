define(["jQuery"], function ($) {

    function ApiConnection(url) {

        var self = this;

        self.getAll = function (callback) {
            $.getJSON(url, callback);
        }

        self.getById = function (id, callback) {
            $.getJSON(url + '/' + id, callback);
        }

        self.update = function (entity, callback) {
            //$.post(url, entity, callback);
            $.ajax({type:'put',data: entity, url: url}).done(callback);
        }

        self.remove = function (entity, callback) {
            $.ajax({ type: 'delete', data: entity, url: url }).done(callback);
        }


        return self;

    }

    return ApiConnection;

});