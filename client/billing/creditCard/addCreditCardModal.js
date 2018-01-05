let stripe;
let cardElement;

Template.addCreditCardModal.events({
  "click .cancel": function(event, template){
     $('#add-credit-card').modal('hide');
     clearForm();
  }
});

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
  let styles = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#8898AA',
        // color: 'white',
        lineHeight: '36px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',

        '::placeholder': {
          color: '#8898AA',
        },
      },
      invalid: {
        iconColor: '#e85746',
        color: '#e85746',
      }
    },
    // classes: {
    //   focus: 'is-focused',
    //   empty: 'is-empty',
    // },
  };

  // const fieldCardNumber = "cardNumber";
  cardElement = elements.create("card", styles);
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
      $("button[type=submit]").prop('disabled', true);
      const source = {
        owner: {
          email: Meteor.user().emails[0].address
        }
      };
      stripe.createSource(cardElement, source).then(function(response) {
          if (response.error && response.error.message){
            // these are already shown on the form
            $("button[type=submit]").prop('disabled', false);
          } else {
            let sourceData = response.source;
            sourceData.userId = Meteor.userId();
            let c = Sources.insert(sourceData);
            // TODO clear modal
            $('#add-credit-card').modal('hide');
            clearForm();
            $("button[type=submit]").prop('disabled', false);
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
