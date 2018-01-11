Template.source.events({
  "click .delete-source": function(e, t) {
    const source = Template.instance().data;
    if (source.default && Sources.find().count() > 1) {
      return sAlert.warning('Please set another card as your default before removing');
    }
    Meteor.call("deleteCard", source._id)
  },
  "click .undo-delete-souce": function(e, t) {
    const source = Template.instance().data;
    Meteor.call("undoDeleteCard", source._id)
  },
  "click .set-default": function(e, t) {
    const source = Template.instance().data;
    Meteor.call("setDefaultCard", source._id)
  },
});

Template.source.helpers({
  isAmex: () => {
    return Template.instance().data.details.card.brand === "American Express"
  },
  getCreditCardImage: () => {
    switch (Template.instance().data.details.card.brand) {
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
