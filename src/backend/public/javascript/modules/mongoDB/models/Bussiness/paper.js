const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaPaper = new Schema({  
  name: { type: String, require: true },
  size: { type: Number, require: true },
},
{
  collection: 'Paper',
});

SchemaPaper.methods.findOneAndUpdate = (filter, data) => mongoose.model('Paper').findOneAndUpdate(filter, data).exec();

SchemaPaper.methods.findOneAndRemove = (filter) => mongoose.model('Paper').findOneAndRemove(filter).exec();

SchemaPaper.methods.findOne = (filter) => mongoose.model('Paper').findOne(filter).exec();

SchemaPaper.methods.find = () => mongoose.model('Paper').find().exec();

module.exports = mongoose.model('Paper', SchemaPaper);
