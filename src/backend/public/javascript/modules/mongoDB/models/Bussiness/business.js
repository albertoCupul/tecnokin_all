const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaBusiness = new Schema({
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

SchemaBusiness.methods.findOneAndUpdate = (filter, data) => mongoose.model('Business').findOneAndUpdate(filter, data).exec();

SchemaBusiness.methods.findOneAndRemove = (filter) => mongoose.model('Business').findOneAndRemove(filter).exec();

SchemaBusiness.methods.findOne = (filter) => mongoose.model('Business').findOne(filter).exec();

SchemaBusiness.methods.find = () => mongoose.model('Business').find().exec();

// SchemaBusiness.pre('remove', ()=> {
  
// })

module.exports = mongoose.model('Business', SchemaBusiness);
