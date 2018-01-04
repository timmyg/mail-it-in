
Template.source.events({
  "click .delete-source": function(e, t) {
    const source = Template.instance().data;
    Meteor.call("deleteCard", source._id)
  }
});

Template.source.helpers({
  getCreditCardImage: () => {
    switch (Template.instance().data.card.brand) {
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

Template.billing.helpers({
  mySources: () => {
    return Sources.find().fetch();
  },
});
