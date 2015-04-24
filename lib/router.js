Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/', function() {
  this .render('homePage');
});

Router.route('/contact', function() {
  this .render('contactsList');
});

// Router.route('/submit', function() {
//   this .render('contactSubmit');
// });

Router.map(function () {
  this.route('contactSubmit', {
    path: '/submit',
    waitOn: function() {
      return [
        Meteor.subscribe('items'),
        Meteor.subscribe('uploads')
      ];
    },
    data: function() {
      return {
        item: Items.findOne(),
        uploads: Uploads.find()
      }
    }
  });
});

Router.route('/edit/:_id', function() {
  var cont = Contacts.findOne({_id : this.params._id});
  this.render('contactEdit', {data: cont});
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {only: 'contactSubmit'});
