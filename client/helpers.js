import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.registerHelper("isActiveRoute", routeName => {
  FlowRouter.watchPathChange();
  const currentRoute = FlowRouter.current().route.name;
  return currentRoute === routeName;
});

Template.registerHelper("myOrder", routeName => {
  return Orders.findOne();
});
