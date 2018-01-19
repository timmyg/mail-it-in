Template.card.helpers({
  selected: function() {
    // return Sesh.contains(CONSTANTS.CARDS, this._id);
    const order = Orders.findOne();
    return order.items.indexOf(this._id) > -1;
  }
});

Template.card.events({
  "click .card-wrapper": function(e, t) {
    const package = Packages.findOne();
    const order = Orders.findOne();
    const needsMore = package.cards > order.items.length;
    if (order.items.indexOf(t.data._id) > -1) {
      // exists
      Meteor.call("orders.mine.item.remove", t.data._id);
    } else if (needsMore) {
      Meteor.call("orders.mine.item.add", t.data._id);
    }
  }
});
