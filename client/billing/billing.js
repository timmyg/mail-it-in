
Template.card.events({
  "click .delete-card": function(e, t) {
    const card = Template.instance().data;
    console.log("delete", card, Stripe.card);
    Meteor.call("deleteCard", card._id)
  }
});

Template.card.helpers({
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
  myCards: () => {
    return Cards.find().fetch();
  },
});
