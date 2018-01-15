Meteor.startup(() => {
  Migrations.add({
    version: 1,
    up: function() {
      Packages.insert({ price: 20, cards: 5 });
      Packages.insert({ price: 10, cards: 2 });
    }
  });

  Migrations.add({
    version: 2,
    up: () => {
      Cards.insert({ link: "/img/cards/baby.jpg", category: "baby" });
      Cards.insert({ link: "/img/cards/babyboy.jpg", category: "baby" });
      Cards.insert({ link: "/img/cards/babygirl.jpg", category: "baby" });
      Cards.insert({ link: "/img/cards/birthday.jpg", category: "birthday" });
      Cards.insert({
        link: "/img/cards/engagement.jpg",
        category: "engagement"
      });
      Cards.insert({ link: "/img/cards/wedding.jpg", category: "wedding" });
    }
  });

  Migrations.migrateTo("latest");
});
