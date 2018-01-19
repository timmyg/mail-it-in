Sources.allow({
  insert: function(userId, doc, fields, modifier) {
    if (userId && doc.userId === userId) {
      return true;
    }
  }
});

Orders.allow({
  update: function(userId, doc, fields, modifier) {
    if (userId && doc.userId === userId) {
      return true;
    }
  }
});
