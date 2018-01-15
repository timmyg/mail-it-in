import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.choose.helpers({
  package: function() {
    return Packages.findOne();
  },
  cards: function() {
    return Cards.find().fetch();
  },
  // updated via card child tempates
  selectedCards: function() {
    return Template.instance().selectedCards.get();
  }
});

Template.choose.onCreated(function() {
  this.selectedCards = new ReactiveVar([]);
});
