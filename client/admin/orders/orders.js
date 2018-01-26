Template.adminOrders.helpers({
  allOrders: () => {
    return Orders.find({}, { sort: { date: -1 } }).fetch();
  }
});
