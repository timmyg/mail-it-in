import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.billing.helpers({
  ready: () => FlowRouter.subsReady(),
  mySources: () => {
    return Sources.find().fetch();
  },
});
