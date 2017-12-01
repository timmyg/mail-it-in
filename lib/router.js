import { FlowRouter } from "meteor/ostrio:flow-router-extra";

FlowRouter.route("/", {
  action: function() {
    BlazeLayout.render("layout", { main: "home" });
  }
});

FlowRouter.route("/sign-in", {
  action: function(params, queryParams) {
    BlazeLayout.render("layout", { main: "signIn" });
  }
});

FlowRouter.route("/forgot-password", {
  action: function(params, queryParams) {
    BlazeLayout.render("layout", { main: "forgotPassword" });
  }
});

// FlowRouter.notFound = {
//     triggersEnter: [(context, redirect) => {
//       redirect('/');
//     }],
// };

FlowRouter.route("*", {
  triggersEnter: [(context, redirect) => {
    redirect('/');
  }]
});
