const mongoose = require("mongoose");

const { Schema } = mongoose;

const SchemaClient = new Schema(
  {
    name: { type: String, required: true, index: true },
    first: { type: String, required: true, index: true },
    second: { type: String, index: true },
    registerDate: { type: Date, default: Date.now },
    idDetail: { type: Schema.Types.ObjectId, ref: "ClientDetail", required: true },
    idPerfil: {
      type: Schema.Types.ObjectId,
      ref: "ClientePerfil",
      required: true
    },

    idCredit: { type: Schema.Types.ObjectId, ref: "Credit", required: true },
  },
  {
    collection: "Client",
  }
);

SchemaClient.methods.findOneAndUpdate = (filter, data) =>
  mongoose.model("Client").findOneAndUpdate(filter, data).exec();

SchemaClient.methods.findOneAndRemove = (filter) =>
  mongoose.model("Client").findOneAndRemove(filter).exec();

SchemaClient.methods.findOne = (filter) =>
  mongoose.model("Client").findOne(filter).exec();

SchemaClient.methods.find = () => mongoose.model("Client").find().exec();

SchemaClient.methods.findOnePopulate = (filter) =>
  mongoose
    .model("Client")
    .findOne(filter)
    .populate("idDetail")
    .populate("idPerfil")
    .populate("idCredit")
    .exec();

module.exports = mongoose.model("Client", SchemaClient);
