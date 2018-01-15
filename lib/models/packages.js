import SimpleSchema from 'simpl-schema';
Packages = new Mongo.Collection("packages");

PackagesSchema = new SimpleSchema({
  price: {
    type: Number,
  },
  cards: {
    type: Number,
  },
});

Packages.attachSchema(PackagesSchema);
