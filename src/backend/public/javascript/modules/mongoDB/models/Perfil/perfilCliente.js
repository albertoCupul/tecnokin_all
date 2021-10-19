const mongoose = require("mongoose");

const { Schema } = mongoose;

const SchemaPerfilCl = new Schema(
  {
    name: { type: String, required: true, unique: true },
    idRule: { type: Schema.Types.ObjectId, ref: "Rules", required: true },
  },
  {
    collection: "ClientePerfil",
  }
);

SchemaPerfilCl.methods.findOneAndUpdate = (filter, data) =>
  mongoose.model("ClientePerfil").findOneAndUpdate(filter, data).exec();

SchemaPerfilCl.methods.findOneAndRemove = (filter) =>
  mongoose.model("ClientePerfil").findOneAndRemove(filter).exec();

SchemaPerfilCl.methods.findOne = (filter) =>
  mongoose.model("ClientePerfil").findOne(filter).exec();

SchemaPerfilCl.methods.find = () =>
  mongoose.model("ClientePerfil").find().exec();

module.exports = mongoose.model("ClientePerfil", SchemaPerfilCl);
