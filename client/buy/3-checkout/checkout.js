import SimpleSchema from "simpl-schema";

// SimpleSchema.messages({
//   required: "[label] is certainly required"
// });
// SimpleSchema.setDefaultMessages({
//   messages: {
//     en: {
//       "too_long": "Too long!",
//     },
//   },
// });

Template.checkout.helpers({
  // cart: () => {
  //   return Session.get(CONSTANTS.CART);
  // },
  cards: () => Items.find().fetch()
});

Template.checkout.events({
  "click .complete": (e, t) => {
    const order = Orders.findOne();
    console.log();
    // update order date
    Meteor.call("orders.mine.date.set");
    // check address
    try {
      AddressesSchema.validate(order.shippingAddress);
    } catch (err) {
      // TODO show a pretty error message
      console.error(err, err.message, JSON.stringify(err));
    }
    // check order (source, package, price)
    // call backend to charge card via stripe, update paid=true

    // if (!order.source) {
    //   sAlert.warning(`Please choose a payment option`);
    // }
  }
});
