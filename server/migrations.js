Meteor.startup(() => {
  Migrations.add({
    version: 1,
    up: function() {
      Packages.insert({ price: 10, items: 2, sort: 10 });
      Packages.insert({ price: 20, items: 5, best: true, sort: 20 });
    }
  });

  Migrations.add({
    version: 2,
    up: () => {
      Items.insert({ link: "/img/cards/baby.jpg", category: "baby" });
      Items.insert({ link: "/img/cards/babyboy.jpg", category: "baby" });
      Items.insert({ link: "/img/cards/babygirl.jpg", category: "baby" });
      Items.insert({ link: "/img/cards/birthday.jpg", category: "birthday" });
      Items.insert({
        link: "/img/cards/engagement.jpg",
        category: "engagement"
      });
      Items.insert({ link: "/img/cards/wedding.jpg", category: "wedding" });
    }
  });

  Migrations.migrateTo("latest");
});
