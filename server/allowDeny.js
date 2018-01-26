Sources.allow({
  insert: function(userId, doc, fields, modifier) {
    if (userId && doc.userId === userId) {
      return true;
    }
  }
});

Orders.allow({
  update: function(userId, doc, fields, modifier) {
    console.log(Roles.userIsInRole(userId, ["admin"]));
    if ((userId && doc.userId === userId) || Roles.userIsInRole(userId, ["admin"])) {
      return true;
    }
  }
});
