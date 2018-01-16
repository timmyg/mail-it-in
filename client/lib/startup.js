import WebFont from "webfontloader";

Meteor.startup(() => {
  importWebfonts();
  configureSAlert();
});

function importWebfonts() {
  WebFont.load({
    google: {
      families: ["Kaushan Script:regular"]
    }
  });
}

function configureSAlert() {
  sAlert.config({
    effect: "jelly",
    position: "top",
    timeout: 5000,
    html: false,
    onRouteClose: true,
    stack: true,
    offset: 0,
    beep: false
  });
}
