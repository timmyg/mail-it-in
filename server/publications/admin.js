Meteor.publish("admin.orders", function() {
  if (!Roles.userIsInRole(this.userId, ["admin"])) return this.stop();
  return [Orders.find({ status: { $nin: ["building"] } }), OrderItems.find({})];
});

Meteor.publish("admin.order", function(orderId) {
  console.log(orderId);
  if (!Roles.userIsInRole(this.userId, ["admin"])) return this.stop();
  const order = Orders.findOne();
  return [Orders.find({ _id: orderId }), OrderItems.find({ order: orderId }), Meteor.users.find({ _id: order.userId })];
});
