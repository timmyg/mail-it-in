Meteor.publish("packages.all", function() {
  return Packages.find({}, { sort: { sort: 1 } });
});

Meteor.publish("package", function(packageId) {
  return Packages.find(packageId);
});

Meteor.publish("sources.mine", function() {
  return Sources.find({
    userId: this.userId
  });
});

Meteor.publish("items.all", function() {
  return Items.find();
});

Meteor.publish("order.building", function() {
  const order = Orders.findOne({ userId: this.userId, status: "building" });
  if (!order) {
    return this.ready();
  }
  return [Orders.find({ _id: order._id, userId: this.userId }), OrderItems.find({ order: order._id, userId: this.userId })];
});

Meteor.publish("orders.complete.mine", function() {
  const orders = Orders.find({
    userId: this.userId,
    status: {
      $in: ["processing", "shipped"]
    }
  }).fetch();
  return Orders.find({
    userId: this.userId,
    status: {
      $in: ["processing", "shipped"]
    }
  });
});

Meteor.publish("order.building.items", function() {
  const order = Orders.findOne({ userId: this.userId, status: "building" });
  const orderItemIds = OrderItems.find({ order: order._id })
    .fetch()
    .map(function(item) {
      return item.item;
    });

  return Items.find({
    _id: {
      $in: orderItemIds
    }
  });
});

Meteor.publish("order.building.package", function() {
  const order = Orders.findOne({ userId: this.userId, status: "building" });
  return Packages.find(order.package);
});
