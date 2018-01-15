// Template.card.helpers({
// //
// });

Template.card.events({
  "click .card-wrapper": function(e, t) {
    console.log("t", t, Session, Sesh);
    // this.selectedCards.push()
    Sesh.push(Sesh.CARDS, t.data._id);
  }
});
