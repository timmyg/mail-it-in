Template.addCreditCard.events({
  "submit form": function(e, t) {
    console.log("submit");

    e.preventDefault();
    const card = {
      number: $('#cc-number').val(),
      cvc: $('#cc-code').val(),
      exp_month: $('#cc-month').val(),
      exp_year: $('#cc-year').val(),
    };
    const source = {
      owner: {
        email: Meteor.user().emails[0].address
      }
    };
    Stripe.createSource(card, source, function(status, response) {
      if (response.error) {
        return sAlert.error(response.error.message);
      }
      // Meteor.call("addToStripeCustomer");
      stripeToken = response.id;
      console.log("response", response);

      let c = Cards.insert({
        userId: Meteor.userId(),
        card: response.card
      });
      // TODO clear modal
      $('#add-credit-card').modal('hide');
      $('#add-credit-card input').val('');
      return sAlert.success("Card successfully added");
    });
  },
});

Template.card.events({
  "click .delete-card": function(e, t) {
    const card = Template.instance().data;
    console.log("delete", card, Stripe.card);
    Meteor.call("deleteCard", card._id)
  }
});

Template.card.helpers({
  getCreditCardImage: () => {
    switch (Template.instance().data.card.brand) {
      case "Visa":
        return "/img/cc/visa.png";
      case "American Express":
        return "/img/cc/americanexpress.png";
      case "MasterCard":
        return "/img/cc/mastercard.png";
      case "Discover":
        return "/img/cc/discover.png";

    }

  }
});

Template.billing.helpers({
  myCards: () => {
    return Cards.find().fetch();
  },
});
