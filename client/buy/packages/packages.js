import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.packages.helpers({
  packages: function() {
    return Packages.find().fetch();
  }
});
