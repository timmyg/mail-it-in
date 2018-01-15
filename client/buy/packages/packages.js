import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.packages.helpers({
  packages: function(){
    console.log(Packages.find().fetch());
    return Packages.find().fetch();
  }
});
