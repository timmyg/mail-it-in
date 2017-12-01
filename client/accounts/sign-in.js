import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.signIn.events({
    'submit form': (e) => {
      console.log("submit");
      e.preventDefault();
      Meteor.loginWithPassword(e.target.email.value, e.target.password.value, (error) => {
        if (error) {
          return sAlert.warning('User/password incorrect');
        }
        FlowRouter.go('/app');
      })
    },
});
