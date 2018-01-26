import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.packages.rendered = function() {
  Meteor.call("orders.mine.reset");
};

Template.packages.helpers({
  packages: function() {
    return Packages.find({}, { sort: { sort: 1 } }).fetch();
  }
});
