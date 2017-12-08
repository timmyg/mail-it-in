import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.resetPassword.events({
  'submit form': (e) => {
    e.preventDefault();
    token = FlowRouter.current().params.resetToken;
    Accounts.resetPassword(token, e.target.password.value, function(error){
        if (error) {
          console.error(error);
          return sAlert.error(`Something went wrong: ${error.reason}`);
        }
        Router.go("/sign-in");
       return sAlert.success('Password successfully changed');
    });
  }
});
