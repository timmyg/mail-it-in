Template.card.helpers({
  selected: function() {
    return Sesh.contains(CONSTANTS.CARDS, this._id);
  }
});

Template.card.events({
  "click .card-wrapper": function(e, t) {
    // only allow if under limit or removing a card
    const underLimit =
      Packages.findOne().cards > Sesh.getLength(CONSTANTS.CARDS);
    const removing = Sesh.contains(CONSTANTS.CARDS, t.data._id);
    if (underLimit || removing) {
      Sesh.toggle(CONSTANTS.CARDS, t.data._id);
    }
  }
});
