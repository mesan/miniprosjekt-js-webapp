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

PersonApp.ListeView = Ember.View.extend({
  people: [ { name: 'Yehuda' },
    { name: 'Tom' } ]
});


/**
 * Url håndtering.
 *
 * Ulike sider:
 * - index.html#posts
 * - index.html#posts/1
 * - index.html#projects
 *
 * Kan også bruke html5 url'er, men det er litt mer knotete.
 */

PersonApp.postsView = Ember.View.create({
  template:Ember.Handlebars.compile("<h1>POSTS</h1><p>State: {{PersonApp.routeManager.currentState.path}}</p>")
});

PersonApp.projectsView = Ember.View.create({
  template:Ember.Handlebars.compile("<h1>PROJECTS</h1><p>State: {{PersonApp.routeManager.currentState.path}}</p>")
});

PersonApp.routeManager = Ember.RouteManager.create({

  posts: Ember.ViewState.create({
    route: 'posts', // defines a static route
    view: PersonApp.postsView,

    index: Ember.State.create({}), // default state

    show: Ember.State.create({
      route: ':id', // defines a nested dynamic route
      enter: function(stateManager, transition) {
        this._super(stateManager, transition);
        var params = stateManager.get('params');
        var postId = params.id;
        // do something here with postId
      }
    })
  }),

  projects: Ember.ViewState.create({
    route: 'projects',
    view: PersonApp.projectsView
  })

});

PersonApp.routeManager.start();
