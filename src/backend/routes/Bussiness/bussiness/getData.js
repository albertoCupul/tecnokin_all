const SchemaBusiness = require('../../../public/javascript/modules/mongoDB/models/Bussiness/business');

async function getData(id) {
  try {
    const Schema = new SchemaBusiness();
    const filter = { _id: id };
    const business = await Schema.findOne(filter); 
    if (!business) {
      return true;
    }
    return business;
  } catch (error) {
    return false;
  }
}

module.exports = getData;
