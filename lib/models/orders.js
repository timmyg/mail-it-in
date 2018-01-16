import SimpleSchema from "simpl-schema";
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
  userId: String,
  items: { type: Array },
  "items.$": { type: String }
});

Orders.attachSchema(OrdersSchema);
