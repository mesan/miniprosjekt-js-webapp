EmberApp = Ember.Application.create();

EmberApp.Person = Ember.Object.extend({
  navn : "",
  alder : 0
});


console.log("start lager personController med Gunnar");

EmberApp.personController = Ember.ArrayController.create({
  content : [EmberApp.Person.create({navn: "Gunnar", alder: 6}), EmberApp.Person.create({navn: "Ola", alder: 7})],
});
console.log("ferdig lager personController med Gunnar");
