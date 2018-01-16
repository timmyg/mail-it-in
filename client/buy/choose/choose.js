import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.choose.events({
  "click .next": (e, t) => {
    const cart = {
      items: Session.get(CONSTANTS.CARDS)
    };
    Session.set(CONSTANTS.CART, cart);
    FlowRouter.go("/buy/checkout");
  }
});

Template.choose.helpers({
  ready: () => FlowRouter.subsReady(),
  package: function() {
    return Packages.findOne();
  },
  cards: function() {
    return Cards.find().fetch();
  },
  chooseText: () => {
    // if (Sesh.isEmpty(CONSTANTS.CARDS)) {
    const order = Orders.findOne();
    if (!order || order.items.length == 0) {
      return `choose ${Packages.findOne().cards} cards`;
    } else if (order.items.length > 0) {
      const remainingCards = Packages.findOne().cards - order.items.length;
      if (remainingCards) {
        let str = `choose ${remainingCards} more card`;
        if (remainingCards > 1) str += "s";
        return str;
      }
    }
  },
  chooseMore: () => {
    const order = Orders.findOne();
    return Packages.findOne().cards - order.items.length > 0;
  }
});

// Template.choose.onCreated(function() {
//   const package = FlowRouter.current().params.resetToken;
//   this.subscribe("package", package);
//   this.subscribe("cards.all", package);
// });
