let stripe;
let cardElement;

Template.addCreditCardModal.onRendered(function(){
  createStripeWidget(Template.instance());
})

Template.addCreditCardModal.onCreated(function(){
  configureStripe();
  this.error = new ReactiveVar();
});

Template.addCreditCardModal.helpers({
  error: function(){
    return Template.instance().error.get();
  },
});

function configureStripe() {
  stripe = Stripe(Meteor.settings.public.stripe.publishableKey);
}

function createStripeWidget(t) {
  let elements = stripe.elements();
  let style = {
    base: {
      // color: '#32325d',
      lineHeight: '18px',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    // invalid: {
    //   color: '#fa755a',
    //   iconColor: '#fa755a'
    // }
  };

  // const fieldCardNumber = "cardNumber";
  cardElement = elements.create("card", {style: style});
  cardElement.mount('#card-element');
  cardElement.addEventListener('change', function(e) {
    if (e.error) {
      t.error.set(e.error.message);
    } else {
      t.error.set(null);
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
      stripe.createSource(cardElement, source).then(function(response) {
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
  cardElement.clear();
}
