Template.card.helpers({
  selected: function() {
    return Sesh.contains(Sesh.CARDS, this._id);
  }
});

Template.card.events({
  "click .card-wrapper": function(e, t) {
    // only allow if under limit or removing a card
    const underLimit = Packages.findOne().cards > Sesh.getLength(Sesh.CARDS);
    const removing = Sesh.contains(Sesh.CARDS, t.data._id);
    if (underLimit || removing) {
      Sesh.toggle(Sesh.CARDS, t.data._id);
    }
  }
});
