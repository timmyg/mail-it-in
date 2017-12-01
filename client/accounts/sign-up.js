import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.signUp.events({
  'submit form': (e) => {
    Accounts.createUser({
      email: e.target.email.value,
      password: e.target.password.value,
      profile: {
        name: e.target.name.value
      }
    }, (error) => {
      FlowRouter.go('/app');
    });
  }
});
