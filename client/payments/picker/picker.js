Template.paymentPicker.onCreated(function() {
  this.subscribe("sources.mine");
});

Template.paymentPicker.helpers({
  sources: function() {
    return Sources.find().fetch();
  },
  selectedPayment: () => {
    return Sources.find({ selected: true }).fetch();
  },
  getCreditCardImage: brand => {
    switch (brand) {
      case "Visa":
        return "/img/cc/visa.png";
      case "American Express":
        return "/img/cc/americanexpress.png";
      case "MasterCard":
        return "/img/cc/mastercard.png";
      case "Discover":
        return "/img/cc/discover.png";
    }
  }
});
