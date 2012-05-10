/*global Ember,jQuery,alert*/

/********
 * Domene
 ********/

PersonApp = Ember.Application.create();

PersonApp.Person = Ember.Object.extend({
  navn : "",
  alder : 0
});

/*********
 * Service
 *********/

PersonApp.PersonService = Ember.Object.extend({
  url: "",

  hentAlle : function (callback) {
    jQuery.getJSON(this.url, function (jsonpersoner) {
      var personer = [];
      jQuery.each(jsonpersoner, function (indeks, jsonperson) {
        personer.push(PersonApp.Person.create({
          navn: jsonperson.name,
          alder: jsonperson.age
        }));
      });

      callback(personer);
    });
  },

  hentPerson : function (callback, id) {
    jQuery.getJSON(this.url, function (jsonpersoner) {
      var person = {};
      jQuery.each(jsonpersoner, function (indeks, jsonperson) {
        if (jsonperson.id == id) {
          person = PersonApp.Person.create({
            navn: jsonperson.name,
            alder: jsonperson.age
          });
        }
      });
      callback(person);
    });
  }

});

/*************
 * Kontrollere
 *************/

PersonApp.personlisteKontroller = Ember.ArrayController.create({
  content : [],
  self : null,

  init: function () {
    self = this;
    self.fyllModell();
  },

  settPersoner : function (personer) {
    self.set('content', personer);
  },

  fyllModell : function () {
    var personService = PersonApp.PersonService.create({url: "http://restapi.apphb.com/api/person"});
    personService.hentAlle(self.settPersoner);
  }
});

PersonApp.personKontroller = Ember.Object.create({
  content : {},
  self : null,

  init: function () {
    self = this;
  },

  settPerson : function (person) {
    self.set('content', person);
  },

  fyllModell : function (id) {
    var personService = PersonApp.PersonService.create({url: "http://restapi.apphb.com/api/person"});
    personService.hentPerson(self.settPerson, id);
  }
});


//setTimeout(function() {
//  person1.set("navn", "apen svinger seg i treet");
//  person2.set("alder", 1000);
//}, 5000);


/*******
 * Views
 *******/

PersonApp.PersonlisteView = Ember.View.extend({
  tagName: 'ul',
  personer: [ { name: 'Yehuda' },
            { name: 'Tom' } ]
});

// Funker ikke
//PersonApp.PersonView = Ember.View.extend({
//  tagName: 'div',
//  navnBinding: PersonApp.personKontroller.content.navn,
//  alderBinding: PersonApp.personKontroller.content.alder
//});

PersonApp.LeggTilPersonView = Ember.View.extend({
  click: function (evt) {
    alert("Legger til person...");
  }
});

PersonApp.EditerPersonView = Ember.View.extend({
  click: function (evt) {
    alert("Editerer person...");
  }
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
  template: Ember.Handlebars.compile("<h1>POSTS</h1><p>State: {{PersonApp.routeManager.params.id}}</p>")
});

PersonApp.projectsView = Ember.View.create({
  template: Ember.Handlebars.compile("<h1>PROJECTS</h1><p>State: {{PersonApp.routeManager.currentState.path}}</p>")
});

PersonApp.routeManager = Ember.RouteManager.create({

  posts: Ember.ViewState.create({
    route: 'posts', // defines a static route
    view: PersonApp.postsView,

    index: Ember.State.create({}), // default state

    show: Ember.State.create({
      route: ':id', // defines a nested dynamic route
      enter: function (stateManager, transition) {
        this._super(stateManager, transition);
        var params = stateManager.get('params');
        var postId = params.id;
        // do something here with postId
        PersonApp.personKontroller.fyllModell(postId);
      }
    })
  }),

  projects: Ember.ViewState.create({
    route: 'projects',
    view: PersonApp.projectsView
  })

});

PersonApp.routeManager.start();
