Contacts = new Mongo.Collection('contacts');

Contacts.allow({
  update: function(userId, contact) {
    return ownsDocument(userId, contact);
  },
  remove: function(userId, contact) {
    return ownsDocument(userId, contact);
  }
});
if (Meteor.isServer){
  Meteor.methods({
    contact: function(contactAttributes) {
      var user = Meteor.user();

      if(!user)
        throw new Meteor.Error(401, "Log in to enter new contact");

      var contact = _.extend(_.pick(contactAttributes, 'name', 'email', 'phone', 'address', 'image'), {
        userId: user._id
      });

      var contactId = Contacts.insert(contact);
      return contactId;
    }
  });
}