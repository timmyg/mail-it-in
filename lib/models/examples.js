import SimpleSchema from 'simpl-schema';

Examples = new Mongo.Collection("examples");

ExamplesSchema = new SimpleSchema({
  name: String
});

Examples.attachSchema(ExamplesSchema);
