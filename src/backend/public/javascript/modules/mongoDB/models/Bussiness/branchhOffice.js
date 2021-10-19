const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaProduct = new Schema({
  name: { type: String, required: true, unique:true, index:true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  phone: { type: String },
  status: {type: Boolean, required:true},
  idBusiness: { type: Schema.Types.ObjectId, ref: 'Business' },
},
{
  collection: 'BranchOffice',
});

SchemaProduct.methods.findOneAndUpdate = (filter, data) => mongoose.model('BranchOffice').findOneAndUpdate(filter, data).exec();

SchemaProduct.methods.findOneAndRemove = (filter) => mongoose.model('BranchOffice').findOneAndRemove(filter).exec();

SchemaProduct.methods.findOne = (filter) => mongoose.model('BranchOffice').findOne(filter).exec();

SchemaProduct.methods.find = (filter) => mongoose.model('BranchOffice').find(filter).exec();

SchemaProduct.methods.findOnePopulate = (filter) => mongoose.model('BranchOffice').findOne(filter).populate('idBussiness').exec();

module.exports = mongoose.model('BranchOffice', SchemaProduct);
