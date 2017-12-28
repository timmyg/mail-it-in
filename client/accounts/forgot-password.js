import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.forgotPassword.events({
  'submit form': (e) => {
    e.preventDefault();
    Accounts.forgotPassword({email: e.target.email.value}, (error) => {
      if (error) {
        console.error(error);
        analytics.track('Forgot Password', {
          error: error
        });
        return sAlert.error(`Something went wrong: ${error.reason}`);
      }
      analytics.track('Forgot Password');
      FlowRouter.go('/');
      return sAlert.success('An email has been sent with reset instructions');
    });
  }
});
