const SchemaCredit = require("../../../public/javascript/modules/mongoDB/models/Clients/credit");
const middleware = require("../middleware");

async function edit(object) {
  try {
    const existClient = await middleware.existReference(
      object.idClient,
      "Client"
    );
    const existCredit = await middleware.existReference(object.id, "Credit");
    if (existClient && existCredit) {
      const Schema = new SchemaCredit();
      const filter = { _id: object.id };
      const data = await Schema.findOne(filter);
      data.amount = object.amount;
      const cliente = JSON.stringify(data.idClient).replace(/"/g, "");
      if (cliente === object.idClient) {
        return await data.save();
      }
      return true;
    }
    return null;
  } catch (error) {
    return false;
  }
}

module.exports = edit;
