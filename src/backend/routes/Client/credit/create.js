const SchemaCredit = require("../../../public/javascript/modules/mongoDB/models/Clients/credit");

async function create(object) {
  try {
    const Schema = new SchemaCredit();
    Schema.amount = object.amount;
    Schema.idClient = object.idClient;
    return await Schema.save();
  } catch (error) {
    if (error.code === 11000) {
      return true;
    }
    return false;
  }
}

module.exports = create;
