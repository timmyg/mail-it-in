import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  setResetPasswordUrl();
});

function setResetPasswordUrl() {
  Accounts.urls.resetPassword = function(token) {
     return Meteor.absoluteUrl('reset-password/' + token);
   };
}
