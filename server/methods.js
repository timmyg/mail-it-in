var Stripe = StripeAPI(Meteor.settings.private.stripe.secretKey);

Meteor.methods({
  loggedIn() {
    console.log("logged in");
  },
  addToStripeCustomer(sourceToken) {
    Stripe.customers.create({
      email:  Meteor.user().emails[0].address,
      source: sourceToken,
    }, function(err, customer) {
      console.log(err, customer);
    });
  },
  deleteCard(cardId) {
    const card = Cards.findOne({
      _id: cardId,
      userId: Meteor.userId()
    })
    Stripe.customers.deleteCard(
      // card.card.,
      // "card_1BgJOYDAn7lQE2rwcSK5pruR",
      function(err, confirmation) {
        // asynchronously called
      }
    );

  },
  chargeCard(card) {
    // Stripe.charges.create({
    //   amount: 1000,
    //   currency: 'usd',
    //   source: stripeToken
    // }, function(err, charge) {
    //   console.log(err, charge);
    // });
  }
});
