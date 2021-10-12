const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaProduct = new Schema({
  name: { type: String, required: true },
  idRule: { type: Schema.Types.ObjectId, ref: 'Rules', required:true } 
},
{
  collection: 'Perfil',
});

SchemaProduct.methods.findOneAndUpdate = (filter, data) => mongoose.model('Perfil').findOneAndUpdate(filter, data).exec();

SchemaProduct.methods.findOneAndRemove = (filter) => mongoose.model('Perfil').findOneAndRemove(filter).exec();

SchemaProduct.methods.findOne = (filter) => mongoose.model('Perfil').findOne(filter).exec();

SchemaProduct.methods.find = () => mongoose.model('Perfil').find().exec();

module.exports = mongoose.model('Perfil', SchemaProduct);
