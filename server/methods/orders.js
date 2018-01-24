const Stripe = StripeAPI(Meteor.settings.private.stripe.secretKey);

Meteor.methods({
  ["orders.mine.new"](packageId) {
    // const package = Packages.findOne(packageId);
    Orders.upsert(
      {
        userId: Meteor.userId(),
        status: "building"
      },
      {
        $set: {
          package: packageId
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
    Orders.upsert(
      {
        userId: Meteor.userId(),
        status: "building"
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
        userId: Meteor.userId(),
        status: "building"
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
        userId: Meteor.userId(),
        status: "building"
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
      // status: "building"
    };
    const update = {
      $set: {
        eventDate: date
      }
    };
    OrderItems.update(query, update);
  },
  async ["order.checkout"](orderId) {
    const order = Orders.findOne(orderId);
    AddressesSchema.validate(order.shippingAddress);
    OrdersSchema.validate(order);
    const source = Sources.findOne(order.source);
    const package = Packages.findOne(order.package);
    const charge = await Stripe.charges.create({
      amount: package.price * 100,
      currency: "usd",
      source: source.details.id,
      description: `Mail it In (order ${orderId})`,
      customer: Meteor.user().stripeCustomer
    });
    const update = {
      status: "processing",
      paid: true
    };
    Orders.update(orderId, { $set: update }, err => {
      if (err) console.error(err);
    });
  }
});
