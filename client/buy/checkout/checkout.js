Template.checkout.helpers({
  cart: () => {
    return Session.get(Sesh.CART);
  }
});
