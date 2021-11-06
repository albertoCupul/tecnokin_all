const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaProduct = new Schema({
  user: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  logStatus: { type: String },
  idClient: { type: Schema.Types.ObjectId, ref: 'Client' },
},
{
  collection: 'ClientAccess',
});

SchemaProduct.methods.findOneAndUpdate = (filter, data) => mongoose.model('ClientAccess').findOneAndUpdate(filter, data).exec();

SchemaProduct.methods.findOneAndRemove = (filter) => mongoose.model('ClientAccess').findOneAndRemove(filter).exec();

SchemaProduct.methods.findOne = (filter) => mongoose.model('ClientAccess').findOne(filter).exec();

SchemaProduct.methods.find = () => mongoose.model('ClientAccess').find().exec();

SchemaProduct.methods.findOnePopulate = (filter) => mongoose.model('ClientAccess').findOne(filter).populate('idUser').exec();

module.exports = mongoose.model('ClientAccess', SchemaProduct);
