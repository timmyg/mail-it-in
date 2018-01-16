import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.paymentPicker.onCreated(function() {
  this.subscribe("sources.mine");
});

Template.paymentPicker.helpers({
  ready: () => FlowRouter.subsReady(),
  unusedSources: function() {
    const order = Orders.findOne();
    return Sources.find({ _id: { $ne: order.source } }).fetch();
  },
  selectedPayment: () => {
    const order = Orders.findOne();
    return Sources.findOne(order.source);
  }
});

Template.payment.helpers({
  getCreditCardImage: brand => {
    switch (brand) {
      case "Visa":
        return "/img/cc/visa.png";
      case "American Express":
        return "/img/cc/americanexpress.png";
      case "MasterCard":
        return "/img/cc/mastercard.png";
      case "Discover":
        return "/img/cc/discover.png";
    }
  }
});

Template.payment.events({
  "click .item": function(e, t) {
    Meteor.call("orders.mine.source.set", t.data._id);
  }
});
