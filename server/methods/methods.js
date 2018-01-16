var Stripe = StripeAPI(Meteor.settings.private.stripe.secretKey);
const deleteSeconds = 10;

Meteor.methods({
  loggedIn() {},
  async addSourceToStripeCustomer(sourceToken) {
    if (Meteor.user().stripeCustomer) {
      // add to existing in stripe
      let result = await Stripe.customers.createSource(
        Meteor.user().stripeCustomer,
        {
          source: sourceToken
        }
      );
    } else {
      const customer = await Stripe.customers.create({
        email: Meteor.user().emails[0].address,
        source: sourceToken
      });
      Meteor.users.update(Meteor.userId(), {
        $set: {
          stripeCustomer: customer.id
        }
      });
    }
  },
  deleteCard(sourceId) {
    const userId = Meteor.userId();
    const stripeCustomer = Meteor.user().stripeCustomer;
    const source = Sources.findOne({
      _id: sourceId,
      userId: userId
    });
    Sources.update(source._id, {
      $set: {
        pendingDelete: true
      }
    });
    Meteor.setTimeout(() => {
      // get source again to make sure it should still be deleted
      const updatedSource = Sources.findOne(sourceId);
      if (updatedSource.pendingDelete) {
        Stripe.customers.deleteSource(stripeCustomer, source.details.id);
        Sources.remove(sourceId);
        // remove from order if existing
        const order = Orders.findOne({ userId: userId });
        if (order.source === sourceId) {
          Orders.update(
            order._id,
            {
              $unset: {
                source: ""
              }
            },
            { validate: false }
          );
        }
      }
    }, deleteSeconds * 1000);
  },
  undoDeleteCard(sourceId) {
    Sources.update(sourceId, {
      $unset: {
        pendingDelete: ""
      }
    });
  },
  setDefaultCard(sourceId) {
    Sources.update(
      { userId: Meteor.userId() },
      {
        $set: {
          default: false
        }
      },
      { multi: true }
    );
    Sources.update(sourceId, {
      $set: {
        default: true
      }
    });
  },
  sendVerificationLink() {
    const userId = Meteor.userId();
    if (userId) {
      return Accounts.sendVerificationEmail(userId);
    }
  },
  resetSelectedCards() {
    Sources.update(
      { userId: Meteor.userId() },
      {
        $unset: {
          selected: ""
        }
      },
      { multi: true }
    );
  },
  setSelectedCards(id) {
    Sources.update(
      { userId: Meteor.userId() },
      {
        $unset: {
          selected: ""
        }
      },
      { multi: true }
    );
    Sources.update(
      { userId: Meteor.userId(), _id: id },
      {
        $set: {
          selected: true
        }
      }
    );
  }
});
