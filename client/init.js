Meteor.startup(function() {
  Uploader.finished = function(index, file) {
  	Session.set('newImage', file)
    Uploads.insert(file);
  }
});