Meteor.startup(() => {
  configureSAlert();
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
