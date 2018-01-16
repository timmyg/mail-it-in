Template.card.helpers({
  selected: function() {
    // return Sesh.contains(CONSTANTS.CARDS, this._id);
    const order = Orders.findOne();
    return order.items.indexOf(this._id) > -1;
  }
});

Template.card.events({
  "click .card-wrapper": function(e, t) {
    const order = Orders.findOne();
    if (order.items.indexOf(t.data._id) > -1) {
      // exists
      Meteor.call("orders.mine.item.remove", t.data._id);
    } else {
      Meteor.call("orders.mine.item.add", t.data._id);
    }
  }
});
