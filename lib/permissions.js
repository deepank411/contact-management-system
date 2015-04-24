ownsDocument = function(userId, doc) { 
  return doc && doc.userId === userId;
}

// check that this userId owns this document