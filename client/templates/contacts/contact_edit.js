Template.contactEdit.created = function(){
  if (!Meteor.userId()) {
    Router.go('/')
  }
}

Template.contactEdit.helpers({
  contact: function() {
    return Contacts.findOne(Session.get('currentContactId'));
  },
  myFormData: function() {
    return { directoryName: 'images', prefix: this._id, _id: this._id }
  },
  filesToUpload: function() {
    return Uploader.info.get();
  }
})

Template.contactEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    var currentContactId = Session.get('currentContactId');

    var contactProperties = {
      name: $(e.target).find('[name=name]').val(),
      email: $(e.target).find('[name=email]').val(),
      phone: $(e.target).find('[name=phone]').val(),
      address: $(e.target).find('[name=address]').val()
    }

    var image = Session.get('newImage')

    if(image && image.path)
      contactProperties.image = 'images'+image.path
    else
      contactProperties.image = ''

     Session.set('newImage', '')

    Contacts.update(currentContactId, {$set: contactProperties}, function(error) {
      if (error) {
        alert(error.reason);
      } else {
        // Router.go('/contact');
        window.open('/contact');
        window.close();
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this contact?")) {
      var currentContactId = Session.get('currentContactId');
      Contacts.remove(currentContactId);
      // Router.go('/contact');
      window.open('/contact');
      window.close();
    }
  },

  'click .deleteUpload': function() {
    Meteor.call('deleteFile', this._id);
  }
});
