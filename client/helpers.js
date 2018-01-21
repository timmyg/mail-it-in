import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.registerHelper("isActiveRoute", routeName => {
  FlowRouter.watchPathChange();
  const currentRoute = FlowRouter.current().route.name;
  return currentRoute === routeName;
});

Template.registerHelper("myOrder", routeName => {
  return Orders.findOne();
});

groupBy = function(groups, prop) {
  var reduced = groups.reduce(function(groups, item) {
    var val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});
  var result = [];
  for (var key in reduced) result.push({ name: key, values: reduced[key] });
  return result;
  return reduced;
};
