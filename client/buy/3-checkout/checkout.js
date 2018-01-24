import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import SimpleSchema from "simpl-schema";

Template.checkout.events({
  "click .complete": (e, t) => {
    const order = Orders.findOne();
    // update order date
    Meteor.call("orders.mine.date.set");
    // check address
    try {
      AddressesSchema.validate(order.shippingAddress);
    } catch (err) {
      return sAlert.error("Please enter a valid address");
    }
    // check order (source, package, price)
    try {
      OrdersSchema.validate(order);
    } catch (err) {
      const name = err.details[0].name;
      if (name === "source") {
        return sAlert.error("Please select a payment type");
      }
    }
    // call backend to charge card via stripe, update paid=true
    Meteor.call("order.checkout", Orders.findOne()._id, (e, r) => {
      if (e) {
        return sAlert.error("Something went wrong");
      }
      FlowRouter.go("confirmation");
    });
  }
});
