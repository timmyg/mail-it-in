const Stripe = StripeAPI(Meteor.settings.private.stripe.secretKey);

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
  },
  ["order.checkout"](orderId) {
    const order = Orders.findOne(orderId);
    AddressesSchema.validate(order.shippingAddress);
    OrdersSchema.validate(order);
    const source = Sources.findOne(order.source);
    Stripe.charges.create(
      {
        amount: order.price * 100,
        currency: "usd",
        source: source.details.id,
        description: `Mail it In (order ${orderId})`,
        customer: Meteor.user().stripeCustomer
      },
      function(err, charge) {
        // console.log(err, charge);
        const update = {
          status: "processing",
          paid: true
        };
        Orders.update(orderId, update, err => {
          if (err) console.error(err);
        });
      }
    );
  }
});
