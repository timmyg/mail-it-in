Meteor.startup(() => {
  configureSAlert();
  configureStripe();
});

function configureSAlert() {
  sAlert.config({
    effect: 'jelly',
    position: 'top',
    timeout: 5000,
    html: false,
    onRouteClose: true,
    stack: true,
    offset: 0,
    beep: false,
  });
}

function configureStripe() {
  Stripe.setPublishableKey(Meteor.settings.public.stripe.publishableKey);
}
