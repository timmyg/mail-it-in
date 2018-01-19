Template.checkoutAddress.events({
  "keyup input": (e, t) => {
    const orderId = t.data._id;
    const field = $(e.currentTarget).data("field");
    const val = $(e.currentTarget).val();
    let update = {};
    if (val) {
      update["$set"] = {};
      update["$set"][field] = val;
    } else {
      update["$unset"] = {};
      update["$unset"][field] = "";
    }
    Meteor.call("order.update.ignore.validation", orderId, update);
  }
});
