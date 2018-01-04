let stripe;
let cardNumberElement, cardExpiryElement, cardCvcElement;

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

function configureStripe() {
  stripe = Stripe(Meteor.settings.public.stripe.publishableKey);
}

function createStripeWidget(t) {
  let elements = stripe.elements();
  let style = {};

  const fieldCardNumber = "cardNumber";
  cardNumberElement = elements.create(fieldCardNumber, {style: style});
  cardNumberElement.mount('#card-number-element');
  cardNumberElement.addEventListener('change', function(e) {
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
  cardExpiryElement = elements.create(fieldCardExpiry, {style: style});
  cardExpiryElement.mount('#card-expiry-element');
  cardExpiryElement.addEventListener('change', function(e) {
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
  cardCvcElement = elements.create(fieldCardCvc, {style: style});
  cardCvcElement.mount('#card-cvc-element');
  cardCvcElement.addEventListener('change', function(e) {
    let errors = t.errors.get();
    if (e.error) {
      errors[fieldCardCvc] = e.error.message;
      t.errors.set(errors);
    } else {
      errors[fieldCardCvc] = null;
      t.errors.set(errors);
    }
  });

  // Submit
  $('form').on('submit', function(e){
      e.preventDefault();
      const source = {
        owner: {
          email: Meteor.user().emails[0].address
        }
      };
      stripe.createSource(cardNumberElement, source).then(function(response) {
          console.log(response);
          if (response.error && response.error.message){
            // these are already shown on the form
          } else {
            console.log("response", response);
            let sourceData = response.source;
            sourceData.userId = Meteor.userId();
            let c = Sources.insert(sourceData);
            // TODO clear modal
            $('#add-credit-card').modal('hide');
            clearForm();
            Meteor.call("addSourceToStripeCustomer", response.source.id, (error, result) => {
              return sAlert.success("Card successfully added");
            });
          }
      });
  });

}

function clearForm() {
  cardNumberElement.clear();
  cardExpiryElement.clear();
  cardCvcElement.clear();
}
