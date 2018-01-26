import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.adminOrder.helpers({
  order: () => {
    return Orders.findOne();
  },
  orderItems: () => {
    return OrderItems.find().fetch();
  },
  orderUser: () => {
    const order = Orders.findOne();
    if (order) return Meteor.users.findOne({ _id: order.userId });
  }
});

Template.adminOrder.events({
  "click .shipped": (e, t) => {
    Orders.update(FlowRouter.current().params.orderId, {
      $set: {
        shipped: true,
        status: "shipped"
      }
    });
  },
  "click .not-shipped": (e, t) => {
    Orders.update(FlowRouter.current().params.orderId, {
      $set: {
        status: "processing"
      },
      $unset: {
        shipped: ""
      }
    });
  }
});

Template.adminOrderItem.helpers({
  link: () => {
    const item = Template.instance().data.item;
    return Items.findOne({ _id: item }).link;
  }
});
