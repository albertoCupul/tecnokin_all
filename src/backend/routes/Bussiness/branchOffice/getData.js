const SchemaBranch = require('../../../public/javascript/modules/mongoDB/models/Bussiness/branchhOffice');

async function getData(id) {
  try {
    const Schema = new SchemaBranch();
    const filter = { _id: id };
    const branch = await Schema.findOne(filter); 
    if (!branch) {
      return true;
    }
    return branch;
  } catch (error) {
    return false;
  }
}

module.exports = getData;
