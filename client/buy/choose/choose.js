import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.choose.events({
  "click .next": (e, t) => {
    const cart = {
      items: Session.get(Sesh.CARDS)
    };
    Session.set(Sesh.CART, cart);
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
    if (Sesh.isEmpty(Sesh.CARDS)) {
      return `choose ${Packages.findOne().cards} cards`;
    } else if (Sesh.getLength(Sesh.CARDS) > 0) {
      const remainingCards =
        Packages.findOne().cards - Sesh.getLength(Sesh.CARDS);
      if (remainingCards) {
        return `choose ${remainingCards} more cards`;
      }
    }
  },
  chooseMore: () => {
    console.log(Packages.findOne().cards - Sesh.getLength(Sesh.CARDS) > 0);
    return Packages.findOne().cards - Sesh.getLength(Sesh.CARDS) > 0;
  }
});

Template.choose.onCreated(function() {
  const package = FlowRouter.current().params.resetToken;
  this.subscribe("package", package);
  this.subscribe("cards.all", package);
});
