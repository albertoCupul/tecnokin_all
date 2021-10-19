const mongoose = require("mongoose");

const { Schema } = mongoose;

const SchemaProduct = new Schema(
  {
    amount: { type: Number, required: true },
    idClient: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
      unique: true,
    },
  },
  {
    collection: "Credit",
  }
);

SchemaProduct.methods.findOneAndUpdate = (filter, data) =>
  mongoose.model("Credit").findOneAndUpdate(filter, data).exec();

SchemaProduct.methods.findOneAndRemove = (filter) =>
  mongoose.model("Credit").findOneAndRemove(filter).exec();

SchemaProduct.methods.findOne = (filter) =>
  mongoose.model("Credit").findOne(filter).exec();

SchemaProduct.methods.find = () => mongoose.model("Credit").find().exec();

SchemaProduct.methods.findOnePopulate = (filter) =>
  mongoose.model("Credit").findOne(filter).populate("idClient").exec();

module.exports = mongoose.model("Credit", SchemaProduct);
