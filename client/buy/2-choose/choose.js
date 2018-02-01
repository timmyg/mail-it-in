import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.choose.events({
  "click .next": (e, t) => {
    const orderItems = OrderItems.find().fetch();
    const needMore = Packages.findOne().items - orderItems.length > 0;
    if (!orderItems.length || needMore) {
      const remainingCards = Packages.findOne().items - orderItems.length;
      let str = `Choose ${remainingCards} more card`;
      if (remainingCards > 1) str += "s";
      return sAlert.warning(str);
    } else {
      const datesSet = orderItems.every(oi => {
        if (!oi.eventDate) {
          sAlert.warning(`Please choose an event date for all cards`);
          return false;
        }
        return true;
      });
      if (datesSet) FlowRouter.go("checkout");
    }
  }
});

Template.choose.helpers({
  ready: () => FlowRouter.subsReady(),
  package: function() {
    return Packages.findOne();
  },
  cardsByCategory: function() {
    const items = Items.find().fetch();
    return groupBy(items, "category");
  },
  chooseText: () => {
    const orderItems = OrderItems.find().fetch();
    if (!orderItems || orderItems.length == 0) {
      return `Choose ${Packages.findOne().items} cards`;
    } else if (orderItems.length > 0) {
      const remainingCards = Packages.findOne().items - orderItems.length;
      if (remainingCards) {
        let str = `Choose ${remainingCards} more card`;
        if (remainingCards > 1) str += "s";
        return str;
      } else {
        return "You're all set!";
      }
    }
  }
  // chooseMore: () => {
  //   const orderItemsCount = OrderItems.find().count();
  //   if (orderItemsCount) {
  //     return Packages.findOne().items - orderItemsCount > 0;
  //   }
  // }
});

Template.choose.onCreated(function() {
  Meteor.call("orders.mine.new", FlowRouter.current().params.package);
});
