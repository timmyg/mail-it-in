import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.signUp.events({
  'submit form': (e) => {
    e.preventDefault();
    Accounts.createUser({
      email: e.target.email.value,
      password: e.target.password.value,
      profile: {
        name: e.target.name.value
      }
    }, (error) => {
      if (error) {
        console.error(error)
        return sAlert.error(error.reason);
      }
      analytics.alias(Meteor.userId());
      FlowRouter.go('/hello');
      Meteor.call( 'sendVerificationLink', (e, r) => {
        if (e) {
          return sAlert.error(error.reason)
        }
        return sAlert.success("Please check your email to confirm your account")
      });
    });
  }
});
