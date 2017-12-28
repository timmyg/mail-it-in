import { FlowRouter } from "meteor/ostrio:flow-router-extra";

let public = FlowRouter.group({});
let authenticated = FlowRouter.group({
  triggersEnter: [
    function() {
      var route;
      if (!(Meteor.loggingIn() || Meteor.userId())) {
        route = FlowRouter.current();
        // if (route.route.name !== 'signIn') {
        //   // Session.set('redirectAfterLogin', route.path);
        // }
        return FlowRouter.go('signIn');
      }
    }
  ]
});

public.route("/", {
  name: "home",
  triggersEnter: [function(context, redirect) {
    if (Meteor.user()) {
      redirect("/app");
    } else {
      redirect("/sign-in");
    }
  }]
});

public.route("/sign-in", {
  name: "signIn",
  action: function() {
    return BlazeLayout.render("layout", { main: "signIn" });
  }
});


public.route("/sign-up", {
  action: function() {
    BlazeLayout.render("layout", { main: "signUp" });
  }
});

public.route("/forgot-password", {
  action: function() {
    BlazeLayout.render("layout", { main: "forgotPassword" });
  }
});

public.route("/reset-password/:resetToken", {
  action: function(params) {
    BlazeLayout.render("layout", { main: "resetPassword" });
  }
});

authenticated.route('/sign-out', {
  triggersEnter: [function(context, redirect) {
    Meteor.logout(function() {
      FlowRouter.go('signIn');

    });
  }]
});

authenticated.route("/app", {
  action: function() {
    BlazeLayout.render("layout", { main: "app" });
  }
});

FlowRouter.route("*", {
  triggersEnter: [(context, redirect) => {
    redirect('/');
  }]
});
