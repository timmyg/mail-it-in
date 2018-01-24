Meteor.publish("packages.all", function () {
  return Packages.find({}, { sort: { sort: 1 } });
});

Meteor.publish("package", function (packageId) {
  return Packages.find(packageId);
});

Meteor.publish("sources.mine", function () {
  return Sources.find({
    userId: this.userId
  });
});

Meteor.publish("items.all", function () {
  return Items.find();
});

Meteor.publish("order.building", function () {
  const order = Orders.findOne({ userId: this.userId });
  return [
    Orders.find({ _id: order._id, userId: this.userId }),
    OrderItems.find({ order: order._id, userId: this.userId })
  ]
});

Meteor.publish("orders.mine", function () {
  return Orders.find({
    userId: this.userId,
    status: {
      $in: ["processing", "shipped"]
    }
  });
});

Meteor.publish("order.items", function () {
  const orderItemIds = OrderItems.find({}).fetch().map(function (item) { return item.item; })
  console.log(orderItemIds);
  return Items.find({
    _id: {
      $in: orderItemIds
    }
  });
});
