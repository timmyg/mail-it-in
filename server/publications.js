Meteor.publish('my.cards', function() {
  return Sources.find({
    userId: this.userId
  });
});
