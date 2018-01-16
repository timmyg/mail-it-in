import SimpleSchema from "simpl-schema";
Sources = new Mongo.Collection("sources");

SourcesSchema = new SimpleSchema({
  default: Boolean,
  userId: String,
  details: {
    type: Object,
    blackbox: true
  },
  pendingDelete: {
    type: Boolean,
    optional: true
  },
  selected: {
    type: Boolean,
    optional: true
  },
  recent: {
    type: Boolean,
    optional: true
  }
});

Sources.attachSchema(SourcesSchema);
