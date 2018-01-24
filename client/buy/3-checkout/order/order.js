Template.checkoutOrder.helpers({
  cards: () => Items.find().fetch(),
  package: () => Packages.findOne()
});
