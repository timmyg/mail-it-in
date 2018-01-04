var Stripe = StripeAPI(Meteor.settings.private.stripe.secretKey);

Meteor.methods({
  loggedIn() {
    console.log("logged in");
  },
  async addSourceToStripeCustomer(sourceToken) {
    if (Meteor.user().stripeCustomer) {
      // add to existing in stripe
      let result = await Stripe.customers.createSource(Meteor.user().stripeCustomer, {
        source: sourceToken,
      });
    } else {
      const customer = await Stripe.customers.create({
        email:  Meteor.user().emails[0].address,
        source: sourceToken,
      });
      Meteor.users.update(Meteor.userId(), {
        $set: {
          stripeCustomer: customer.id
        }
      });
    }
  },
  deleteCard(sourceId) {
    const source = Sources.findOne({
      _id: sourceId,
      userId: Meteor.userId()
    })
    Stripe.customers.deleteSource(
      Meteor.user().stripeCustomer,
      source.id
    );
    Sources.remove(source._id);
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
