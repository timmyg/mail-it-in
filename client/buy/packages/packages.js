import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.packages.rendered = function() {
  console.log("rendered");

  Meteor.call("orders.mine.reset");
};

Template.packages.helpers({
  packages: function() {
    return Packages.find().fetch();
  }
});
