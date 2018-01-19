import SimpleSchema from "simpl-schema";
SimpleSchema.extendOptions(["autoform"]);
Orders = new Mongo.Collection("orders");

OrdersSchema = new SimpleSchema({
  shippingAddress: AddressesSchema,
  date: Date,
  paid: Boolean,
  source: String,
  shipped: {
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
