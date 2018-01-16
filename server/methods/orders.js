Meteor.methods({
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
  }
});
