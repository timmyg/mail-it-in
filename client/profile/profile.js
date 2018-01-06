import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.profile.events({
  'submit form': (e) => {
    e.preventDefault();
    Meteor.users.update(Meteor.userId(), {$set: {"profile.name": e.target.name.value}});
    return sAlert.success("Profile updated");
  }
});
