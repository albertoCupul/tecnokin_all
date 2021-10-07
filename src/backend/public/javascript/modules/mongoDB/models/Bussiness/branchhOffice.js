const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaProduct = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  phone: { type: String },
  idBussiness: { type: Schema.Types.ObjectId, ref: 'Business' },
},
{
  collection: 'BranchOffice',
});

SchemaProduct.methods.findOneAndUpdate = (filter, data) => mongoose.model('BranchOffice').findOneAndUpdate(filter, data).exec();

SchemaProduct.methods.findOneAndRemove = (filter) => mongoose.model('BranchOffice').findOneAndRemove(filter).exec();

SchemaProduct.methods.findOne = (filter) => mongoose.model('BranchOffice').findOne(filter).exec();

SchemaProduct.methods.find = () => mongoose.model('BranchOffice').find().exec();

SchemaProduct.methods.findOnePopulate = (filter) => mongoose.model('Business').findOne(filter).populate('idBussiness').exec();

module.exports = mongoose.model('BranchOffice', SchemaProduct);
