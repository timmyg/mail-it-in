Meteor.publish('my.cards', function() {
  return Cards.find({
    userId: this.userId
  });
});
