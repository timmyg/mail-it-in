import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.forgotPassword.events({
  'submit form': (e) => {
    e.preventDefault();
    Accounts.forgotPassword({email: e.target.email.value}, (error) => {
      if (error) {
        console.error(error);
        return sAlert.error(`Something went wrong: ${error.reason}`);
      }
      FlowRouter.go('/');
      return sAlert.success('An email has been sent with reset instructions');
    });
  }
});
