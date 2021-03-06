const mongoose = require("mongoose");

const { Schema } = mongoose;

const SchemaDetail = new Schema(
  {
    address: { type: String },
    references: { type: String },
    phone: { type: String },
    rfc: { type: String, index: true },
    idClient: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: "Client",
    },
  },
  {
    collection: "ClientDetail",
  }
);

SchemaDetail.methods.findOneAndUpdate = (filter, data) =>
  mongoose.model("ClientDetail").findOneAndUpdate(filter, data).exec();

SchemaDetail.methods.findOneAndRemove = (filter) =>
  mongoose.model("ClientDetail").findOneAndRemove(filter).exec();

SchemaDetail.methods.findOne = (filter) =>
  mongoose.model("ClientDetail").findOne(filter).exec();

SchemaDetail.methods.find = () => mongoose.model("ClientDetail").find().exec();

SchemaDetail.methods.findOnePopulate = (filter) =>
  mongoose.model("ClientDetail").findOne(filter).populate("idClient").exec();

module.exports = mongoose.model("ClientDetail", SchemaDetail);
