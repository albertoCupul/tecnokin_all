const mongoose = require("mongoose");

const { Schema } = mongoose;

const SchemaPerfilCl = new Schema(
  {
    name: { type: String, required: true, unique: true },    
  },
  {
    collection: "UserPerfil",
  }
);

SchemaPerfilCl.methods.findOneAndUpdate = (filter, data) =>
  mongoose.model("UserPerfil").findOneAndUpdate(filter, data).exec();

SchemaPerfilCl.methods.findOneAndRemove = (filter) =>
  mongoose.model("UserPerfil").findOneAndRemove(filter).exec();

SchemaPerfilCl.methods.findOne = (filter) =>
  mongoose.model("UserPerfil").findOne(filter).exec();

SchemaPerfilCl.methods.find = () =>
  mongoose.model("UserPerfil").find().exec();

module.exports = mongoose.model("UserPerfil", SchemaPerfilCl);
