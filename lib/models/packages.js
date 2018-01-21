import SimpleSchema from "simpl-schema";
Packages = new Mongo.Collection("packages");

PackagesSchema = new SimpleSchema({
  price: {
    type: Number
  },
  items: {
    type: Number
  },
  best: {
    type: Boolean,
    optional: true
  },
  sort: {
    type: Number,
    optional: true
  }
});

Packages.attachSchema(PackagesSchema);
