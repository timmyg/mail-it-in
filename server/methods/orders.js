Meteor.methods({
  ["orders.mine.new"](packageId) {
    const package = Packages.findOne(packageId);
    Orders.upsert(
      {
        userId: Meteor.userId()
      },
      {
        $set: {
          package: packageId,
          price: package.price
          // items: []
        }
      },
      { validate: false }
    );
  },
  ["orders.mine.item.add"](itemId) {
    Orders.upsert(
      {
        userId: Meteor.userId()
      },
      {
        $addToSet: {
          items: itemId
        }
      },
      { validate: false }
    );
  },
  ["orders.mine.item.remove"](itemId) {
    Orders.upsert(
      {
        userId: Meteor.userId()
      },
      {
        $pull: {
          items: itemId
        }
      },
      { validate: false }
    );
  },
  ["orders.mine.reset"]() {
    Orders.upsert(
      {
        userId: Meteor.userId()
      },
      {
        $set: {
          items: []
        }
      },
      { validate: false }
    );
  },
  ["orders.mine.source.set"](sourceId) {
    Orders.update(
      {
        userId: Meteor.userId()
      },
      {
        $set: {
          source: sourceId
        }
      },
      { validate: false }
    );
  },
  ["order.update.ignore.validation"](orderId, update) {
    Orders.update(orderId, update, { validate: false }, err => {
      if (err) console.error(err);
    });
  }
});
