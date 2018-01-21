Template.card.helpers({
  selected: function() {
    return OrderItems.findOne({"item": this._id});
  },
  getEventDate: () => {
    const orderItem = OrderItems.findOne({"item": Template.instance().data._id});
    if (orderItem && orderItem.eventDate) return moment(orderItem.eventDate).format("YYYY-MM-DD");
  }
});

Template.card.events({
  "click .clickable": function(e, t) {
    const package = Packages.findOne();
    const order = Orders.findOne();
    const orderItemsCount = OrderItems.find().count();
    const needsMore = package.items > orderItemsCount;
    const itemExists = OrderItems.findOne({"item": t.data._id});
    if (itemExists) {
      Meteor.call("orders.mine.item.remove", order._id, t.data._id);
    } else if (needsMore) {
      Meteor.call("orders.mine.item.add", order._id, t.data._id);
    }
  },
  "change input[type=date]": (e, t) => {
    const date = moment($(e.currentTarget).val()).format("MM-DD-YYYY");
    console.log(Orders.findOne()._id, t.data._id, date);
    Meteor.call("order.update.item.date", Orders.findOne()._id, t.data._id, date);
  }
});
