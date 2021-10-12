const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaProduct = new Schema({
  name: { type: String, required: true, index: true },
  first: { type: String, required: true, index: true },
  second: { type: String, index: true },
  registerDate: { type: Date, default: Date.now },
},
{
  collection: 'Client',
});

SchemaProduct.methods.findOneAndUpdate = (filter, data) => mongoose.model('Client').findOneAndUpdate(filter, data).exec();

SchemaProduct.methods.findOneAndRemove = (filter) => mongoose.model('Client').findOneAndRemove(filter).exec();

SchemaProduct.methods.findOne = (filter) => mongoose.model('Client').findOne(filter).exec();

SchemaProduct.methods.find = () => mongoose.model('Client').find().exec();

module.exports = mongoose.model('Client', SchemaProduct);
