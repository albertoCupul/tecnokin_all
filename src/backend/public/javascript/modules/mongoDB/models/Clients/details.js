const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaProduct = new Schema({
  address: { type: String },
  references: { type: String },
  phone: { type: String },
  rfc: { type: String, index: true},
  idClient: { type: Schema.Types.ObjectId, ref: 'Client' }
},
{
  collection: 'ClientDetail',
});

SchemaProduct.methods.findOneAndUpdate = (filter, data) => mongoose.model('ClientDetail').findOneAndUpdate(filter, data).exec();

SchemaProduct.methods.findOneAndRemove = (filter) => mongoose.model('ClientDetail').findOneAndRemove(filter).exec();

SchemaProduct.methods.findOne = (filter) => mongoose.model('ClientDetail').findOne(filter).exec();

SchemaProduct.methods.find = () => mongoose.model('ClientDetail').find().exec();

SchemaProduct.methods.findOnePopulate = (filter) => mongoose.model('ClientDetail').findOne(filter).populate('idClient').exec();

module.exports = mongoose.model('ClientDetail', SchemaProduct);
