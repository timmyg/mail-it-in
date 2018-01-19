import SimpleSchema from "simpl-schema";
Items = new Mongo.Collection("items");

ItemsSchema = new SimpleSchema({
  category: {
    type: String,
    allowedValues: ["birthday", "wedding", "baby", "engagement"]
  },
  link: String
});

Items.attachSchema(ItemsSchema);
