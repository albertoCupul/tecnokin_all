const SchemaBranch = require('../../../public/javascript/modules/mongoDB/models/Bussiness/branchhOffice');

async function remove(id) {
  try {
    const Schema = new SchemaBranch();
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

module.exports = remove;
