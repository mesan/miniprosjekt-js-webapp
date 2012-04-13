PersonApp = Ember.Application.create();

PersonApp.Person = Ember.Object.extend({
  navn : "",
  alder : 0
});

PersonApp.PersonService = Ember.Object.extend({
  url: "",

  hentAlle : function(callback) {
    jQuery.getJSON(this.url, function(jsonpersoner) {
      var personer =[];
      jQuery.each(jsonpersoner, function(indeks, jsonperson){
        personer.push( PersonApp.Person.create({
          navn: jsonperson.name,
          alder: jsonperson.age
        }))
      })

      callback(personer);
    });
  }

});

var person1 = PersonApp.Person.create({navn: "Gunnar", alder: 6});
var person2 = PersonApp.Person.create({navn: "Lars", alder: 4});

PersonApp.personController = Ember.ArrayController.create({
  content : [],
  self : null,

  init: function() {
    self = this;
    self.fyllModell();
  },

  settPersoner : function(personer) {
    self.set('content', personer);
  },

  fyllModell : function() {
    var personService = PersonApp.PersonService.create({url: "http://restapi.apphb.com/api/person"});
    personService.hentAlle(self.settPersoner);
  }
});


setTimeout(function() {
  person1.set("navn", "apen svinger seg i treet");
  person2.set("alder", 1000);
}, 5000);
