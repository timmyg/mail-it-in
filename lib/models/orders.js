import SimpleSchema from 'simpl-schema';
Orders = new Mongo.Collection("orders");

OrdersSchema = new SimpleSchema({
  shippingAddress: AddressesSchema,
  date: Date,
  paid: Boolean,
  shipped: {
    type: Boolean,
    defaultValue: false
  },
  userId: String,
  items: [String]
});

Orders.attachSchema(OrdersSchema);
