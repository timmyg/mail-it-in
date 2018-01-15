Meteor.publish("packages.all", function() {
  return Packages.find();
});

Meteor.publish("package", function(packageId) {
  console.log("packageId", packageId);

  return Packages.find(packageId);
});

Meteor.publish("my.sources", function() {
  return Sources.find({
    userId: this.userId
  });
});

Meteor.publish("cards.all", function() {
  return Cards.find();
});
