import SimpleSchema from "simpl-schema";
Orders = new Mongo.Collection("orders");

OrdersSchema = new SimpleSchema({
  shippingAddress: AddressesSchema,
  date: Date,
  source: String,
  shipped: {
    type: Boolean,
    optional: true
  },
  paid: {
    type: Boolean,
    optional: true
  },
  paid: {
    type: Boolean,
    optional: true
  },
  package: String,
  price: Number,
  userId: {
    type: String,
    // unique: true
  }
});

Orders.attachSchema(OrdersSchema);
