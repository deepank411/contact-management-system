Template['uploadedInfo'].helpers({
  src: function() {
    if (this.type.indexOf('image') >= 0) {
      return 'upload/' + this.path;
    }
  }
});

// Template['uploadedInfo'].events({
//   'click .deleteUpload':function() {
//     if (confirm('Are you sure?')) {
//       Meteor.call('deleteFile', this._id);
//     }
//   }
// })
