Meteor.publish("packages.all", function() {
  return Packages.find();
});

Meteor.publish("package", function(packageId) {
  return Packages.find(packageId);
});

Meteor.publish("sources.mine", function() {
  return Sources.find({
    userId: this.userId
  });
});

Meteor.publish("cards.all", function() {
  return Cards.find();
});

// Meteor.publish("cards.ids", function(cardIds) {
//   return Cards.find({ _id: { $in: cardIds } });
// });

Meteor.publish("order.mine", function() {
  return Orders.find({ userId: this.userId });
});

Meteor.publish("order.cards", function(argument) {
  const order = Orders.findOne({ userId: this.userId });
  console.log("order", order.items);
  return Cards.find({ _id: { $in: order.items } });
});
