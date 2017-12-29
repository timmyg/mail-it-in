Template.addCreditCard.events({
  "submit form": function(e, t) {
    console.log("submit");

    e.preventDefault();
    Stripe.card.createToken({
     number: $('#cc-number').val(),
     cvc: $('#cc-code').val(),
     exp_month: $('#cc-month').val(),
     exp_year: $('#cc-year').val(),
    }, function(status, response) {
      if (response.error) {
        return sAlert.error(response.error.message);
      }
      stripeToken = response.id;
      let c = Cards.insert({
        userId: Meteor.userId(),
        card: response.card
      });
      // TODO clear modal
      $('#add-credit-card').modal('hide');
      $('#add-credit-card input').val('');
      return sAlert.success("Card successfully added");
    });
  }
});

Template.card.helpers({
  getCreditCardImage: () => {
    console.log(this);
    console.log();
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
