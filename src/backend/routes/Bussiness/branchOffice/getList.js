const SchemaBusiness = require('../../../public/javascript/modules/mongoDB/models/Bussiness/business');

async function getList() {
  try {
    const Schema = new SchemaBusiness();    
    const business = await Schema.find(); 
    if (!business) {
      return true;
    }
    return business;
  } catch (error) {
    return false;
  }
}

module.exports = getList;
