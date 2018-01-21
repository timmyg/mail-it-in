Template.checkout.helpers({
  // cart: () => {
  //   return Session.get(CONSTANTS.CART);
  // },
  cards: () => Items.find().fetch()
});

Template.checkout.events({
  "click .complete": (e, t) => {
    const order = Orders.findOne();
    console.log("complete", order);
    console.log(check(OrdersSchema, order));
    // console.log(Match.test(order, OrdersSchema));
  }
});
