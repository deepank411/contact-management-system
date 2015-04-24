Template.contactSubmit.created = function(){
  if (!Meteor.userId()) {
    Router.go('/')
  }
}
Template.contactSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var contact = {
      name: $(e.target).find('[name=name]').val(),
      email: $(e.target).find('[name=email]').val(),
      phone: $(e.target).find('[name=phone]').val(),
      address: $(e.target).find('[name=address]').val(),
    };
    
    var image = Session.get('newImage')

    if(image && image.path)
      contact.image = 'images'+image.path
    else
      contact.image = ''

    Session.set('newImage', '')

    Meteor.call('contact', contact);
    Router.go('/contact');
  }
});

Template.contactSubmit.helpers({
  myFormData: function() {
    return { directoryName: 'images', prefix: this._id, _id: this._id }
  },
  filesToUpload: function() {
    return Uploader.info.get();
  }
});
