import SimpleSchema from "simpl-schema";
OrderItems = new Mongo.Collection("orderItems");

OrderItemsSchema = new SimpleSchema({
  order: String,
  item: String,
  userId: String,
  reminderSent: {
    type: Boolean,
    optional: true
  },
  eventDate: {
    type: Date
  }
});

OrderItems.attachSchema(OrderItemsSchema);
