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
    if (Sesh.isEmpty(CONSTANTS.CARDS)) {
      return `choose ${Packages.findOne().cards} cards`;
    } else if (Sesh.getLength(CONSTANTS.CARDS) > 0) {
      const remainingCards =
        Packages.findOne().cards - Sesh.getLength(CONSTANTS.CARDS);
      if (remainingCards) {
        let str = `choose ${remainingCards} more card`;
        if (remainingCards > 1) str += "s";
        return str;
      }
    }
  },
  chooseMore: () => {
    return Packages.findOne().cards - Sesh.getLength(CONSTANTS.CARDS) > 0;
  }
});

// Template.choose.onCreated(function() {
//   const package = FlowRouter.current().params.resetToken;
//   this.subscribe("package", package);
//   this.subscribe("cards.all", package);
// });
