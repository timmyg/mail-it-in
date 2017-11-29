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

FlowRouter.notFound = {
    action: function() {
      FlowRouter.go('/');
    }
};
