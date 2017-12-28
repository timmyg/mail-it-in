import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  setResetPasswordUrl();
  addAdminRoles();
});

function setResetPasswordUrl() {
  Accounts.urls.resetPassword = function(token) {
     return Meteor.absoluteUrl('reset-password/' + token);
   };
}

function addAdminRoles() {
  try {
    var adminEmails = Meteor.settings.private.adminEmails.split(",");
    _.each(adminEmails, function (email) {
      const user = Meteor.users.findOne({ "emails.address" : email });
      Roles.addUsersToRoles(user._id, "admin");
    });
  } catch(e) {
    
  }
}
