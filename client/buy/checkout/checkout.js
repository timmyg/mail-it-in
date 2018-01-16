Template.checkout.helpers({
  cart: () => {
    return Session.get(CONSTANTS.CART);
  },
  cards: () => Cards.find().fetch()
});
