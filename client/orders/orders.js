import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.orders.helpers({
  ready: () => FlowRouter.subsReady(),
  myOrders: function() {
    return Orders.find().fetch();
  }
});

Template.order.helpers({
  orderPackage: function() {
    return Packages.findOne({ _id: this.package });
  }
});
