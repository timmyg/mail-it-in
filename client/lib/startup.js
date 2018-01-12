import WebFont from 'webfontloader';

Meteor.startup(() => {
  importWebfonts();
  configureSAlert();
  configureStripe();
});

function importWebfonts() {
  WebFont.load({
    google: {
      families: [
        'Joti One:regular',
      ],
    },
  });
}

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
  //
  // console.log("s", s.source);
  // console.log("cs", s.createSource);
  // console.log("cs2", s.createSource2);

}
