import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.signIn.events({
    'submit form': (e) => {
      e.preventDefault();
      Meteor.loginWithPassword(e.target.email.value, e.target.password.value, (error) => {
        if (error) {
          console.error(error)
          analytics.track('Sign In', {
            error: error
          });
          return sAlert.error('User/password incorrect');
        }
        Meteor.call("loggedIn");
        // clear alerts like incorrect password
        sAlert.closeAll();
        FlowRouter.go('/app');
      })
    },
});
