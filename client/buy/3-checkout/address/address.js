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
  // "blur input#state": (e, t) => {
  //   const uppercased = $(e.currentTarget)
  //     .val()
  //     .toUpperCase();
  //   $(e.currentTarget).val(uppercased);
  //   // validateAddress(t, "state");
  // }
});

// function validateAddress(t, field) {
//   try {
//     AddressesSchema.validate(Template.instance().data.shippingAddress, { keys: [field] });
//     t.$(`#${field}`).removeClass("is-invalid");
//   } catch (err) {
//     t.$(`#${field}`).addClass("is-invalid");
//   }
// }
