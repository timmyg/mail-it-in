import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.post.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe("post", FlowRouter.getParam("slug"));
  });
});

Template.post.helpers({
  post: function() {
    return Posts.findOne({ slug: FlowRouter.getParam("slug") });
  }
});
