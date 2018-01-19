import SimpleSchema from "simpl-schema";
Orders = new Mongo.Collection("orders");

OrderCardsSchema = new SimpleSchema({
  shippingAddress: AddressesSchema
});

OrdersSchema = new SimpleSchema({
  shippingAddress: AddressesSchema,
  date: Date,
  paid: Boolean,
  source: String,
  shipped: {
    type: Boolean,
    optional: true
  },
  paid: {
    type: Boolean,
    optional: true
  },
  package: String,
  price: Number,
  userId: String,
  items: { type: Array },
  "items.$": { type: String }
});

Orders.attachSchema(OrdersSchema);
