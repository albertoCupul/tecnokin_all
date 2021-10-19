
const SchemaBusiness = require('../../../public/javascript/modules/mongoDB/models/Bussiness/business');

async function remove(id) {
  try {
    const Schema = new SchemaBusiness();
    const filter = { _id: id };
    const business = await Schema.findOne(filter);
    
    if (!business) {
      return 2;
    }

    business.remove();        
    return 1;
  } catch (error) {
    return error;
  }
}

// async function preRemove(){

// }

module.exports = remove;
