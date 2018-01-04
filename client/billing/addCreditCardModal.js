let stripe;

Template.addCreditCardModal.onRendered(function(){
  createStripeWidget(Template.instance());
})

Template.addCreditCardModal.onCreated(function(){
  configureStripe();
  this.errors = new ReactiveVar({
    cardNumber: null,
    cardCvc: null,
    cardExpiry: null,
  });
});

Template.addCreditCardModal.helpers({
  errors: function(){
    return Template.instance().errors.get();
  },
  areErrors: function() {
    const e = Template.instance().errors.get()
    return e.cardNumber || e.cardCvc || e.cardExpiry;
  }
});

Template.addCreditCardModal.events({
  "submit form": function(e, t) {
    // configureStripe();
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
    console.log(card, source);

    stripe.createSource(card, source, function(status, response) {
      console.log("status", status);
      console.log("response", response);

      if (response.error) {
        return sAlert.error(response.error.message);
      }
      // Meteor.call("addToStripeCustomer");
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
  },
  // "change #card-number-element": function(e, t) {
  //   console.log("change");
  // }
});

function configureStripe() {
  stripe = Stripe(Meteor.settings.public.stripe.publishableKey);
}

function createStripeWidget(t) {
  let elements = stripe.elements();
  let style = {};

  const fieldCardNumber = "cardNumber";
  let cardNumber = elements.create(fieldCardNumber, {style: style});
  cardNumber.mount('#card-number-element');
  cardNumber.addEventListener('change', function(e) {
    let errors = t.errors.get();
    if (e.error) {
      errors[fieldCardNumber] = e.error.message;
      t.errors.set(errors);
    } else {
      errors[fieldCardNumber] = null;
      t.errors.set(errors);
    }
  });

  const fieldCardExpiry = "cardExpiry";
  let cardExpiry = elements.create(fieldCardExpiry, {style: style});
  cardExpiry.mount('#card-expiry-element');
  cardExpiry.addEventListener('change', function(e) {
    let errors = t.errors.get();
    if (e.error) {
      errors[fieldCardExpiry] = e.error.message;
      t.errors.set(errors);
    } else {
      errors[fieldCardExpiry] = null;
      t.errors.set(errors);
    }
  });

  const fieldCardCvc = "cardCvc";
  let cardCvc = elements.create(fieldCardCvc, {style: style});
  cardCvc.mount('#card-cvc-element');
  cardCvc.addEventListener('change', function(e) {
    let errors = t.errors.get();
    if (e.error) {
      errors[fieldCardCvc] = e.error.message;
      t.errors.set(errors);
    } else {
      errors[fieldCardCvc] = null;
      t.errors.set(errors);
    }
  });
}
