import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  setResetPasswordUrl();
  setEmailConfirm();
  addAdminRoles();
});

function setResetPasswordUrl() {
  Accounts.urls.resetPassword = function(token) {
     return Meteor.absoluteUrl('reset-password/' + token);
   };
}

function setEmailConfirm() {
  Accounts.emailTemplates.siteName = "GoDunk";
  Accounts.emailTemplates.from     = "MySite <admin@mysite.com>";

  Accounts.emailTemplates.verifyEmail = {
    subject() {
      return "[MySite] Verify Your Email Address";
    },
    text( user, url ) {
      let emailAddress   = user.emails[0].address,
          urlWithoutHash = url.replace( '#/', '' ),
          supportEmail   = "support@mysite.com",
          emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;
      return emailBody;
    }
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
