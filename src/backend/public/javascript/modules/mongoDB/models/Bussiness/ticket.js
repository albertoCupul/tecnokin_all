const mongoose = require('mongoose');

const { Schema } = mongoose;

const Schematicket = new Schema({  
  greeting: { type: String },
  goodbye: { type: String },
  print: { type: Boolean, default: true, required:true},
  idBranch: { type: Schema.Types.ObjectId, ref: 'BranchOffice', required:true },
  idPaper: { type: Schema.Types.ObjectId, ref: 'Paper', required:true },
},
{
  collection: 'Ticket',
});

Schematicket.methods.findOneAndUpdate = (filter, data) => mongoose.model('Ticket').findOneAndUpdate(filter, data).exec();

Schematicket.methods.findOneAndRemove = (filter) => mongoose.model('Ticket').findOneAndRemove(filter).exec();

Schematicket.methods.findOne = (filter) => mongoose.model('Ticket').findOne(filter).exec();

Schematicket.methods.find = () => mongoose.model('Ticket').find().exec();

Schematicket.methods.findOnePopulate = (filter) => mongoose.model('Ticket').findOne(filter).populate('idPaper').populate('idBranch').exec();

module.exports = mongoose.model('Ticket', Schematicket);
