Template.contactItem.helpers({
  ownContact: function() {
    return this.userId == Meteor.userId();
  }
});

Template.contactItem.events({
	'click .edit': function(event, Template){
		console.log(this)
		Session.set('currentContactId', this._id)
	}
})