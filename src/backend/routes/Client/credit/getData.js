const SchemaCredit = require("../../../public/javascript/modules/mongoDB/models/Clients/credit");

async function getCreditData(id) {
  try {
    const Schema = new SchemaCredit();
    const filter = { _id: id };
    const credit = await Schema.findOne(filter);
    if (!credit) {
      return true;
    }
    return credit;
  } catch (error) {
    return false;
  }
}

module.exports = getCreditData;
