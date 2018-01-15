import { FlowRouter } from "meteor/ostrio:flow-router-extra";

/*
  $%^&$*%^#$*%(@*&@#$)(@#$*)(@#*$)(@#*$)(@#*$)(@#*%)(*&$(#*%&#($*%(#$^%))))
      Public Routes - User Not Logged In
  $%^&$*%^#$*%(@*&@#$)(@#$*)(@#*$)(@#*$)(@#*$)(@#*%)(*&$(#*%&#($*%(#$^%))))
*/

let public = FlowRouter.group({});

public.route("/", {
  name: "home",
  triggersEnter: [
    function(context, redirect) {
      if (Meteor.user()) {
        redirect("/hello");
      } else {
        redirect("/sign-in");
      }
    }
  ]
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

public.route("/verify-email/:token", {
  name: "verify-email",
  action(params) {
    Accounts.verifyEmail(params.token, error => {
      if (error) {
        Bert.alert(error.reason, "danger");
        return sAlert.danger(error.reason);
      } else {
        FlowRouter.go("/");
        return sAlert.success("Email address successfully verified");
      }
    });
  }
});

/*
  $%^&$*%^#$*%(@*&@#$)(@#$*)(@#*$)(@#*$)(@#*$)(@#*%)(*&$(#*%&#($*%(#$^%))))
      Authenticated Routes - User Logged In
  $%^&$*%^#$*%(@*&@#$)(@#$*)(@#*$)(@#*$)(@#*$)(@#*%)(*&$(#*%&#($*%(#$^%))))
*/

let authenticated = FlowRouter.group({
  triggersEnter: [
    function() {
      var route;
      if (!(Meteor.loggingIn() || Meteor.userId())) {
        route = FlowRouter.current();
        return FlowRouter.go("signIn");
      }
    }
  ]
});

authenticated.route("/sign-out", {
  triggersEnter: [
    function(context, redirect) {
      Meteor.logout(function() {
        FlowRouter.go("signIn");
      });
    }
  ]
});

authenticated.route("/hello", {
  action: function() {
    BlazeLayout.render("layout", { main: "hello" });
  }
});

authenticated.route("/billing", {
  action: function() {
    BlazeLayout.render("layout", { main: "billing" });
  },
  subscriptions: function(params, queryParams) {
    this.register("my.sources", Meteor.subscribe("my.sources"));
  }
});

authenticated.route("/profile", {
  action: function() {
    BlazeLayout.render("layout", { main: "profile" });
  }
});

authenticated.route("/buy", {
  action: function() {
    BlazeLayout.render("layout", { main: "packages" });
  },
  subscriptions: function(params, queryParams) {
    this.register("packages.all", Meteor.subscribe("packages.all"));
  }
});

authenticated.route("/buy/checkout", {
  action: function() {
    BlazeLayout.render("layout", { main: "checkout" });
  }
});

authenticated.route("/buy/:package", {
  action: function() {
    BlazeLayout.render("layout", { main: "choose" });
  },
  subscriptions: function(params) {
    this.register("package", Meteor.subscribe("package", params.package));
    this.register("cards.all", Meteor.subscribe("cards.all", params.package));
  }
});

/*
  $%^&$*%^#$*%(@*&@#$)(@#$*)(@#*$)(@#*$)(@#*$)(@#*%)(*&$(#*%&#($*%(#$^%))))
      Admin Routes - User Logged In and Has "admin" Role
  $%^&$*%^#$*%(@*&@#$)(@#$*)(@#*$)(@#*$)(@#*$)(@#*%)(*&$(#*%&#($*%(#$^%))))
*/

let admin = FlowRouter.group({
  prefix: "/admin",
  name: "admin-group",
  triggersEnter: [
    (context, redirect) => {
      if (!Roles.userIsInRole(Meteor.userId(), ["admin"])) {
        redirect("/dont-go-there");
      }
    }
  ]
});

admin.route("/hello", {
  action: function() {
    BlazeLayout.render("layout", { main: "admin" });
  }
});

/*
  $%^&$*%^#$*%(@*&@#$)(@#$*)(@#*$)(@#*$)(@#*$)(@#*%)(*&$(#*%&#($*%(#$^%))))
    Not Found
  $%^&$*%^#$*%(@*&@#$)(@#$*)(@#*$)(@#*$)(@#*$)(@#*%)(*&$(#*%&#($*%(#$^%))))
*/

FlowRouter.route("*", {
  triggersEnter: [
    (context, redirect) => {
      redirect("/");
    }
  ]
});
