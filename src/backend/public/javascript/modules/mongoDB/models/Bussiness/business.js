const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaProduct = new Schema({
  name: { type: String, required: true },
  agent: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true },
  rfc: { type: String },
  status: { type: Boolean, required: true },
},
{
  collection: 'Business',
});

SchemaProduct.methods.findOneAndUpdate = (filter, data) => mongoose.model('Business').findOneAndUpdate(filter, data).exec();

SchemaProduct.methods.findOneAndRemove = (filter) => mongoose.model('Business').findOneAndRemove(filter).exec();

SchemaProduct.methods.findOne = (filter) => mongoose.model('Business').findOne(filter).exec();

SchemaProduct.methods.find = () => mongoose.model('Business').find().exec();

module.exports = mongoose.model('Business', SchemaProduct);
