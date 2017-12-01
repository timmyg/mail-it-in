Template.signIn.events({
    'submit form': (e) => {
      console.log("submit");

      e.preventDefault();
      Meteor.loginWithPassword(e.target.email.value, e.target.password.value, (error) => {
        console.log(error);
      })
    },
});
