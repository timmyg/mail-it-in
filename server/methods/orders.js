import { log } from "util";
import { loadavg } from "os";

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
        }
      },
      { validate: false }
    );
  },
  ["orders.mine.item.add"](orderId, itemId) {
    OrderItems.insert(
      {
        order: orderId,
        item: itemId,
        userId: Meteor.userId()
      },
      { validate: false }
    );
  },
  ["orders.mine.item.remove"](orderId, itemId) {
    OrderItems.remove({
      order: orderId,
      item: itemId,
      userId: Meteor.userId()
    });
  },
  ["orders.mine.reset"]() {
    console.log(Meteor.userId());
    Orders.upsert(
      {
        userId: Meteor.userId()
      },
      {
        $set: {
          userId: Meteor.userId()
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
  ["orders.mine.date.set"]() {
    Orders.update(
      {
        userId: Meteor.userId()
      },
      {
        $set: {
          date: new Date()
        }
      },
      { validate: false }
    );
  },
  ["order.update.ignore.validation"](orderId, update) {
    Orders.update(orderId, update, { validate: false }, err => {
      if (err) console.error(err);
    });
  },
  ["order.update.item.date"](orderId, itemId, date) {
    const query = {
      order: orderId,
      item: itemId,
      userId: Meteor.userId()
    };
    const update = {
      $set: {
        eventDate: date
      }
    };
    console.log(query, update);
    OrderItems.update(query, update);
  }
});
