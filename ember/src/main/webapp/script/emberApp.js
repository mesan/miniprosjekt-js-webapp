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
  test : 'Test',

  init: function() {
    console.log(this);
    self = this;
    var personService = PersonApp.PersonService.create({url: "http://restapi.apphb.com/api/person"});
    personService.hentAlle(self.settPersoner);
  },

  settPersoner : function(personer) {
    //Ember.ArrayController.pushObjects.apply(personer)
    console.log(personer);
    //self.set('content', personer);
    self.pushObjects(personer);
    console.log(self);
  },
  personer : self.test
});


setTimeout(function() {
  person1.set("navn", "apen svinger seg i treet");
  person2.set("alder", 1000);
}, 5000);
