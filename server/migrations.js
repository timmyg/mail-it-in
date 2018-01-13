Meteor.startup(() => {
  
  Migrations.add({
    version: 1,
    up: function() {
      Examples.insert({name: "Bob"})
    },
    down: function() {
      Examples.remove({name: "Bob"})
    },
  });

  Migrations.migrateTo('latest');

});
