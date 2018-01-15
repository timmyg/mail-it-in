import SimpleSchema from "simpl-schema";
Cards = new Mongo.Collection("cards");

CardsSchema = new SimpleSchema({
  category: {
    type: String,
    allowedValues: ["birthday", "wedding", "baby", "engagement"]
  },
  link: String
});

Cards.attachSchema(CardsSchema);
