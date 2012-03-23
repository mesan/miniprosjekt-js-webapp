EmberApp = Ember.Application.create();

EmberApp.Person = Ember.Object.extend({
  navn : "",
  alder : 0
});

var person1 = EmberApp.Person.create({navn: "Gunnar", alder: 6});
var person2 = EmberApp.Person.create({navn: "Lars", alder: 4});

EmberApp.personController = Ember.ArrayController.create({
  content : [person1, person2]
});


setTimeout(function() {
  person1.set("navn", "apen svinger seg i treet");
  person2.set("alder", 1000);
}, 5000);
