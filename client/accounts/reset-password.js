import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.resetPassword.events({
  'submit form': (e) => {
    e.preventDefault();
    token = FlowRouter.current().params.resetToken;
    Accounts.resetPassword(token, e.target.password.value, function(error){
        if (error) {
          console.error(error);
          analytics.track('Reset Password', {
            error: error
          });
          return sAlert.error(`Something went wrong: ${error.reason}`);
        }
        analytics.track('Reset Password');
        FlowRouter.go("/");
        return sAlert.success('Password successfully changed');
    });
  }
});
