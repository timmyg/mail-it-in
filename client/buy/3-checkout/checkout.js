import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import SimpleSchema from "simpl-schema";

Template.checkout.helpers({
  ready: () => FlowRouter.subsReady()
});

// Template.checkout.created = function() {
//   // Tracker.autorun(function() {
//   //   console.log("ar");
//   //   if (FlowRouter.subsReady()) {
//   //     console.log(Orders.findOne());
//   //   }
//   // });
//   this.subscribe("order.building");
//   Tracker.autorun(function() {
//     console.log("Is myPost ready?:", FlowRouter.subsReady("myPost"));
//     console.log("Are all subscriptions ready?:", FlowRouter.subsReady());
//   });
// };

Template.checkout.events({
  "click .complete": (e, t) => {
    const $btn = $(e.currentTarget);
    $btn.prop("disabled", true);
    const order = Orders.findOne();
    // update order date
    Meteor.call("orders.mine.date.set");
    // check address
    try {
      AddressesSchema.validate(order.shippingAddress);
    } catch (err) {
      console.error(err);
      $btn.prop("disabled", false);
      return sAlert.error("Please enter a valid address");
    }
    // check order (source, package, price)
    try {
      OrdersSchema.validate(order);
    } catch (err) {
      console.error(err);
      const name = err.details[0].name;
      $btn.prop("disabled", false);
      if (name === "source") {
        return sAlert.error("Please select a payment type");
      }
    }
    // call backend to charge card via stripe, update paid=true
    Meteor.call("order.checkout", Orders.findOne()._id, (e, r) => {
      if (e) {
        $btn.prop("disabled", false);
        console.error(e);
        return sAlert.error("Something went wrong");
      }
      FlowRouter.go("confirmation");
      $btn.prop("disabled", false);
    });
  }
});
