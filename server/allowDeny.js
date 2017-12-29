Cards.allow({
  insert: function (userId, doc, fields, modifier) {
    if (userId && doc.userId === userId) {
      return true;
    }
  }
});
